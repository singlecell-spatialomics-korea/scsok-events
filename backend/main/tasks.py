from celery import shared_task

from django.core.mail import send_mail as django_send_mail
from django.conf import settings

@shared_task
def send_mail(subject, body, to):
    print(f"Sending email to {to}...")
    try:
        django_send_mail(subject, body, settings.EMAIL_FROM, [to], fail_silently=False)
        print(f"Mail sent to {to}!")
    except Exception as e:
        print(f"Error sending email to {to}: {e}")
