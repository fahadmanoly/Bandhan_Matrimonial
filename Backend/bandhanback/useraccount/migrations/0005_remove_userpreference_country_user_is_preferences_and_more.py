# Generated by Django 4.2.3 on 2023-08-02 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0004_alter_userinfo_date_of_birth_alter_userinfo_mobile_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userpreference',
            name='country',
        ),
        migrations.AddField(
            model_name='user',
            name='is_preferences',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='Education',
            field=models.CharField(choices=[('High School', 'High School'), ('Bachelors', 'Bachelors'), ('Master Degree', 'Master Degree'), ('Doctorate', 'Doctorate'), ('ther', 'Other')], max_length=100),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=100),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='mother_tongue',
            field=models.CharField(choices=[('Assamese', 'Assamese'), ('Bengali', 'Bengali'), ('Gujarati', 'Gujarati'), ('Hindi', 'Hindi'), ('Kannada', 'Kannada'), ('Kashmiri', 'Kashmiri'), ('Konkani', 'Konkani'), ('Malayalam', 'Malayalam'), ('Manipuri', 'Manipuri'), ('Marathi', 'Marathi'), ('Nepali', 'Nepali'), ('Oriya', 'Oriya'), ('Punjabi', 'Punjabi'), ('Sanskrit', 'Sanskrit'), ('Sindhi', 'Sindhi'), ('Tamil', 'Tamil'), ('Telugu', 'Telugu'), ('Urdu', 'Urdu'), ('Arabic', 'Arabic'), ('Bhojpuri', 'Bhojpuri'), ('Chhattisgarhi', 'Chhattisgarhi'), ('Nepali', 'Nepali'), ('Rajasthani', 'Rajasthani'), ('Romani', 'Romani')], max_length=100),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='religion',
            field=models.CharField(choices=[('Muslim', 'Muslim'), ('Christian', 'Christian'), ('Jewish', 'Jewish'), ('Hindu', 'Hindu'), ('Jainist', 'Jainist'), ('Budhist', 'Budhist'), ('Sikh', 'Sikh')], max_length=100),
        ),
        migrations.AlterField(
            model_name='userpreference',
            name='Education',
            field=models.CharField(choices=[('High School', 'High School'), ('Bachelors', 'Bachelors'), ('Master Degree', 'Master Degree'), ('Doctorate', 'Doctorate'), ('ther', 'Other')], max_length=100),
        ),
        migrations.AlterField(
            model_name='userpreference',
            name='mother_tongue',
            field=models.CharField(choices=[('Assamese', 'Assamese'), ('Bengali', 'Bengali'), ('Gujarati', 'Gujarati'), ('Hindi', 'Hindi'), ('Kannada', 'Kannada'), ('Kashmiri', 'Kashmiri'), ('Konkani', 'Konkani'), ('Malayalam', 'Malayalam'), ('Manipuri', 'Manipuri'), ('Marathi', 'Marathi'), ('Nepali', 'Nepali'), ('Oriya', 'Oriya'), ('Punjabi', 'Punjabi'), ('Sanskrit', 'Sanskrit'), ('Sindhi', 'Sindhi'), ('Tamil', 'Tamil'), ('Telugu', 'Telugu'), ('Urdu', 'Urdu'), ('Arabic', 'Arabic'), ('Bhojpuri', 'Bhojpuri'), ('Chhattisgarhi', 'Chhattisgarhi'), ('Nepali', 'Nepali'), ('Rajasthani', 'Rajasthani'), ('Romani', 'Romani')], max_length=100),
        ),
        migrations.AlterField(
            model_name='userpreference',
            name='religion',
            field=models.CharField(choices=[('Muslim', 'Muslim'), ('Christian', 'Christian'), ('Jewish', 'Jewish'), ('Hindu', 'Hindu'), ('Jainist', 'Jainist'), ('Budhist', 'Budhist'), ('Sikh', 'Sikh')], max_length=100),
        ),
    ]
