from enum import auto
from http.client import MOVED_PERMANENTLY
from pyexpat import model
from turtle import update
from typing import runtime_checkable
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager



# Custom User Manager
class UserAccountManager(BaseUserManager):
    def create_user(self,email,name,tc,password=None,password2=None):
        if not email:
            raise ValueError("User must have an email")
        if not name:
            raise ValueError("User should provide the name")
        email=self.normalize_email(email)
        user=self.model(email=email, name=name, tc=tc,)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,name,tc,password=None):
        user=self.create_user(email=email,name=name,tc=tc,password=password)
        user.is_admin = True
        user.is_phone_verified = True
        user.is_active = True
        user.is_gold = True
        user.is_platinum = True      
        user.save(using=self._db)       
        return user
    
    
# Models for User
class User(AbstractBaseUser):
    email=models.EmailField(verbose_name='Email',max_length=100,unique=True)
    name = models.CharField(max_length=100)
    tc=models.BooleanField()
    is_active=models.BooleanField(default=True)
    is_phone_verified=models.BooleanField(default=False)
    is_block=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    is_gold=models.BooleanField(default=False)
    is_platinum=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)

    objects=UserAccountManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name','tc']
    
    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
    
    
MARITAL_STATUS_CHOICES = (
    ('Never Married','Never Married'),
    ('Divorced','Divorced'),
    ('Widowed','Widowed'),
    ('Seperated,but not legally divorced','Seperated,but not legally divorced'),
)
GENDER_CHOICES = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
)
EDUCATION_CHOICES = (
    ('high_school', 'High School'),
    ('bachelors', "Bachelor's Degree"),
    ('masters', "Master's Degree"),
    ('doctorate', 'Doctorate'),
    ('other', 'Other'),
)
RELIGION_CHOICES = (
    ('Islam', 'Muslim'),
    ('Christianity', "Christian"),
    ('Judaism', "Jewish"),
    ('Hinduism', 'Hindu'),
    ('Jainism', 'Jainist'),
    ('Budhism', 'Budhist'),
    ('Sikhism', 'Sikh'),
)
LANGUAGE_CHOICES = (
    ('as', 'Assamese'),
    ('bn', 'Bengali'),
    ('gu', 'Gujarati'),
    ('hi', 'Hindi'),
    ('kn', 'Kannada'),
    ('ks', 'Kashmiri'),
    ('kok', 'Konkani'),
    ('ml', 'Malayalam'),
    ('mni', 'Manipuri (Meitei)'),
    ('mr', 'Marathi'),
    ('ne', 'Nepali'),
    ('or', 'Odia (Oriya)'),
    ('pa', 'Punjabi'),
    ('sa', 'Sanskrit'),
    ('sd', 'Sindhi'),
    ('ta', 'Tamil'),
    ('te', 'Telugu'),
    ('ur', 'Urdu'),
    ('ar', 'Arabic'),
    ('bho', 'Bhojpuri'),
    ('hne', 'Chhattisgarhi (Khadi Boli)'),
    ('nrm', 'Nepali'),
    ('raj', 'Rajasthani'),
    ('rmy-gy', 'Romani (Greek)'),
)

FAMILY_STATUS = (
    ('middle class', 'middle class'),
    ('upper middle class', 'upper middle class'),
    ('lower middle class', 'lower middle class'),
    ('rich','rich'),
    ('affluent', 'affluent'),   
)

FAMILY_VALUES=(
    ('orthodox', 'orthodox'),
    ('traditional', 'traditional'),
    ('moderate', 'moderate'),
    ('liberal', 'liberal')
)


class UserInfo(models.Model):
    user=models.OneToOneField(User,related_name='user_info',on_delete=models.CASCADE)
    date_of_birth=models.DateField(null=False,blank=False)
    height=models.IntegerField(null=True,blank=True)
    weight=models.IntegerField(null=True,blank=True)
    marital_status=models.CharField(choices=MARITAL_STATUS_CHOICES, max_length=100)
    mother_tongue=models.CharField(choices=LANGUAGE_CHOICES, max_length=100)
    religion=models.CharField(choices=RELIGION_CHOICES,max_length=100)
    gender=models.CharField(choices=GENDER_CHOICES,max_length=100)
    Education=models.CharField(choices=EDUCATION_CHOICES,max_length=100)
    country=models.CharField(max_length=200,default='India')
    native_place=models.CharField(max_length=200,default='Kerala')
    location=models.CharField(max_length=200,default='kozhikode')
    mobile=models.IntegerField(null=False,blank=False)
    profession=models.CharField(max_length=200,default='freelancer')
    family_status=models.CharField(choices=FAMILY_STATUS,max_length=100)
    family_values=models.CharField(choices=FAMILY_VALUES,max_length=100)
    about_me=models.CharField(max_length=2000,null=True,blank=True)
    
    def __str__(self):
        return self.user
    
    
class UserPreference(models.Model):
    user=models.OneToOneField(User,related_name='user_preference',on_delete=models.CASCADE)
    date_of_birth=models.DateField(null=True,blank=True)
    height=models.IntegerField(null=True,blank=True)
    weight=models.IntegerField(null=True,blank=True)
    marital_status=models.CharField(choices=MARITAL_STATUS_CHOICES, max_length=100)
    mother_tongue=models.CharField(choices=LANGUAGE_CHOICES, max_length=100)
    religion=models.CharField(choices=RELIGION_CHOICES,max_length=100)
    Education=models.CharField(choices=EDUCATION_CHOICES,max_length=100)
    country=models.CharField(max_length=200,default='India')
    native_place=models.CharField(max_length=200,default='Kerala')
    location=models.CharField(max_length=200,default='kozhikode')
    profession=models.CharField(max_length=200,default='freelancer')
    family_status=models.CharField(choices=FAMILY_STATUS,max_length=100)
    family_values=models.CharField(choices=FAMILY_VALUES,max_length=100)
    
class ProfilePicture(models.Model):
    user = models.ForeignKey(User, related_name='profile_picture', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profilePictures/',null=True, blank=True)
    
    
        
    
    
    

    

