import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async

class ThreatDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Client connects to WebSocket"""
        await self.accept()
        
        # Add client to threat_monitoring group
        await self.channel_layer.group_add("threat_monitoring", self.channel_name)
        
        # Send initial data
        initial_data = await self.get_initial_data()
        await self.send(text_data=json.dumps({
            'type': 'initial_data',
            'data': initial_data
        }))
        
        print(f"WebSocket connected: {self.channel_name}")
    
    async def disconnect(self, close_code):
        """Client disconnects from WebSocket"""
        await self.channel_layer.group_discard("threat_monitoring", self.channel_name)
        print(f"WebSocket disconnected: {self.channel_name}")
    
    async def receive(self, text_data):
        """Receive message from client"""
        try:
            data = json.loads(text_data)
            print(f"Received WebSocket message: {data}")
            
            if data.get('action') == 'subscribe_alerts':
                # Client wants to receive real-time alerts
                await self.channel_layer.group_add("threat_alerts", self.channel_name)
                await self.send(text_data=json.dumps({
                    'type': 'subscription_success',
                    'message': 'Subscribed to threat alerts'
                }))
                
            elif data.get('action') == 'unsubscribe_alerts':
                # Client wants to stop receiving alerts
                await self.channel_layer.group_discard("threat_alerts", self.channel_name)
                await self.send(text_data=json.dumps({
                    'type': 'subscription_success', 
                    'message': 'Unsubscribed from threat alerts'
                }))
                
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid JSON received'
            }))
    
    async def threat_alert(self, event):
        """Send real-time threat alert to client"""
        await self.send(text_data=json.dumps({
            'type': 'threat_alert',
            'data': event['data']
        }))
    
    async def notification_update(self, event):
        """Send new notification to client"""
        await self.send(text_data=json.dumps({
            'type': 'new_notification',
            'data': event['data']
        }))
    
    async def data_update(self, event):
        """Send data updates to client (new CSV processed, etc.)"""
        await self.send(text_data=json.dumps({
            'type': 'data_update',
            'data': event['data']
        }))
    
    @database_sync_to_async
    def get_initial_data(self):
        """Get initial data when client connects"""
        from api.models import Notification, SecurityEvent
        from django.core import serializers
        
        # Get user from scope (you might need to implement authentication)
        user = self.scope.get('user')
        
        if user and user.is_authenticated:
            unread_count = Notification.objects.filter(user=user, is_read=False).count()
        else:
            unread_count = 0
            
        return {
            'unread_notifications': unread_count,
            'recent_threats_count': SecurityEvent.objects.all().count(),
            'message': 'WebSocket connected successfully'
        }

# WebSocket event sender functions
def send_threat_alert(threat_data):
    """Send threat alert to all connected WebSocket clients"""
    from channels.layers import get_channel_layer
    from asgiref.sync import async_to_sync
    
    channel_layer = get_channel_layer()
    
    async_to_sync(channel_layer.group_send)(
        "threat_alerts",
        {
            "type": "threat_alert",
            "data": threat_data
        }
    )

def send_notification_update(notification_data):
    """Send notification update to all connected clients"""
    from channels.layers import get_channel_layer
    from asgiref.sync import async_to_sync
    
    channel_layer = get_channel_layer()
    
    async_to_sync(channel_layer.group_send)(
        "threat_monitoring",
        {
            "type": "notification_update",
            "data": notification_data
        }
    )

def send_data_update(update_data):
    """Send data update to all connected clients"""
    from channels.layers import get_channel_layer
    from asgiref.sync import async_to_sync
    
    channel_layer = get_channel_layer()
    
    async_to_sync(channel_layer.group_send)(
        "threat_monitoring",
        {
            "type": "data_update", 
            "data": update_data
        }
    )