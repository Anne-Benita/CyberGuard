from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from django.utils import timezone
from datetime import timedelta, datetime
import pandas as pd
import json
from njango shortcuts import render, redirect
from .models import SecurityEvent, Notification, UploadedCSVFile
from .serializers import SecurityEventSerializer, NotificationSerializer, UploadedCSVFileSerializer
from file_processor.csv_parser import CSVParser
from notifications.notification_manager import NotificationManager

# Initialize managers
csv_parser = CSVParser()
notification_manager = NotificationManager()

#  COMPLETE CHART APIs

@api_view(['GET'])
def pie_chart_data(request):
    """Pie Chart - Threat Type Distribution"""
    queryset = SecurityEvent.objects.all()
    queryset = apply_security_filters(queryset, request)
    
    # Threat type distribution
    threat_data = queryset.values('threat_name').annotate(
        count=Count('id')
    ).order_by('-count')[:8]
    
    # Format for pie chart
    data = []
    colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6", "#64748b"]
    
    for i, item in enumerate(threat_data):
        data.append({
            "name": item['threat_name'],
            "value": item['count'],
            "color": colors[i % len(colors)]
        })
    
    return Response(data)

@api_view(['GET'])
def line_chart_data(request):
    """Line Chart - Threats Over Time"""
    queryset = SecurityEvent.objects.all()
    queryset = apply_security_filters(queryset, request)
    
    # Get time range from filters
    time_range = request.query_params.get('timeRange', 'last-7d')
    days = get_days_from_time_range(time_range)
    
    # Generate data for each day
    dates = []
    threat_counts = []
    critical_counts = []
    
    for i in range(days):
        date = timezone.now().date() - timedelta(days=days - i - 1)
        dates.append(date.strftime('%Y-%m-%d'))
        
        day_start = timezone.make_aware(datetime.combine(date, datetime.min.time()))
        day_end = timezone.make_aware(datetime.combine(date, datetime.max.time()))
        
        day_threats = queryset.filter(
            timestamp__range=(day_start, day_end)
        ).count()
        
        day_critical = queryset.filter(
            timestamp__range=(day_start, day_end),
            severity_level__in=['high', 'critical']
        ).count()
        
        threat_counts.append(day_threats)
        critical_counts.append(day_critical)
    
    return Response({
        "dates": dates,
        "threats": threat_counts,
        "critical": critical_counts
    })

@api_view(['GET'])
def bar_chart_data(request):
    """Bar Chart - Action Taken Distribution"""
    queryset = SecurityEvent.objects.all()
    queryset = apply_security_filters(queryset, request)
    
    # Action taken distribution
    action_data = queryset.values('action_taken').annotate(
        count=Count('id')
    ).order_by('-count')
    
    data = {
        "categories": [item['action_taken'] for item in action_data],
        "values": [item['count'] for item in action_data]
    }
    
    return Response(data)

@api_view(['GET'])
def cluster_column_data(request):
    """Cluster Column Chart - Severity by Threat Type"""
    queryset = SecurityEvent.objects.all()
    queryset = apply_security_filters(queryset, request)
    
    # Severity distribution by threat type
    severity_data = queryset.values('threat_name', 'severity_level').annotate(
        count=Count('id')
    ).order_by('threat_name', 'severity_level')
    
    # Format for cluster column chart
    threat_types = list(set([item['threat_name'] for item in severity_data]))
    severities = ['low', 'medium', 'high', 'critical']
    
    series_data = []
    for severity in severities:
        series = {
            "name": severity.capitalize(),
            "data": []
        }
        
        for threat_type in threat_types:
            count = next((item['count'] for item in severity_data 
                         if item['threat_name'] == threat_type and item['severity_level'] == severity), 0)
            series["data"].append(count)
        
        series_data.append(series)
    
    return Response({
        "categories": threat_types,
        "series": series_data
    })

@api_view(['GET'])
def map_data(request):
    """Map Data - Geographic Threat Distribution"""
    queryset = SecurityEvent.objects.exclude(
        Q(geo_latitude__isnull=True) | Q(geo_longitude__isnull=True)
    )
    queryset = apply_security_filters(queryset, request)
    
    map_points = []
    for event in queryset[:200]:
        map_points.append({
            "id": event.id,
            "lat": event.geo_latitude,
            "lng": event.geo_longitude,
            "title": event.threat_name,
            "description": f"From {event.source_ip} - {event.geo_country}",
            "severity": event.severity_level,
            "type": event.threat_name,
            "popUp": f"{event.threat_name} - {event.severity_level}"
        })
    
    return Response(map_points)

#  COMPLETE FILTERING FUNCTION

