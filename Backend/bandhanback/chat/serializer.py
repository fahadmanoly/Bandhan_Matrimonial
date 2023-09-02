from rest_framework.serializers import (ModelSerializer,CharField)
from rest_framework import serializers
from .models import ChatMessage
from useraccount.models import User


class ChatSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'email', 'name']



class MessageSerializer(serializers.ModelSerializer):
    sender = ChatSerializer(read_only=True)
    receiver = ChatSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['room', 'sender', 'receiver', 'message', 'time']