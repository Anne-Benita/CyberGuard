from rest_framework import serializers
from .models import SecurityEvent, Notification, UploadedCSVFile, WebsiteMonitor
from django.contrib.auth.models import User


# -------------------------
# SECURITY EVENT SERIALIZER
# -------------------------

class SecurityEventSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = SecurityEvent
        fields = '__all__'

    def get_time_ago(self, obj):
        from django.utils.timesince import timesince
        return f"{timesince(obj.timestamp)} ago"


# -------------------------
# NOTIFICATION SERIALIZER
# -------------------------

class NotificationSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = '__all__'

    def get_time_ago(self, obj):
        from django.utils.timesince import timesince
        return f"{timesince(obj.created_at)} ago"


# -------------------------
# CSV FILE UPLOAD SERIALIZER
# -------------------------

class UploadedCSVFileSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.username', read_only=True)

    class Meta:
        model = UploadedCSVFile
        fields = [
            'id', 'file', 'original_name',
            'uploaded_by', 'uploaded_by_name',
            'uploaded_at', 'processed', 'row_count'
        ]


# -------------------------
# WEBSITE MONITOR SERIALIZER
# -------------------------

class WebsiteMonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteMonitor
        fields = '__all__'


# -------------------------
# USER SERIALIZER
# -------------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
