from rest_framework import serializers
from .models import SecurityEvent, Notification, UploadedCSVFile
from authentication.models import CustomUser

class SecurityEventSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()
    
    class Meta:
        model = SecurityEvent
        fields = '__all__'
    
    def get_time_ago(self, obj):
        from django.utils import timezone
        from django.utils.timesince import timesince
        return f"{timesince(obj.timestamp)} ago"

class NotificationSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()
    
    class Meta:
        model = Notification
        fields = '__all__'
    
    def get_time_ago(self, obj):
        from django.utils import timezone
        from django.utils.timesince import timesince
        return f"{timesince(obj.created_at)} ago"

class UploadedCSVFileSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.username', read_only=True)
    
    class Meta:
        model = UploadedCSVFile
        fields = ['id', 'file', 'original_name', 'uploaded_by', 'uploaded_by_name', 
                 'uploaded_at', 'processed', 'row_count']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'role', 'department', 'first_name', 'last_name')