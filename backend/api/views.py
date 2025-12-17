# api/views.py

import os
import csv
import json
from datetime import timedelta, datetime

from django.conf import settings
from django.utils import timezone
from django.db.models import Count, Q
from django.contrib.auth import login
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import SecurityEvent, Notification, UploadedCSVFile, WebsiteMonitor
from .serializers import (
    SecurityEventSerializer,
    NotificationSerializer,
    UploadedCSVFileSerializer,
    UserSerializer,
)

# Dummy chart data
from .chart_data import (
    HIGH_IMPACT_DATA,
    REVENUE_CHART_DATA,
    HOURLY_THREATS_DATA,
    THREAT_PIE_DATA,
    STATS_GRID,
    MAP_DATA,
    CYBER_THREAT_TABLE
)

# ------------------------------------------
# Helper: Filter SecurityEvent queryset
# ------------------------------------------
def filter_security_events(request, base_qs=None):
    qs = base_qs if base_qs is not None else SecurityEvent.objects.all()

    country = request.GET.get("country")
    if country and country.lower() != "all":
        qs = qs.filter(geo_country__iexact=country)

    severity = request.GET.get("severity")
    if severity and severity.lower() != "all":
        qs = qs.filter(severity_level__iexact=severity)

    threat_type = request.GET.get("threatType") or request.GET.get("threat_type")
    if threat_type and threat_type.lower() != "all":
        qs = qs.filter(threat_name__icontains=threat_type)

    # Time filters
    time_range = request.GET.get("timeRange")
    start_str = request.GET.get("start")
    end_str = request.GET.get("end")
    now = timezone.now()

    if time_range:
        if time_range == "last-24h":
            qs = qs.filter(timestamp__gte=now - timedelta(hours=24))
        elif time_range == "last-7d":
            qs = qs.filter(timestamp__gte=now - timedelta(days=7))
        elif time_range == "last-30d":
            qs = qs.filter(timestamp__gte=now - timedelta(days=30))

    if start_str:
        try:
            start_dt = timezone.make_aware(datetime.fromisoformat(start_str))
            qs = qs.filter(timestamp__gte=start_dt)
        except Exception:
            pass

    if end_str:
        try:
            end_dt = timezone.make_aware(datetime.fromisoformat(end_str))
            qs = qs.filter(timestamp__lte=end_dt)
        except Exception:
            pass

    return qs

# ------------------------------------------
# Authentication
# ------------------------------------------
@api_view(['POST'])
def login_user(request):
    data = request.data
    identifier = (data.get('username') or data.get('email') or "").strip()
    password = data.get('password')

    if not identifier or not password:
        return Response({"success": False, "error": "Username/email and password required"}, status=400)

    user_obj = User.objects.filter(Q(username__iexact=identifier) | Q(email__iexact=identifier)).first()
    if not user_obj or not user_obj.check_password(password):
        return Response({"success": False, "error": "Invalid credentials"}, status=401)

    if not user_obj.is_active:
        return Response({"success": False, "error": "User account is inactive"}, status=403)

    login(request, user_obj)
    serializer = UserSerializer(user_obj)
    return Response({"success": True, "user": serializer.data})

@api_view(['POST'])
def signup_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    if User.objects.filter(username=username).exists():
        return Response({"success": False, "error": "Username already exists"}, status=400)
    user = User.objects.create_user(username=username, email=email, password=password)
    serializer = UserSerializer(user)
    return Response({"success": True, "user": serializer.data})

