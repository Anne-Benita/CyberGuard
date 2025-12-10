from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'security-events', views.SecurityEventViewSet)
router.register(r'notifications', views.NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Chart APIs
    path('chart/pie/', views.pie_chart_data, name='pie-chart'),
    path('chart/line/', views.line_chart_data, name='line-chart'),
    path('chart/bar/', views.bar_chart_data, name='bar-chart'),
    path('chart/cluster-column/', views.cluster_column_data, name='cluster-column'),
    path('map-data/', views.map_data, name='map-data'),
    
    # Dashboard
    path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    
    # File Upload
    path('upload-csv/', views.upload_csv_file, name='upload-csv'),
    
    # Notifications
    path('notifications/user/', views.user_notifications, name='user-notifications'),
    path('notifications/<int:notification_id>/mark-read/', views.mark_notification_read, name='mark-notification-read'),
    path('notifications/mark-all-read/', views.mark_all_notifications_read, name='mark-all-read'),
    path('notifications/unread-count/', views.unread_notification_count, name='unread-count'),
]