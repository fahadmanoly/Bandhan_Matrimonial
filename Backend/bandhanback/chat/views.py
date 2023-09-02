from django.forms.models import model_to_dict
import json
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from django.http import JsonResponse
from .models import chatroom, ChatMessage
from useraccount.models import User
from .serializer import *

class ChatMessageView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class=MessageSerializer
    def post(self, request):
        room_name = request.data.get('room_name')
        sender_id = request.data.get('sender_id')
        receiver_id = request.data.get('receiver_id')
        message = request.data.get('message')

        try:
            room = chatroom.objects.get(name=room_name)
            sender = User.objects.get(id=sender_id)
            receiver = User.objects.get(id=receiver_id)

            chat_message = ChatMessage.objects.create(
                room=room,
                sender=sender,
                message=message,
                receiver=receiver
            )
            try:
                data_ = ChatMessage.objects.filter(sender=sender.id,message=message).first()
                serializer = MessageSerializer(chat_message)
                data = serializer.data
            except ChatMessage.DoesNotExist:
                data=None
            return JsonResponse({'success': True, 'message': 'Message added successfully.','data':data})
        except chatroom.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Chat room does not exist.'})
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Sender user does not exist.'})
    
    def get(self, request,user_Id,match_Id):
        room_name = request.GET.get('room_name')
        try:
            room = chatroom.objects.get(name=room_name)
            messages = room.messages.all().order_by('time')

            serializer = MessageSerializer(messages, many=True)
            data = serializer.data

            return JsonResponse({'success': True, 'messages': data})
        except chatroom.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Chat room does not exist.'})