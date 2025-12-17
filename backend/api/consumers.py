import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync


class ThreatDataConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        """Client connects to WebSocket"""
        await self.accept()

        # Main group for dashboard updates
        await self.channel_layer.group_add("threat_monitoring", self.channel_name)

        # Default filters (no filter)
        self.active_filters = {}

        # Send initial dashboard data
        await self.send_initial_payload()

        print(f"[WS] Connected → {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("threat_monitoring", self.channel_name)
        await self.channel_layer.group_discard("threat_alerts", self.channel_name)
        print(f"[WS] Disconnected → {self.channel_name}")

    async def receive(self, text_data):
        """Receive message from frontend"""
        try:
            data = json.loads(text_data)
            action = data.get("action")

            # -------------------------
            # 1. SUBSCRIBE TO ALERTS
            # -------------------------
            if action == "subscribe_alerts":
                await self.channel_layer.group_add("threat_alerts", self.channel_name)
                await self.send_json(type="subscription", message="Subscribed to alerts")

            # -------------------------
            # 2. UNSUBSCRIBE FROM ALERTS
            # -------------------------
            elif action == "unsubscribe_alerts":
                await self.channel_layer.group_discard("threat_alerts", self.channel_name)
                await self.send_json(type="subscription", message="Unsubscribed")

            # -------------------------
            # 3. APPLY FILTERS
            # Frontend sends example:
            # { "action": "apply_filters", "filters": {"severity": "high", "time_range": "24h"} }
            # -------------------------
            elif action == "apply_filters":
                self.active_filters = data.get("filters", {})
                filtered_data = await self.get_filtered_events()
                await self.send_json(type="filtered_data", data=filtered_data)

            else:
                await self.send_json(type="error", message="Unknown action received")

        except Exception as e:
            await self.send_json(type="error", message=f"Exception: {e}")

    # ------------------------------------------------
    # WebSocket EVENT HANDLERS
    # ------------------------------------------------
    async def threat_alert(self, event):
        await self.send_json(type="threat_alert", data=event["data"])

    async def notification_update(self, event):
        await self.send_json(type="new_notification", data=event["data"])

    async def data_update(self, event):
        """Dashboard refresh after CSV uploads or API ingest"""
        await self.send_json(type="data_update", data=event["data"])

    # ------------------------------------------------
    # INITIAL PAYLOAD
    # ------------------------------------------------
    async def send_initial_payload(self):
        initial = await self.get_initial_data()
        await self.send_json(type="initial_data", data=initial)

    # ------------------------------------------------
    # DATABASE CALLS
    # ------------------------------------------------
    @database_sync_to_async
    def get_initial_data(self):
        from api.models import Notification, SecurityEvent

        user = self.scope.get("user")
        unread = 0
        if user and user.is_authenticated:
            unread = Notification.objects.filter(user=user, is_read=False).count()

        return {
            "unread_notifications": unread,
            "total_events": SecurityEvent.objects.count(),
            "status": "WebSocket connected"
        }

    @database_sync_to_async
    def get_filtered_events(self):
        """Apply filters sent by the frontend"""
        from api.models import SecurityEvent
        from api.serializers import SecurityEventSerializer
        import datetime
        from django.utils import timezone

        qs = SecurityEvent.objects.all()

        # ---- Severity filter ----
        severity = self.active_filters.get("severity")
        if severity and severity != "all":
            qs = qs.filter(severity_level=severity)

        # ---- Threat type ----
        ttype = self.active_filters.get("threat_type")
        if ttype and ttype != "all":
            qs = qs.filter(threat_name__icontains=ttype)

        # ---- Time range ----
        time_range = self.active_filters.get("time_range")
        if time_range:
            now = timezone.now()

            if time_range == "24h":
                qs = qs.filter(timestamp__gte=now - datetime.timedelta(hours=24))

            elif time_range == "7d":
                qs = qs.filter(timestamp__gte=now - datetime.timedelta(days=7))

            elif time_range == "30d":
                qs = qs.filter(timestamp__gte=now - datetime.timedelta(days=30))

        return SecurityEventSerializer(qs[:200], many=True).data  # Limit for speed

    # ------------------------------------------------
    # HELPER
    # ------------------------------------------------
    async def send_json(self, **kwargs):
        await self.send(text_data=json.dumps(kwargs))


# ------------------------------------------------------
# FUNCTIONS USED BY BACKEND TO TRIGGER WEBSOCKET EVENTS
# ------------------------------------------------------

def send_threat_alert(threat_data):
    """Trigger real-time alert to subscribed users"""
    from channels.layers import get_channel_layer
    layer = get_channel_layer()
    async_to_sync(layer.group_send)(
        "threat_alerts",
        {"type": "threat_alert", "data": threat_data}
    )


def send_notification_update(notification_data):
    """Notify all users"""
    from channels.layers import get_channel_layer
    layer = get_channel_layer()
    async_to_sync(layer.group_send)(
        "threat_monitoring",
        {"type": "notification_update", "data": notification_data}
    )


def send_data_update(update_data):
    """Refresh dashboard after CSV/API ingest"""
    from channels.layers import get_channel_layer
    layer = get_channel_layer()
    async_to_sync(layer.group_send)(
        "threat_monitoring",
        {"type": "data_update", "data": update_data}
    )
