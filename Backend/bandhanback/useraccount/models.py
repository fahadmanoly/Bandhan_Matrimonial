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
    is_preferences=models.BooleanField(default=False)
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
    
    
MARITAL_STATUS_CHOICES = [
    ('Never Married','Never Married'),
    ('Divorced','Divorced'),
    ('Widowed','Widowed'),
    ('Seperated,but not legally divorced','Seperated,but not legally divorced'),
]
GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
)
EDUCATION_CHOICES = (
    ('High School', 'High School'),
    ('Bachelors', "Bachelors"),
    ('Master Degree', "Master Degree"),
    ('Doctorate', 'Doctorate'),
    ('ther', 'Other'),
)
RELIGION_CHOICES = (
    ('Muslim', 'Muslim'),
    ('Christian', "Christian"),
    ('Jewish', "Jewish"),
    ('Hindu', 'Hindu'),
    ('Jainist', 'Jainist'),
    ('Budhist', 'Budhist'),
    ('Sikh', 'Sikh'),
)
LANGUAGE_CHOICES = (
    ('Assamese', 'Assamese'),
    ('Bengali', 'Bengali'),
    ('Gujarati', 'Gujarati'),
    ('Hindi', 'Hindi'),
    ('Kannada', 'Kannada'),
    ('Kashmiri', 'Kashmiri'),
    ('Konkani', 'Konkani'),
    ('Malayalam', 'Malayalam'),
    ('Manipuri', 'Manipuri'),
    ('Marathi', 'Marathi'),
    ('Nepali', 'Nepali'),
    ('Oriya', 'Oriya'),
    ('Punjabi', 'Punjabi'),
    ('Sanskrit', 'Sanskrit'),
    ('Sindhi', 'Sindhi'),
    ('Tamil', 'Tamil'),
    ('Telugu', 'Telugu'),
    ('Urdu', 'Urdu'),
    ('Arabic', 'Arabic'),
    ('Bhojpuri', 'Bhojpuri'),
    ('Chhattisgarhi', 'Chhattisgarhi'),
    ('Nepali', 'Nepali'),
    ('Rajasthani', 'Rajasthani'),
    ('Romani', 'Romani'),
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
        return self.user.name
    
    
class UserPreference(models.Model):
    user=models.OneToOneField(User,related_name='user_preference',on_delete=models.CASCADE)
    date_of_birth=models.DateField(null=True,default='2000-01-01')
    height=models.IntegerField(null=True,blank=True)
    weight=models.IntegerField(null=True,blank=True)
    marital_status=models.CharField(choices=MARITAL_STATUS_CHOICES, max_length=100)
    mother_tongue=models.CharField(choices=LANGUAGE_CHOICES, max_length=100)
    religion=models.CharField(choices=RELIGION_CHOICES,max_length=100)
    Education=models.CharField(choices=EDUCATION_CHOICES,max_length=100)
    native_place=models.CharField(max_length=200,default='Kerala')
    location=models.CharField(max_length=200,default='kozhikode')
    profession=models.CharField(max_length=200,default='freelancer')
    family_status=models.CharField(choices=FAMILY_STATUS,max_length=100)
    family_values=models.CharField(choices=FAMILY_VALUES,max_length=100)
    
    def __str__(self):
        return self.user.name
    
class ProfilePicture(models.Model):
    user = models.ForeignKey(User, related_name='profile_picture', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profilePictures/',null=True, blank=True)
    
    def __str__(self):
        return self.user
    
class UserMobileOTP(models.Model):
    user=models.OneToOneField(User, related_name='user_mobile_otp', on_delete=models.CASCADE)
    mobile=models.OneToOneField(UserInfo, related_name='user_info_mobile_otp', on_delete=models.CASCADE)
    otp=models.IntegerField(blank=True, null=True)
    otp_verified=models.BooleanField(default=False)
    
    def __str__(self):
        return self.user
    
    
    
    
        
    
    
    

    

