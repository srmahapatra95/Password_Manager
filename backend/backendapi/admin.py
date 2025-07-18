from django.contrib import admin

from .models import UserData, UserSettings

class UserSettingsAdmin(admin.ModelAdmin):
    readonly_fields = ('lock_screen_password',)
# Register your models here.
admin.site.register(UserData)
admin.site.register(UserSettings,UserSettingsAdmin)