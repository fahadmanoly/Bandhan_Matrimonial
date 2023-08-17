from django.urls import path
from useraccount.views import UserRegistrationView,UserLoginView,UserProfileView,UserChangePasswordView,ForgotPasswordView
from useraccount.views import ResetPasswordView,UserInfoView,SendOTPView,VerifyOTPView, UserPreferenceView
from useraccount.views import UserMatchView, ProfilePictureView, UserImageView, MatchDetailsView
from . import views

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('image/', UserImageView.as_view(), name='image'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('forgotpassword/', ForgotPasswordView.as_view(), name='forgotpassword'),
    path('resetpassword/<user_id>/<token>/', ResetPasswordView.as_view(), name='resetpassword'),
    path('userinfo/', UserInfoView.as_view(), name='userinfo'),
    path('sendotp/', SendOTPView.as_view(), name='sendotp'),
    path('verifyotp/', VerifyOTPView.as_view(), name='verifyotp'),
    path('userpreference/', UserPreferenceView.as_view(), name='userpreference'),
    path('userhome/', UserMatchView.as_view(), name='userhome'),
    path('profilepicture/', ProfilePictureView.as_view(), name='profilepicture'),
    path('search_matches/', views.search_matches, name='search_matches'),
    path('match_details/<int:match_id>/', MatchDetailsView.as_view(), name='match_details'),

]

