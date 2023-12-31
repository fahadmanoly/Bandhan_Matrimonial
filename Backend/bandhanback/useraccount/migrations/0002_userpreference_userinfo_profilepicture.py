# Generated by Django 4.2.3 on 2023-07-27 14:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPreference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_birth', models.DateField(null=True)),
                ('height', models.IntegerField(null=True)),
                ('weight', models.IntegerField(null=True)),
                ('marital_status', models.CharField(choices=[('Never Married', 'Never Married'), ('Divorced', 'Divorced'), ('Widowed', 'Widowed'), ('Seperated,but not legally divorced', 'Seperated,but not legally divorced')], max_length=100)),
                ('mother_tongue', models.CharField(choices=[('as', 'Assamese'), ('bn', 'Bengali'), ('gu', 'Gujarati'), ('hi', 'Hindi'), ('kn', 'Kannada'), ('ks', 'Kashmiri'), ('kok', 'Konkani'), ('ml', 'Malayalam'), ('mni', 'Manipuri (Meitei)'), ('mr', 'Marathi'), ('ne', 'Nepali'), ('or', 'Odia (Oriya)'), ('pa', 'Punjabi'), ('sa', 'Sanskrit'), ('sd', 'Sindhi'), ('ta', 'Tamil'), ('te', 'Telugu'), ('ur', 'Urdu'), ('ar', 'Arabic'), ('bho', 'Bhojpuri'), ('hne', 'Chhattisgarhi (Khadi Boli)'), ('nrm', 'Nepali'), ('raj', 'Rajasthani'), ('rmy-gy', 'Romani (Greek)')], max_length=100)),
                ('religion', models.CharField(choices=[('Islam', 'Muslim'), ('Christianity', 'Christian'), ('Judaism', 'Jewish'), ('Hinduism', 'Hindu'), ('Jainism', 'Jainist'), ('Budhism', 'Budhist'), ('Sikhism', 'Sikh')], max_length=100)),
                ('Education', models.CharField(choices=[('high_school', 'High School'), ('bachelors', "Bachelor's Degree"), ('masters', "Master's Degree"), ('doctorate', 'Doctorate'), ('other', 'Other')], max_length=100)),
                ('country', models.CharField(default='India', max_length=200)),
                ('native_place', models.CharField(default='Kerala', max_length=200)),
                ('location', models.CharField(default='kozhikode', max_length=200)),
                ('profession', models.CharField(default='freelancer', max_length=200)),
                ('family_status', models.CharField(choices=[('middle class', 'middle class'), ('upper middle class', 'upper middle class'), ('lower middle class', 'lower middle class'), ('rich', 'rich'), ('affluent', 'affluent')], max_length=100)),
                ('family_values', models.CharField(choices=[('orthodox', 'orthodox'), ('traditional', 'traditional'), ('moderate', 'moderate'), ('liberal', 'liberal')], max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_preference', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_birth', models.DateField(null=True)),
                ('height', models.IntegerField(null=True)),
                ('weight', models.IntegerField(null=True)),
                ('marital_status', models.CharField(choices=[('Never Married', 'Never Married'), ('Divorced', 'Divorced'), ('Widowed', 'Widowed'), ('Seperated,but not legally divorced', 'Seperated,but not legally divorced')], max_length=100)),
                ('mother_tongue', models.CharField(choices=[('as', 'Assamese'), ('bn', 'Bengali'), ('gu', 'Gujarati'), ('hi', 'Hindi'), ('kn', 'Kannada'), ('ks', 'Kashmiri'), ('kok', 'Konkani'), ('ml', 'Malayalam'), ('mni', 'Manipuri (Meitei)'), ('mr', 'Marathi'), ('ne', 'Nepali'), ('or', 'Odia (Oriya)'), ('pa', 'Punjabi'), ('sa', 'Sanskrit'), ('sd', 'Sindhi'), ('ta', 'Tamil'), ('te', 'Telugu'), ('ur', 'Urdu'), ('ar', 'Arabic'), ('bho', 'Bhojpuri'), ('hne', 'Chhattisgarhi (Khadi Boli)'), ('nrm', 'Nepali'), ('raj', 'Rajasthani'), ('rmy-gy', 'Romani (Greek)')], max_length=100)),
                ('religion', models.CharField(choices=[('Islam', 'Muslim'), ('Christianity', 'Christian'), ('Judaism', 'Jewish'), ('Hinduism', 'Hindu'), ('Jainism', 'Jainist'), ('Budhism', 'Budhist'), ('Sikhism', 'Sikh')], max_length=100)),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], max_length=100)),
                ('Education', models.CharField(choices=[('high_school', 'High School'), ('bachelors', "Bachelor's Degree"), ('masters', "Master's Degree"), ('doctorate', 'Doctorate'), ('other', 'Other')], max_length=100)),
                ('country', models.CharField(default='India', max_length=200)),
                ('native_place', models.CharField(default='Kerala', max_length=200)),
                ('location', models.CharField(default='kozhikode', max_length=200)),
                ('mobile', models.IntegerField(default=910123456789)),
                ('profession', models.CharField(default='freelancer', max_length=200)),
                ('family_status', models.CharField(choices=[('middle class', 'middle class'), ('upper middle class', 'upper middle class'), ('lower middle class', 'lower middle class'), ('rich', 'rich'), ('affluent', 'affluent')], max_length=100)),
                ('family_values', models.CharField(choices=[('orthodox', 'orthodox'), ('traditional', 'traditional'), ('moderate', 'moderate'), ('liberal', 'liberal')], max_length=100)),
                ('about_me', models.CharField(max_length=2000, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProfilePicture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='profilePictures/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_picture', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
