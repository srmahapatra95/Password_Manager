from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView


from .views import *

urlpatterns = [
    path('api/register/', UserCreationView.as_view(), name='register'),
    path('api/update-profile-password/', UpdateProfilePasswordView.as_view(), name='update-profile-password'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/datalist/', UserDataListView.as_view(), name='datalist'),
    path('api/datadetail/<int:pk>/', UserDataDetailView.as_view(), name='datadetail'),

]