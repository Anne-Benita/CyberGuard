# api/urls.py

from django.urls import path
from . import views
from .views import ingest_virustotal, map_data

urlpatterns = [
    # -------------------------
    # Authentication
    # -------------------------
    path('login/', views.login_user, name='login'),
    path('signup/', views.signup_user, name='signup'),

    # -------------------------
    # Security Events / Charts (Real)
    # -------------------------
    path('events/', views.get_events, name='all-events'),
    path('latest-alerts/', views.get_latest_events, name='latest-alerts'),
    path('high-impact-chart/', views.get_severity_counts, name='high-impact-chart'),
    path('vul-type-chart/', views.get_threat_by_type, name='vul-type-chart'),
    path('hourly-threats/', views.get_hourly_threats, name='hourly-threats'),

    # -------------------------
    # Dashboard Summary
    # -------------------------
    path('dashboard-summary/', views.get_dashboard_summary, name='dashboard-summary'),

    # -------------------------
    # Map Data (Real)
    # -------------------------
    path('map-data/', map_data, name='map-data'),
    path('dummy/map-data/', views.map_data_dummy, name='dummy-map-data'),

    # -------------------------
    # Stats Grid / Dummy Charts (for frontend testing)
    # -------------------------
    path('dummy/high-impact-chart/', views.high_impact_chart, name='dummy-high-impact-chart'),
    path('dummy/revenue-chart/', views.revenue_chart, name='dummy-revenue-chart'),
    path('dummy/hourly-threats/', views.hourly_threats_chart, name='dummy-hourly-threats-chart'),
    path('dummy/threat-pie/', views.threat_pie_chart, name='dummy-threat-pie-chart'),
    path('dummy/stats-grid/', views.stats_grid, name='dummy-stats-grid'),
    path('dummy/cyber-threats-table/', views.cyber_threat_table, name='dummy-cyber-threats-table'),

    # -------------------------
    # Notifications
    # -------------------------
    path('notifications/', views.get_notifications, name='notifications'),
    path('notifications/<int:pk>/read/', views.mark_notification_read, name='mark-notification-read'),

    # -------------------------
    # CSV Upload
    # -------------------------
    path('upload-csv/', views.upload_csv_file, name='upload-csv'),

    # -------------------------
    # Website Monitoring
    # -------------------------
    path('websites/', views.list_monitored_sites, name='list-websites'),
    path('websites/add/', views.add_monitored_site, name='add-website'),
    path('websites/<int:pk>/delete/', views.delete_monitored_site, name='delete-website'),

    # -------------------------
    # VirusTotal Ingestion
    # -------------------------
    path('ingest/vt/', ingest_virustotal, name='ingest-vt'),
]