# ------------------------------------------
# Security Events / Charts
# ------------------------------------------
@api_view(['GET'])
def get_events(request):
    qs = filter_security_events(request)
    serializer = SecurityEventSerializer(qs.order_by('-timestamp'), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_latest_events(request):
    qs = filter_security_events(request).order_by('-timestamp')[:20]
    serializer = SecurityEventSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_hourly_threats(request):
    base_qs = SecurityEvent.objects.filter(timestamp__gte=timezone.now() - timedelta(hours=24))
    qs = filter_security_events(request, base_qs)
    hourly_data = []
    start = timezone.now() - timedelta(hours=24)
    for i in range(24):
        hour_start = start + timedelta(hours=i)
        hour_end = hour_start + timedelta(hours=1)
        count = qs.filter(timestamp__range=(hour_start, hour_end)).count()
        hourly_data.append({"hour": hour_start.strftime("%H:00"), "count": count})
    return Response(hourly_data)

@api_view(['GET'])
def get_threat_by_type(request):
    qs = filter_security_events(request)
    data = qs.values('threat_name').annotate(count=Count('id')).order_by('-count')[:12]
    colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#64748b", "#06b6d4", "#a78bfa"]
    result = [{"name": item['threat_name'], "value": item['count'], "color": colors[i % len(colors)]} for i, item in enumerate(data)]
    return Response(result)

@api_view(['GET'])
def get_severity_counts(request):
    qs = filter_security_events(request)
    data = qs.values('severity_level').annotate(count=Count('id')).order_by('-count')
    return Response({"categories": [d['severity_level'] for d in data], "values": [d['count'] for d in data]})

@api_view(['GET'])
def get_dashboard_summary(request):
    qs = filter_security_events(request)
    total_alerts = qs.count()
    blocked = qs.filter(action_taken__iexact='blocked').count()
    critical = qs.filter(severity_level__iexact='critical').count()
    high = qs.filter(severity_level__iexact='high').count()
    low = qs.filter(severity_level__iexact='low').count()
    top_threat = qs.values('threat_name').annotate(count=Count('id')).order_by('-count').first()
    top_country = qs.values('geo_country').annotate(count=Count('id')).order_by('-count').first()
    return Response({
        "total_alerts": total_alerts,
        "blocked_threats": blocked,
        "critical_alerts": critical,
        "high_alerts": high,
        "low_alerts": low,
        "top_threat": top_threat['threat_name'] if top_threat else None,
        "most_active_country": top_country['geo_country'] if top_country else None,
        "success_rate": round((blocked / max(total_alerts, 1)) * 100, 1)
    })

# ------------------------------------------
# Map Endpoint
# ------------------------------------------
COUNTRY_COORDINATES = {
    "USA": {"lat": 37.0902, "lng": -95.7129},
    "China": {"lat": 35.8617, "lng": 104.1954},
    "Germany": {"lat": 51.1657, "lng": 10.4515},
    "Brazil": {"lat": -14.2350, "lng": -51.9253},
    "India": {"lat": 20.5937, "lng": 78.9629},
}

SEVERITY_COLORS = {
    "critical": "#ef4444",
    "high": "#f97316",
    "medium": "#eab308",
    "low": "#22c55e",
}

def get_country_coords(country_name):
    return COUNTRY_COORDINATES.get(country_name, {"lat": 0.0, "lng": 0.0})

@api_view(['GET'])
def map_data(request):
    """
    Returns map points for the frontend.
    """
    qs = filter_security_events(request).order_by('-timestamp')[:500]  # latest 500 events
    points = []

    for event in qs:
        lat = event.geo_latitude if event.geo_latitude is not None else get_country_coords(event.geo_country)["lat"]
        lng = event.geo_longitude if event.geo_longitude is not None else get_country_coords(event.geo_country)["lng"]

        points.append({
            "id": event.id,
            "lat": float(lat),
            "lng": float(lng),
            "title": event.threat_name,
            "description": f"{event.threat_name} from {event.source_ip} ({event.geo_country})",
            "severity": event.severity_level,
            "color": SEVERITY_COLORS.get(event.severity_level.lower(), "#3b82f6"),
            "country": event.geo_country,
            "timestamp": event.timestamp.isoformat()
        })

    return Response(points)

# ------------------------------------------
# Dummy Data Endpoints
# ------------------------------------------
@api_view(['GET'])
def high_impact_chart(request):
    return Response(HIGH_IMPACT_DATA)

@api_view(['GET'])
def revenue_chart(request):
    return Response(REVENUE_CHART_DATA)

@api_view(['GET'])
def hourly_threats_chart(request):
    return Response(HOURLY_THREATS_DATA)

@api_view(['GET'])
def threat_pie_chart(request):
    return Response(THREAT_PIE_DATA)

@api_view(['GET'])
def stats_grid(request):
    return Response(STATS_GRID)

@api_view(['GET'])
def map_data_dummy(request):
    return Response(MAP_DATA)

@api_view(['GET'])
def cyber_threat_table(request):
    return Response(CYBER_THREAT_TABLE)

# ------------------------------------------
# CSV Upload
# ------------------------------------------
@api_view(['POST'])
def upload_csv_file(request):
    file = request.FILES.get('file')
    if not file:
        return Response({"success": False, "error": "No file provided"}, status=400)
    upload = UploadedCSVFile.objects.create(
        file=file,
        original_name=file.name,
        uploaded_by=request.user if request.user.is_authenticated else None
    )

    try:
        with open(upload.file.path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                SecurityEvent.objects.create(
                    timestamp=row.get('timestamp') or timezone.now(),
                    source_ip=row.get('source_ip') or '',
                    destination_ip=row.get('destination_ip') or '',
                    threat_name=row.get('threat_name') or 'Unknown',
                    severity_level=row.get('severity') or 'low',
                    action_taken=row.get('action_taken') or '',
                    protocol=row.get('protocol') or '',
                    target_port=row.get('target_port') or None,
                    malware_family=row.get('malware_family') or '',
                    cve_id=row.get('cve_id') or '',
                    geo_country=row.get('geo_country') or '',
                    geo_latitude=row.get('geo_latitude') or None,
                    geo_longitude=row.get('geo_longitude') or None,
                    description=row.get('description') or '',
                    source_file=upload
                )
        return Response({"success": True, "file": UploadedCSVFileSerializer(upload).data})
    except Exception as ex:
        return Response({"success": False, "error": str(ex)}, status=500)

# ------------------------------------------
# VirusTotal Ingestion
# ------------------------------------------
VT_API_KEY = getattr(settings, "VT_API_KEY", os.environ.get("VT_API_KEY", None))

@api_view(['POST'])
def ingest_virustotal(request):
    if not VT_API_KEY:
        return Response({"error": "VirusTotal API key not configured"}, status=400)

    payload = request.data
    SecurityEvent.objects.create(
        timestamp=timezone.now(),
        threat_name="VirusTotal Check",
        severity_level="medium",
        description=json.dumps(payload)
    )
    return Response({"success": True, "payload": payload})

# ------------------------------------------
# Notifications
# ------------------------------------------
@api_view(['GET'])
def get_notifications(request):
    notifications = Notification.objects.all().order_by('-created_at')[:50]
    unread_count = Notification.objects.filter(is_read=False).count()
    serializer = NotificationSerializer(notifications, many=True)
    return Response({"notifications": serializer.data, "unread_count": unread_count})

@api_view(['POST'])
def mark_notification_read(request, pk):
    try:
        n = Notification.objects.get(id=pk)
        n.is_read = True
        n.save()
        return Response({"success": True})
    except Notification.DoesNotExist:
        return Response({"success": False, "error": "Notification not found"}, status=404)

# ------------------------------------------
# Website Monitor CRUD
# ------------------------------------------
@api_view(['GET'])
def list_monitored_sites(request):
    sites = WebsiteMonitor.objects.all()
    return Response([{"id": s.id, "name": s.name, "url": s.url, "status": s.status} for s in sites])

@api_view(['POST'])
def add_monitored_site(request):
    name = request.data.get('name')
    url = request.data.get('url')
    site = WebsiteMonitor.objects.create(name=name, url=url)
    return Response({"success": True, "site": {"id": site.id, "name": site.name, "url": site.url, "status": site.status}})

@api_view(['DELETE'])
def delete_monitored_site(request, pk):
    try:
        site = WebsiteMonitor.objects.get(id=pk)
        site.delete()
        return Response({"success": True})
    except WebsiteMonitor.DoesNotExist:
        return Response({"success": False, "error": "Site not found"}, status=404)
