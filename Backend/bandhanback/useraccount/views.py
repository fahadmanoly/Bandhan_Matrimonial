from useraccount.serializers import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, UserInfoSerializer, UserMobileOTPSerializer, UserPreferenceSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from useraccount.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .utils import send_otp_to_phone
from .models import UserInfo, UserMobileOTP, User
from .models import *

#Sending OTP and Storing it in the database
class SendOTPView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]  
    def post(self,request,format=None):
        serializer = UserProfileSerializer(request.user)
        user_id = serializer.data.get('id')
        user_info= UserInfo.objects.get(user=user_id)
        mobile = user_info.mobile
        user_info_id = user_info.id
        print(user_info_id)
        print(mobile)
        otp = send_otp_to_phone(mobile)
        print('printing otp from view',otp)
        otp_data = {
            'user':user_id,
            'mobile':user_info_id,
            'otp':otp
        }
        otp_serializer = UserMobileOTPSerializer(data=otp_data)
        if otp_serializer.is_valid():
            otp_serializer.save()
            return Response({'msg':'OTP sent successfully'},status = status.HTTP_201_CREATED)
        return Response(otp_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Verifying OTP
# class VerifyOTPView(GenericAPIView):
#     #renderer_classes = [UserRenderer]
#     # permission_classes = [IsAuthenticated]
#     serializer_class=UserMobileOTPSerializer 
#     def post(self,request,format=None):
#         serializer = UserMobileOTPSerializer(data=request.data)
#         breakpoint()
#         if serializer.is_valid(raise_exception=True):
#             user_id = serializer.validated_data['id']
#             mobile = serializer.validated_data['mobile']
#             user_otp = serializer.validated_data['otp']
#             try:
#                 user_instance = User.objects.get(id=user_id, is_phone_verified=False) 
#                 otp_instance = UserMobileOTP.objects.get(user=user_id, mobile=mobile, otp=user_otp, otp_verified=False)
                
#             except UserMobileOTP.DoesNotExist:
#                 return Response({'msg':'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
#             otp_instance.otp_verified=True
#             user_instance.is_phone_verified = True
#             user_instance.save()
#             otp_instance.save()
#             return Response({'msg': 'OTP verification successful'}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
class VerifyOTPView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user_id = request.user.id
        user_otp = request.data.get('otp')
        try:
            user_instance = User.objects.get(id=user_id, is_phone_verified=False) 
            otp_instance = UserMobileOTP.objects.get(user=user_id, otp=user_otp, otp_verified=False)  
        except UserMobileOTP.DoesNotExist:
            return Response({'msg':'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        otp_instance.otp_verified=True
        user_instance.is_phone_verified = True
        user_instance.save()
        otp_instance.save()
        return Response({'msg': 'OTP verification successful'}, status=status.HTTP_200_OK)
                    
# Generating Tokens manually.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {'refresh': str(refresh),'access': str(refresh.access_token),}

# User Signup
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token':token, 'msg':'Registration Successful'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#User Login    
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token':token, 'msg':'Login Successful'},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or Password is not valid']}},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Changed Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class ForgotPasswordView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Reset Link Sent to Your Email'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class ResetPasswordView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,user_id,token,format=None):
        serializer = ResetPasswordSerializer(data=request.data, context={'user_id':user_id, 'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Reset Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class UserInfoView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    def post(self,request,format=None):
        user=request.user
        data=request.data
        data['user']=user.id
        serializer = UserInfoSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg':'Personal Information saved successfully so far'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserPreferenceView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    def post(self,request,format=None):
        user=request.user
        user_id=user.id
        data=request.data
        data['user']=user.id
        serializer = UserPreferenceSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user_instance = User.objects.get(id=user_id, is_preferences=False)
            user_instance.is_preferences = True
            serializer.save()
            user_instance.save()
            return Response({'msg':'Personal Choices for a Preferred Partner has been added'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        

    
     
        
    

        

    
            
    
    
    
    
    
         
    