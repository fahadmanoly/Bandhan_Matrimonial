from pyexpat import model
from django.contrib import admin
from .models import FriendRequest, FriendList

class FriendListAdmin(admin.ModelAdmin):
    list_display = ['user']
    search_fields = ['user']
    
    class Meta:
        model = FriendList
admin.site.register(FriendList, FriendListAdmin)


class FriendRequestAdmin(admin.ModelAdmin):
    list_filter = ['sender', 'receiver']
    list_display = ['sender', 'receiver']
    search_fields = ['sender_username', 'sender_email', 'receiver_username', 'receiver_email']
    
    class Meta:
        model = FriendRequest

admin.site.register(FriendRequest, FriendRequestAdmin)








    
