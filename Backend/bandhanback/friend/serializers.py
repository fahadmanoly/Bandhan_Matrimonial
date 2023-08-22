from dataclasses import fields
from rest_framework import serializers
from useraccount.serializers import UserProfileSerializer
from .models import FriendRequest, FriendList


class FriendRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FriendRequest
        fields = ['id', 'sender', 'receiver', 'is_accepted']
        
        
class FriendListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendList
        fields = '__all__'
        
        
