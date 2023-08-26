from sqlite3 import connect
from useraccount.serializers import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, UserInfoSerializer, UserMobileOTPSerializer, UserPreferenceSerializer, ProfilePictureSerializer, CreateOrderSerializer, TranscationModelSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from datetime import date
from useraccount.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .utils import send_otp_to_phone
from .models import *
from useraccount.razorpay.main import RazorpayClient
from friend.models import FriendRequest,FriendList
from friend.serializers import FriendRequestSerializer



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
            # token = get_tokens_for_user(user)
            # return Response({'token':token, 'msg':'Registration Successful'},status=status.HTTP_201_CREATED)
            return Response({'msg':'Registration Successful'},status=status.HTTP_201_CREATED)
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
                data = User.objects.get(email = user)
                return Response({'token':token,'is_phone_verified':data.is_phone_verified,'is_preferences':data.is_preferences, 'msg':'Login Successful'},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or Password is not valid']}},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
      
    
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
    
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        user_id = request.user.id
        user_info = UserInfo.objects.get(user=user_id)
        serializer1 = UserProfileSerializer(request.user)
        serializer2 = UserInfoSerializer(user_info)
        return Response({'user':serializer1.data,'user_info':serializer2.data},status=status.HTTP_200_OK)   
 
class UserImageView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        user_id = request.user.id
        user_image = ProfilePicture.objects.filter(user=user_id)
        serializer = ProfilePictureSerializer(user_image, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)   
    
    
class UserMatchView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        user_id=request.user.id
        user = UserInfo.objects.get(user=user_id)
        gender = user.gender
        if gender == 'Male':
            data = UserInfo.objects.filter(gender='Female')
            serializer = UserInfoSerializer(data,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK) 
        else:
            data = UserInfo.objects.filter(gender='Male')
            serializer = UserInfoSerializer(data,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK) 
        
class ProfilePictureView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    parser_classes = [MultiPartParser]
    def post(self, request, format=None):
        user=request.user
        data=request.data
        data['user'] = user.id
        serializer = ProfilePictureSerializer(data=data)
        if serializer.is_valid():
            user = request.user 
            profile_picture = serializer.save(user=user)
            return Response(ProfilePictureSerializer(profile_picture).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          


def calculate_age(birthdate):
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age


@api_view(['GET'])
def search_matches(request):
    gender = request.query_params.get('gender', '')
    min_age = request.query_params.get('age_min', '')
    max_age = request.query_params.get('age_max', '')
    religion = request.query_params.get('religion')
    
    users_info = UserInfo.objects.all()
    
    if min_age !='None':
        min_birth_year = date.today().year - int(min_age)
        users_info = users_info.filter(date_of_birth__year__lte=min_birth_year)

    if max_age !='None':
        max_birth_year = date.today().year - int(max_age) - 1
        users_info = users_info.filter(date_of_birth__year__gt=max_birth_year)

    if religion != 'None':
        users_info = users_info.filter(religion__icontains=religion)

    if gender != 'None':
        users_info = users_info.filter(gender__iexact=gender)

    users_info = users_info.prefetch_related('user__profile_picture')
    
    serialized_data = []
    for user_info in users_info:
        profile_picture = user_info.user.profile_picture.all().first()
        serialized_data.append({
            'id': user_info.user.id,
            'name': user_info.user.name,
            'email': user_info.user.email,
            'gender': user_info.gender,
            'date_of_birth': calculate_age(user_info.date_of_birth),
            'height': user_info.height,
            'weight': user_info.weight,
            'religion': user_info.religion,
            'native_place': user_info.native_place,
            'mother_tongue': user_info.mother_tongue,
            'profile_picture': profile_picture.image.url if profile_picture else None
        })
    
    return Response(serialized_data)


class MatchDetailsView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    def get(self,request,match_id,format=None):
        user_id = request.user.id
        user = User.objects.filter(id=user_id).all()
        serializer = UserProfileSerializer(user, many=True)
        match = User.objects.filter(id=match_id).all()
        serializer4 = UserRegistrationSerializer(match, many=True)
        match_info = UserInfo.objects.filter(user=match_id)
        match_preference = UserPreference.objects.filter(user=match_id)
        match_picture = ProfilePicture.objects.filter(user=match_id).all()
        serializer1 = UserInfoSerializer(match_info, many=True)
        serializer2 = UserPreferenceSerializer(match_preference, many=True)
        serializer3 = ProfilePictureSerializer(match_picture, many=True)
        friend_request = FriendRequest.objects.filter(sender=user_id, receiver=match_id, is_active=True, is_accepted=False).all()
        friend_request_got = FriendRequest.objects.filter(receiver=user_id, sender=match_id, is_active=True, is_accepted=False).all()
        friend_already_sender = FriendRequest.objects.filter(sender=user_id, receiver=match_id, is_active=True, is_accepted=True).all()
        friend_already_receiver= FriendRequest.objects.filter(receiver=user_id, sender=match_id, is_active=True, is_accepted=True).all()

        
        connection_status = None
        
        if friend_request:
            serializer5 = FriendRequestSerializer(friend_request, many=True)
            connection_status = "request_sent"
            # return Response({'friend_request':serializer5.data, 'user_info':serializer.data,'match_name':serializer4.data,'match_info':serializer1.data, 'match_preference':serializer2.data, 'match_picture':serializer3.data},status=status.HTTP_200_OK)
        elif friend_request_got:
            serializer6 = FriendRequestSerializer(friend_request_got, many=True)
            connection_status = "request_received"
            # return Response({'friend_request_got':serializer6.data, 'user_info':serializer.data,'match_name':serializer4.data,'match_info':serializer1.data, 'match_preference':serializer2.data, 'match_picture':serializer3.data},status=status.HTTP_200_OK)
        elif friend_already_sender or friend_already_receiver:
            connection_status = "already_friends"
            
        response_data ={
            'connection_status':connection_status,
            'user_info':serializer.data,
            'match_name':serializer4.data,
            'match_info':serializer1.data,
            'match_preference':serializer2.data,
            'match_picture':serializer3.data     
        }
        
        return Response(response_data,status=status.HTTP_200_OK)
        # return Response({'user_info':serializer.data,'match_name':serializer4.data,'match_info':serializer1.data, 'match_preference':serializer2.data, 'match_picture':serializer3.data},status=status.HTTP_200_OK)
                
    

# Creating object for razorpay client
rz_client = RazorpayClient()

class CreateOrderView(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self,request):
        user=request.user
        paying_user = User.objects.filter(id=user.id).first()
        if paying_user.is_gold == False:
            create_order_serializer = CreateOrderSerializer(data=request.data)
            if create_order_serializer.is_valid():
                print(create_order_serializer.data)
                order_response = rz_client.create_order(
                    amount=create_order_serializer.validated_data.get("amount"),
                    currency=create_order_serializer.validated_data.get("currency"))
                response = {"status_code":status.HTTP_201_CREATED, "message":"order_created", "data":order_response}
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                response = {"status_code":status.HTTP_400_BAD_REQUEST, "message":"bad_request", "error":create_order_serializer.errors}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {"status_code":status.HTTP_400_BAD_REQUEST, "message":"already paid"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        
        
class TransactionView(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        user=request.user
        data=request.data
        data['user'] = user.id
        paying_user = User.objects.filter(id=user.id).first()
        transaction_serializer = TranscationModelSerializer(data=data)
        if transaction_serializer.is_valid():
            rz_client.verify_payment_signature(
                razorpay_payment_id = transaction_serializer.validated_data.get("payment_id"),
                razorpay_order_id = transaction_serializer.validated_data.get("order_id"),
                razorpay_signature = transaction_serializer.validated_data.get("signature")
            )
            transaction_serializer.save()
            paying_user.is_gold = True
            paying_user.save()
            response = {
                "status_code": status.HTTP_201_CREATED,
                "message": "transaction created"
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": transaction_serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        
            
        
    

     
        
    

        

    
            
    
    
    
    
    
         
    