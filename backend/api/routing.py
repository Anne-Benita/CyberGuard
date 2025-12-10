from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/threat-monitoring/$', consumers.ThreatDataConsumer.as_asgi()),
]