from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MaxValueValidator, MinValueValidator

from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_usersettings(sender, instance=None, created=False, **kwargs):
    if created:
        UserSettings.objects.create(user=instance)
# Create your models here.
class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    details_for = models.CharField(max_length=90)
    username = models.CharField(max_length=90)
    email = models.CharField(max_length=90)
    mobile = models.CharField(max_length=90)
    password = models.CharField(max_length=90)
    info = models.TextField()

THEME_CHOICES = (
    ('Light', 'Light'),
    ('Dark', 'Dark'),
)
class UserSettings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theme = models.CharField(choices=THEME_CHOICES, default='Dark')
    lock_screen = models.BooleanField(default=False)
    lock_screen_password = models.CharField()
    lock_screen_status = models.BooleanField(default=False)

