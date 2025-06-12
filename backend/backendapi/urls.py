from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView


from .views import *

urlpatterns = [
    path('api/register/', UserCreationView.as_view(), name='register'),
    path('api/check-username-available/', UserNameAvailableView.as_view(), name='user-name-available'),
    path('api/update-profile-password/', UpdateProfilePasswordView.as_view(), name='update-profile-password'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', Logout, name='logout'),
    path('api/datalist/', UserDataListView.as_view(), name='datalist'),
    path('api/add-data/', AddUserDataView.as_view(), name='add-data'),
    path('api/datadetail/<int:pk>/', UserDataDetailView.as_view(), name='datadetail'),
    path('api/get-csrf/', get_csrf, name='get-csrf'),
    re_path(r'^.*', TemplateView.as_view(template_name="index.html"), name='index'),

]