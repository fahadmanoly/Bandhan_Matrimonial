from .serializers import FriendRequestSerializer, FriendListSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from useraccount.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import FriendList, FriendRequest
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

# Create your views here.


class SendConnectionRequestView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]  
    def post(self,request,receiver_id,format=None):
        sender = request.user
        receiver = get_object_or_404(get_user_model(), id=receiver_id)
        if FriendList.objects.filter(user=sender, friends=receiver_id).exists():
            return Response({'detail': 'Users are already Connected.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            existing_request = FriendRequest.objects.filter(sender=sender.id, receiver=receiver_id, is_active=True).first()
            if existing_request:
                return Response({'detail': 'Connection request already sent.'}, status=status.HTTP_400_BAD_REQUEST)
            existing_request2 = FriendRequest.objects.filter(sender=receiver_id, receiver=sender.id, is_active=True).first()
            if existing_request2:
                return Response({'detail': 'Connection request already sent by the selected person.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                data=request.data
                data['sender']=sender.id
                data['receiver']=receiver_id
                serializer = FriendRequestSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
                
                
class CancelFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, friend_request_id, format=None):
        friend_request = get_object_or_404(FriendRequest, id=friend_request_id, sender=request.user, is_active=True)
        friend_request.delete()
        return Response({'detail': 'Friend request canceled.'}, status=status.HTTP_200_OK)
    
    

class AcceptFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, friend_request_id, format=None):
        friend_request = get_object_or_404(FriendRequest, id=friend_request_id, receiver=request.user.id, is_active=True)
        
        
        sender = friend_request.sender.id
        receiver = friend_request.receiver.id
        print("sender", sender)
        print("receiver",receiver)
        data=data1=request.data
        data['user']=sender
        data['friends']=[receiver]
        print(data)
        friend_list_serializer = FriendListSerializer(data=data)
        if friend_list_serializer.is_valid():
            print("saved data")
            friend_list_serializer.save()
        data1['user']=receiver
        data1['friends']=[sender]
        print("and data1 is",data1)

        friend_list_serializer1 = FriendListSerializer(data=data1)
        if friend_list_serializer1.is_valid():
            print("saved data 1")
            friend_list_serializer1.save()
            friend_request.is_accepted = True
            friend_request.save()
            return Response({'detail': 'Friend request accepted.'}, status=status.HTTP_200_OK)
        else:
            print("serializer 1 is not taking",data1)
            print("the serializer error is ",friend_list_serializer1.errors)
            return Response(friend_list_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class DeclineFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, friend_request_id, format=None):
        friend_request = get_object_or_404(FriendRequest, id=friend_request_id, receiver=request.user, is_active=True)
        friend_request.delete()
        return Response({'detail': 'Friend request declined.'}, status=status.HTTP_200_OK)
    
    
    
    