from django.db import models
from django.conf import settings
from django.utils import timezone
from useraccount.models import User


# Create your models here.


class FriendList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    friends = models.ManyToManyField(User, blank=True, related_name="friends")
    
    def __str__(self):
        return self.user.name
    
    
    def add_friend(self,account):
        if not account in self.friends.all():
            self.friends.add(account)
            self.save()
            
    def remove_friend(self,account):
        if account in self.friends.all():
            self.friends.remove(account)
            
    def unfriend(self,removee):
        remover_friends_list = self #person terminating friendship
        remover_friends_list.remove_friend(removee) # remove friend from remover friend list
        
        # to remove friend from removee friend list
        friends_list = FriendList.objects.get(user=removee)
        friends_list.remove_friend(self.user)


class FriendRequest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="receiver")
    is_active = models.BooleanField(blank=True, null= False, default=True)
    is_accepted = models.BooleanField(blank=True, null = False, default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.sender.name
    
    def accept(self):
        receiver_friend_list = FriendList.objects.get(user=self.receiver)
        if receiver_friend_list:
            receiver_friend_list.add_friend(self.sender)
            sender_friend_list = FriendList.objects.get(user=self.sender)
            if sender_friend_list:
                sender_friend_list.add_friend(self.receiver)
                self.is_active = False
                self.save()
                
    
    def decline(self):
        self.is_active = False
        self.save()
        
    def cancel(self):
        self.is_active = False
        self.save()
                      
    