import email
from django.core.mail import EmailMessage
import os
import requests
import random


class Util:
    @staticmethod
    def send_email(data):
        email=EmailMessage(
            subject=data['subject'],
            body=data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            to=[data['to_email']]
        )
        email.send()
        

def send_otp_to_phone(mobile):
    try:
        otp = random.randint(1000,9999)
        url = 'https://www.fast2sms.com/dev/bulkV2'
        payload = f'variables_values={otp}&route=otp&numbers={mobile}'
        authorization_token ='MjB6iSAwrLk71QmDVsdGRIXZTguCEY0zOUW843ocvqhFHK9tyPSWIQFfhRP72UD0tnckM1wqjLlim3g5'
        headers = {
        'authorization': authorization_token,
        'Content-Type': "application/x-www-form-urlencoded",
        'Cache-Control': "no-cache",
        }
        print('before sending',otp)
        response = requests.request("POST", url, data=payload, headers=headers)
        print(response.text)
        return otp
         
    except Exception as e:
        return None
    
# phone='9656687801'
# otp=send_otp_to_phone(phone)
# print('after sending',otp)
    
      