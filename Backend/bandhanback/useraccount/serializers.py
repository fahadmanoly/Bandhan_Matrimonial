from dataclasses import field
from rest_framework.validators import ValidationError
from rest_framework import serializers
from .models import *
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from  useraccount.utils import Util



class UserRegistrationSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'}, write_only=True) 
    class Meta:
        model=User
        fields=['email','name','password','password2','tc']
        extra_kwargs={'password':{'write_only':True}}
        
    #Validating password and confirm password for registration
    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("The given passwords doesn't match")
        return attrs
    
    def create(self,validate_data):
        return User.objects.create_user(**validate_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100)
    class Meta:
        model = User
        fields = ['email','password']
        
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email', 'is_phone_verified', 'is_preferences', 'is_gold']

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = "__all__"
        
class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = "__all__"
        
class UserMobileOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMobileOTP
        fields = ['user', 'mobile', 'otp']


               
class UserChangePasswordSerializer(serializers.Serializer):
    current_password=serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True) 
    password=serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True) 
    password2=serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['current_password', 'password','password2']
        
    def validate_current_password(self, value):
        user = self.context.get('user')
        if not user.check_password(value):
            raise serializers.ValidationError("Incorrect current password.")
        return value
        
    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("The given passwords doesn't match")
        user.set_password(password)
        user.save()
        return attrs
        
    
class ForgotPasswordSerializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255) 
    class Meta:
        fields = ['email']
        
    def validate(self,attrs):
        email=attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            user_id = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = 'http://localhost:3000/api/user/resetpassword/'+user_id+'/'+token
            print('password reset link',link)
            #email link 
            body='Click Following Link to Reset the Password '+link
            data={
                'subject':'Reset your password',
                'body':body,
                'to_email':user.email    
            }
            Util.send_email(data)
            return attrs            
        else:
            raise serializers.ValidationError('The email provided is not registered')
        
        
class ResetPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True) 
    password2=serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password','password2']
        
    def validate(self,attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            user_id = self.context.get('user_id')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError("The given passwords doesn't match")
            id = smart_str(urlsafe_base64_decode(user_id))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise ValidationError('Token is not valid or expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise ValidationError("Token is not valid")
        

        
class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePicture
        fields = '__all__'
        
        
        
class CreateOrderSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()
    
    
class TranscationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["user", "payment_id", "order_id", "signature", "amount"]
        
        
        

    
    
        
        
            

        
        
        
    

        
        

        

    
    
    
        
        
        

