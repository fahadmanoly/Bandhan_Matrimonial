from django.urls import path
from useraccount.views import UserRegistrationView,UserLoginView,UserProfileView,UserChangePasswordView,ForgotPasswordView
from useraccount.views import ResetPasswordView,UserInfoView,SendOTPView,VerifyOTPView, UserPreferenceView
from useraccount.views import UserMatchView, ProfilePictureView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('forgotpassword/', ForgotPasswordView.as_view(), name='forgotpassword'),
    path('resetpassword/<user_id>/<token>/', ResetPasswordView.as_view(), name='resetpassword'),
    path('userinfo/', UserInfoView.as_view(), name='userinfo'),
    path('sendotp/', SendOTPView.as_view(), name='sendotp'),
    path('verifyotp/', VerifyOTPView.as_view(), name='verifyotp'),
    path('userpreference/', UserPreferenceView.as_view(), name='userpreference'),
    path('userhome/', UserMatchView.as_view(), name='userhome'),
    path('profilepicture/', ProfilePictureView.as_view(), name='profilepicture'),


]
