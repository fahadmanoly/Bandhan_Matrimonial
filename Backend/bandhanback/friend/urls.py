from django.urls import path
from .views import SendConnectionRequestView, CancelFriendRequestView, AcceptFriendRequestView, DeclineFriendRequestView


urlpatterns = [
    path('send-request/<int:receiver_id>/', SendConnectionRequestView.as_view(), name='send-request'),
    path('accept-request/<int:friend_request_id>/', AcceptFriendRequestView.as_view(), name='accept-request'),
    path('cancel-request/<int:friend_request_id>/', CancelFriendRequestView.as_view(), name='cancel-request'),
    path('decline-request/<int:friend_request_id>/', DeclineFriendRequestView.as_view(), name='decline-request'),
]

