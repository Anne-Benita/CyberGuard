from django.db import models
from django.contrib.postgres.fields import JSONField
from authentication.models import CustomUser

class UploadedCSVFile(models.Model):
    file = models.FileField(upload_to='csv_uploads/')
    original_name = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)
    row_count = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return self.original_name

class SecurityEvent(models.Model):
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    THREAT_TYPES = [
        ('malware', 'Malware'),
        ('phishing', 'Phishing'),
        ('ddos', 'DDoS'),
        ('brute_force', 'Brute Force'),
        ('sql_injection', 'SQL Injection'),
        ('xss', 'XSS'),
        ('ransomware', 'Ransomware'),
        ('data_breach', 'Data Breach'),
    ]
    
    # Core fields from CSV
    timestamp = models.DateTimeField()
    source_ip = models.GenericIPAddressField()
    destination_ip = models.GenericIPAddressField()
    threat_name = models.CharField(max_length=200)
    severity_level = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    action_taken = models.CharField(max_length=50)
    protocol = models.CharField(max_length=20)
    target_port = models.IntegerField(null=True, blank=True)
    malware_family = models.CharField(max_length=100, blank=True)
    cve_id = models.CharField(max_length=50, blank=True)
    
    # Geographic data
    geo_country = models.CharField(max_length=100)
    geo_latitude = models.FloatField(null=True, blank=True)
    geo_longitude = models.FloatField(null=True, blank=True)
    
    # Additional context
    description = models.TextField(blank=True)
    source_file = models.ForeignKey(UploadedCSVFile, on_delete=models.CASCADE, null=True, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['timestamp']),
            models.Index(fields=['severity_level']),
            models.Index(fields=['threat_name']),
        ]
    
    def __str__(self):
        return f"{self.threat_name} - {self.severity_level}"

class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, choices=[
        ('threat_alert', 'Threat Alert'),
        ('system_alert', 'System Alert'),
        ('upload_success', 'Upload Success'),
        ('ml_insight', 'ML Insight'),
    ])
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    data = JSONField(default=dict)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class WebsiteMonitor(models.Model):
    url = models.URLField(max_length=500)
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=[
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('error', 'Error'),
    ], default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name