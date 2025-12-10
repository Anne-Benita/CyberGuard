import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class ThreatDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("threat_monitoring", self.channel_name)
        
        # Send initial data
        initial_data = await self.get_initial_data()
        await self.send(text_data=json.dumps({
            'type': 'initial_data',
            'data': initial_data
        }))
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("threat_monitoring", self.channel_name)
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        
        if data.get('action') == 'subscribe_alerts':
            await self.channel_layer.group_add("threat_alerts", self.channel_name)
    
    async def threat_alert(self, event):
        await self.send(text_data=json.dumps({
            'type': 'threat_alert',
            'data': event['data']
        }))
    
    async def notification_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'new_notification',
            'data': event['data']
        }))
    
    @database_sync_to_async
    def get_initial_data(self):
        from api.models import Notification
        return {
            'unread_notifications': Notification.objects.filter(
                user=self.scope["user"], is_read=False
            ).count(),
        }