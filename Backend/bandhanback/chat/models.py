from django.db import models
from useraccount.models import User

# Create your models here.
class chatroom(models.Model):
    name = models.CharField(max_length=100)
    created_at=models.DateTimeField(auto_now_add=True,null=True)
    def __str__(self):
        return self.name
    
class ChatMessage(models.Model):
    room=models.ForeignKey(chatroom,on_delete=models.CASCADE,related_name='messages')
    sender=models.ForeignKey(User,on_delete=models.CASCADE,related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receive_messages', default=None , null = True)
    message=models.TextField()
    time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.sender.username}:{self.message}'