def apply_security_filters(queryset, request):
    """Apply all filters from request"""
    
    # Threat Type Filter
    threat_type = request.query_params.get('threatType')
    if threat_type:
        if threat_type == 'malware':
            queryset = queryset.filter(threat_name__icontains='malware')
        elif threat_type == 'phishing':
            queryset = queryset.filter(threat_name__icontains='phishing')
        elif threat_type == 'ransomware':
            queryset = queryset.filter(threat_name__icontains='ransomware')
        elif threat_type == 'sql-injection':
            queryset = queryset.filter(threat_name__icontains='sql')
    
    # Severity Filter
    severity = request.query_params.get('severity')
    if severity:
        severity_map = {
            'low': 'low',
            'medium': 'medium', 
            'high': 'high',
            'critical': 'critical'
        }
        if severity in severity_map:
            queryset = queryset.filter(severity_level=severity_map[severity])
    
    # TIME RANGE FILTER
    time_range = request.query_params.get('timeRange')
    if time_range:
        now = timezone.now()
        if time_range == 'last-24h':
            start_date = now - timedelta(hours=24)
            queryset = queryset.filter(timestamp__gte=start_date)
        elif time_range == 'last-7d':
            start_date = now - timedelta(days=7)
            queryset = queryset.filter(timestamp__gte=start_date)
        elif time_range == 'last-30d':
            start_date = now - timedelta(days=30)
            queryset = queryset.filter(timestamp__gte=start_date)
        elif time_range == 'custom':
            date_from = request.query_params.get('date_from')
            date_to = request.query_params.get('date_to')
            if date_from:
                queryset = queryset.filter(timestamp__date__gte=date_from)
            if date_to:
                queryset = queryset.filter(timestamp__date__lte=date_to)
    
    return queryset

def get_days_from_time_range(time_range):
    """Get number of days based on time range"""
    time_range_map = {
        'last-24h': 1,
        'last-7d': 7,
        'last-30d': 30,
        'custom': 7
    }
    return time_range_map.get(time_range, 7)

#  CSV UPLOAD & PROCESSING API

@api_view(['POST'])
def upload_csv_file(request):
    """Upload and process CSV file"""
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']
        
        # Validate file type
        if not uploaded_file.name.endswith('.csv'):
            return Response({
                'success': False, 
                'error': 'Only CSV files are supported'
            }, status=400)
        
        # Create file record
        file_instance = UploadedCSVFile.objects.create(
            file=uploaded_file,
            original_name=uploaded_file.name,
            uploaded_by=request.user
        )
        
        try:
            # Process CSV file
            result = csv_parser.process_csv_file(file_instance)
            
            # Create success notification
            notification_manager.create_upload_notification(
                user=request.user,
                filename=uploaded_file.name,
                row_count=result['row_count']
            )
            
            return Response({
                'success': True,
                'file_id': file_instance.id,
                'row_count': result['row_count'],
                'message': f'Successfully processed {result["row_count"]} rows'
            })
            
        except Exception as e:
            file_instance.delete()
            return Response({
                'success': False,
                'error': f'Error processing CSV: {str(e)}'
            }, status=400)
    
    return Response({'success': False, 'error': 'No file provided'}, status=400)

#  NOTIFICATION APIs

@api_view(['GET'])
def user_notifications(request):
    """Get user notifications"""
    notifications = Notification.objects.filter(user=request.user).order_by('-created_at')[:20]
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def mark_notification_read(request, notification_id):
    """Mark notification as read"""
    try:
        notification = Notification.objects.get(id=notification_id, user=request.user)
        notification.is_read = True
        notification.save()
        return Response({'success': True})
    except Notification.DoesNotExist:
        return Response({'error': 'Notification not found'}, status=404)

@api_view(['POST'])
def mark_all_notifications_read(request):
    """Mark all notifications as read"""
    Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return Response({'success': True})

@api_view(['GET'])
def unread_notification_count(request):
    """Get count of unread notifications"""
    count = Notification.objects.filter(user=request.user, is_read=False).count()
    return Response({'count': count})

#  DASHBOARD STATS API

@api_view(['GET'])
def dashboard_stats(request):
    """Dashboard statistics with filters"""
    queryset = SecurityEvent.objects.all()
    queryset = apply_security_filters(queryset, request)
    
    today = timezone.now().date()
    last_week = today - timedelta(days=7)
    
    stats = {
        "total_alerts": queryset.count(),
        "critical_alerts": queryset.filter(severity_level='critical').count(),
        "new_today": queryset.filter(timestamp__date=today).count(),
        "active_incidents": queryset.filter(severity_level__in=['high', 'critical']).count(),
        "blocked_threats": queryset.filter(action_taken='blocked').count(),
        "success_rate": round((queryset.filter(action_taken='blocked').count() / max(queryset.count(), 1) * 100), 1),
        "top_threat_type": get_top_threat_type(queryset),
        "threats_trend": get_threat_trend(queryset)
    }
    
    return Response(stats)

def get_top_threat_type(queryset):
    """Get most common threat type"""
    result = queryset.values('threat_name').annotate(
        count=Count('id')
    ).order_by('-count').first()
    return result['threat_name'] if result else 'None'

def get_threat_trend(queryset):
    """Calculate threat trend compared to previous period"""
    now = timezone.now()
    current_period = queryset.filter(
        timestamp__gte=now - timedelta(days=7)
    ).count()
    
    previous_period = SecurityEvent.objects.filter(
        timestamp__range=(now - timedelta(days=14), now - timedelta(days=7))
    ).count()
    
    if previous_period == 0:
        return 0
    return round(((current_period - previous_period) / previous_period) * 100, 1)

#  SECURITY EVENTS VIEWSET

class SecurityEventViewSet(viewsets.ModelViewSet):
    queryset = SecurityEvent.objects.all().order_by('-timestamp')
    serializer_class = SecurityEventSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = SecurityEvent.objects.all().order_by('-timestamp')
        return apply_security_filters(queryset, self.request)

#  NOTIFICATION VIEWSET

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')
    
    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        """Mark all notifications as read"""
        Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return Response({'success': True})