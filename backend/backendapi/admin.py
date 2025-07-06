from django.contrib import admin

from .models import UserData, UserSettings
# Register your models here.
admin.site.register(UserData)
admin.site.register(UserSettings)