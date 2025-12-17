from django.contrib import admin
from .models import SecurityEvent, Notification, UploadedCSVFile, WebsiteMonitor


@admin.register(SecurityEvent)
class SecurityEventAdmin(admin.ModelAdmin):
    list_display = [
        'threat_name', 'severity_level', 'source_ip', 'destination_ip',
        'geo_country', 'timestamp'
    ]
    list_filter = [
        'severity_level', 'threat_name', 'geo_country',
        'action_taken', 'protocol', 'timestamp'
    ]
    search_fields = [
        'threat_name', 'source_ip', 'destination_ip',
        'malware_family', 'cve_id', 'geo_country'
    ]
    ordering = ['-timestamp']

    # Improve admin form layout
    fieldsets = (
        ('Threat Info', {
            'fields': ('threat_name', 'severity_level', 'malware_family', 'cve_id')
        }),
        ('Network Info', {
            'fields': ('source_ip', 'destination_ip', 'protocol', 'target_port')
        }),
        ('Location Info', {
            'fields': ('geo_country', 'geo_latitude', 'geo_longitude')
        }),
        ('Additional Info', {
            'fields': ('action_taken', 'description', 'source_file')
        }),
        ('Timestamps', {
            'fields': ('timestamp',),
        }),
    )

    readonly_fields = ['timestamp']


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'notification_type', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read', 'created_at']
    search_fields = ['title', 'message']
    ordering = ['-created_at']
    readonly_fields = ['created_at']

    # Bulk admin actions
    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected notifications as read"

    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
    mark_as_unread.short_description = "Mark selected notifications as unread"


@admin.register(UploadedCSVFile)
class UploadedCSVFileAdmin(admin.ModelAdmin):
    list_display = ['original_name', 'uploaded_by', 'uploaded_at', 'processed', 'row_count']
    list_filter = ['processed', 'uploaded_at']
    search_fields = ['original_name']
    ordering = ['-uploaded_at']
    readonly_fields = ['uploaded_at', 'row_count']


@admin.register(WebsiteMonitor)
class WebsiteMonitorAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'url']
    ordering = ['-created_at']
    readonly_fields = ['created_at']
