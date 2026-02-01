from django.urls import path

from .views import *

urlpatterns = [
    path('api/register/', UserCreationView.as_view(), name='register'),
    path('api/check-username-available/', UserNameAvailableView.as_view(), name='user-name-available'),
    path('api/update-password-data/', UpdatePasswordDataView.as_view(), name='update-password-data'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/is-authenticated-user/', IsAuthenticatedUserView.as_view(), name='is-authenticated-user'),
    path('api/check-password/', CheckPasswordView.as_view(), name='check-password'),
    path('api/get-user-settings/', GetUserSettingsView.as_view(), name='get-user-settings'),
    path('api/set-user-settings/', SetUserSettingsView.as_view(), name='set-user-settings'),
    path('api/check-pin/', CheckPINView.as_view(), name='check-pin'),
    path('api/logout/', Logout, name='logout'),
    path('api/datalist/', UserDataListView.as_view(), name='datalist'),
    path('api/add-data/', AddUserDataView.as_view(), name='add-data'),
    path('api/data-detail/<int:pk>/', UserDataDetailView.as_view(), name='data-detail'),
    path('api/bulk-delete/', BulkDeleteView.as_view(), name='bulk-delete'),
    path('api/show-password/',ShowPasswordView.as_view(),name='show-password'),
]