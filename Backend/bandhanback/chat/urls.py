from django.urls import path
from .views import ChatMessageView

urlpatterns = [
    path('message/<int:user_Id>/<int:match_Id>/',ChatMessageView.as_view(),name='chat_message_view'),
]