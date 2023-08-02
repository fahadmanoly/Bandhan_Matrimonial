import imp
from django.contrib import admin
from useraccount.models import User,UserInfo,UserPreference,ProfilePicture
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


# Register your models here.

class UserModelAdmin(BaseUserAdmin):
    list_display = ["id","email", "name","tc","is_admin","is_phone_verified","is_block","is_gold","is_platinum"]
    list_filter = ["is_admin"]
    fieldsets = (
        ("User Credentials", {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("name","tc")}),
        ("Permissions", {"fields": ("is_admin","is_block","is_phone_verified","is_gold","is_platinum")}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide"),
                "fields": ("email", "name", "tc", "password1", "password2"),
            }
        ),
    )
    search_fields = ("email","name")
    ordering = ("email","id")
    filter_horizontal = ()


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)


@admin.register(UserInfo)
class UserInfoModelAdmin(admin.ModelAdmin):
 list_display = ['id', 'user', 'date_of_birth', 'height', 'weight', 'marital_status', 'mother_tongue', 'religion', 'gender', 'Education', 'country', 'native_place', 'location', 'mobile', 'profession', 'family_status', 'family_values', 'about_me']
 
 
 
@admin.register(UserPreference)
class UserPreferenceModelAdmin(admin.ModelAdmin):
 list_display = ['id', 'user', 'date_of_birth', 'height', 'weight', 'marital_status', 'mother_tongue', 'religion', 'Education', 'native_place', 'location', 'profession', 'family_status', 'family_values']
 
 
 
@admin.register(ProfilePicture)
class ProfilePictureModelAdmin(admin.ModelAdmin):
 list_display = ['id', 'user', 'image']


