from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/threat-monitoring/", consumers.ThreatDataConsumer.as_asgi()),

]
