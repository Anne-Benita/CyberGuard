from django.contrib import admin
from .models import SecurityEvent, Notification, UploadedCSVFile, WebsiteMonitor

@admin.register(SecurityEvent)
class SecurityEventAdmin(admin.ModelAdmin):
    list_display = ['threat_name', 'severity_level', 'source_ip', 'timestamp']
    list_filter = ['severity_level', 'threat_name', 'timestamp']
    search_fields = ['threat_name', 'source_ip', 'destination_ip']

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'notification_type', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read', 'created_at']
    search_fields = ['title', 'message']

@admin.register(UploadedCSVFile)
class UploadedCSVFileAdmin(admin.ModelAdmin):
    list_display = ['original_name', 'uploaded_by', 'uploaded_at', 'processed', 'row_count']
    list_filter = ['processed', 'uploaded_at']

@admin.register(WebsiteMonitor)
class WebsiteMonitorAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'status', 'created_at']
    list_filter = ['status', 'created_at']