from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from cryptography.fernet import Fernet
from unittest.mock import patch

from .models import *

class LoginViewTestCase(APITestCase):

    def setUp(self):
        self.login_url = reverse('login')
        self.username = 'testuser'
        self.password = 'TestPass123'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        

    def test_login_success(self):
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Login successful')
        self.assertEqual(response.data['username'], self.username)

    def test_login_invalid_password(self):
        data = {'username': self.username, 'password': 'WrongPass'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], 'Invalid username or password')

    def test_login_nonexistent_user(self):
        data = {'username': 'ghostuser', 'password': 'anyPassword'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], 'Invalid username or password')

    def test_login_missing_username(self):
        data = {'password': self.password}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.assertIn('username', response.data['errors'])

    def test_login_missing_password(self):
        data = {'username': self.username}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.assertIn('password', response.data['errors'])

    def test_login_empty_fields(self):
        data = {'username': '', 'password': ''}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

    def test_unexpected_server_error(self):
        with patch('backendapi.views.authenticate') as mock_auth:
            mock_auth.side_effect = Exception('Unexpected error')
            data = {'username': self.username, 'password': self.password}
            response = self.client.post(self.login_url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
            self.assertIn('error', response.data)
            self.assertIn('Server Error', response.data['error'])


class RegisterViewTestCase(APITestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.username = 'testuser'
        self.password = 'TestPass123'

    def test_register_success(self):
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User Successfully Created...')


    def test_register_existing_user(self):
        self.user = User.objects.create_user(username=self.username, password=self.password)
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.assertIn('username', response.data['errors'])

    def test_register_missing_username(self):
        data = {'password': self.password}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.assertIn('username', response.data['errors'])

    def test_register_missing_password(self):
        data = {'username': self.username}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.assertIn('password', response.data['errors'])

    def test_register_empty_fields(self):
        data = {'username': '', 'password': ''}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

    def test_unexpected_server_error(self):
        with patch('backendapi.serializers.UserCreationSerializers.create') as mock_auth:
            mock_auth.side_effect = Exception('Unexpected error')
            data = {'username': self.username, 'password': self.password}
            response = self.client.post(self.register_url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
            self.assertIn('error', response.data)
            self.assertIn('Server Error', response.data['error'])

class UserNameAvailableTestCase(APITestCase):
    
    def setUp(self):
        self.username_available_url = reverse('user-name-available')
        self.username = 'testuser'

    def test_available_username(self):
        query_params = {'username':self.username}
        response = self.client.get(self.username_available_url, data = query_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Available')

    def test_not_available_username(self):
        username = User.objects.create_user(username='testuser', password='testpassword')
        query_params = {'username':username}
        response = self.client.get(self.username_available_url, data = query_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(response.data['message'], 'Not Available')

    def test_unexpected_server_error(self):
        with patch('django.contrib.auth.models.User.objects.filter') as mock_check:
            mock_check.side_effect = Exception('Unexpected error')
            query_params = {'username':self.username}
            response = self.client.get(self.username_available_url, data = query_params, format='json')
            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
            self.assertIn('error', response.data)
            self.assertIn('Server Error', response.data['error'])

class UserDataListTestCase(APITestCase):
    def setUp(self):
        self.datalist_url = reverse('datalist')
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.token = Token.objects.get(user=self.user) # Post save automatically creates the auth token
        self.products_to_create = [
            UserData(
                user=self.user,
                details_for='test-details1',
                username='test-username1',
                email='test-email1',
                mobile='test-mobile1',
                password='test-password1',
                info='test-info1'

            ),
            UserData(
                user=self.user,
                details_for='test-details2',
                username='test-username2',
                email='test-email2',
                mobile='test-mobile2',
                password='test-password2',
                info='test-info2'

            ),
            UserData(
                user=self.user,
                details_for='test-details3',
                username='test-username3',
                email='test-email3',
                mobile='test-mobile3',
                password='test-password3',
                info='test-info3'

            )
        ]
        self.created_products = UserData.objects.bulk_create(self.products_to_create)

    def test_get_datalist(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        response = self.client.get(self.datalist_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_datalist_unauthorized_access(self):
        response = self.client.get(self.datalist_url, format='json')
        self.client.credentials(HTTP_AUTHORIZATION=f'Token invalidtoken')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class AddUserDataTestCase(APITestCase):
    def encrypt(self, password):
        key = Fernet.generate_key()
        f = Fernet(key)
        token = f.encrypt(str.encode(password))
        return token.decode('utf-8'),key.decode('utf-8')
    def setUp(self):
        self.add_data_url = reverse('add-data')
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.token = Token.objects.get(user=self.user)
        self.products_to_create = [
            UserData(
                user=self.user,
                details_for='test-details1',
                username='test-username1',
                email='test-email1',
                mobile='test-mobile1',
                password='test-password1',
                info='test-info1'

            ),
            UserData(
                user=self.user,
                details_for='test-details2',
                username='test-username2',
                email='test-email2',
                mobile='test-mobile2',
                password='test-password2',
                info='test-info2'

            ),
            UserData(
                user=self.user,
                details_for='test-details3',
                username='test-username3',
                email='test-email3',
                mobile='test-mobile3',
                password='test-password3',
                info='test-info3'

            )
        ]
        self.created_products = UserData.objects.bulk_create(self.products_to_create)

    def test_add_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        data =  {
                "user":self.user.id,
                "details_for":'test-details4',
                "username":'test-username4',
                "email":'test-email4',
                "mobile":'test-mobile4',
                "password":'test-password4',
                "info":'test-info4'
        }
        response = self.client.post(self.add_data_url, data ,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)  
        self.assertIn('key', response.data)

    def test_add_data_without_authorization(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token invalidtoken')
        data =  {
                "user":self.user.id,
                "details_for":'test-details4',
                "username":'test-username4',
                "email":'test-email4',
                "mobile":'test-mobile4',
                "password":'test-password4',
                "info":'test-info4'
        }
        response = self.client.post(self.add_data_url, data ,format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED) 


class UserDataDetailTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.token = Token.objects.get(user=self.user)
        self.products_to_create = [
            UserData(
                user=self.user,
                details_for='test-details1',
                username='test-username1',
                email='test-email1',
                mobile='test-mobile1',
                password='test-password1',
                info='test-info1'

            ),
            UserData(
                user=self.user,
                details_for='test-details2',
                username='test-username2',
                email='test-email2',
                mobile='test-mobile2',
                password='test-password2',
                info='test-info2'

            ),
            UserData(
                user=self.user,
                details_for='test-details3',
                username='test-username3',
                email='test-email3',
                mobile='test-mobile3',
                password='test-password3',
                info='test-info3'

            )
        ]
        self.created_products = UserData.objects.bulk_create(self.products_to_create)

    def test_get_detailed_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        id = UserData.objects.get(user=self.user,details_for='test-details3').id
        response = self.client.get(f"/api/data-detail/{id}/" ,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK) 

    def test_patch_detailed_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        id = UserData.objects.get(user=self.user,details_for='test-details3').id
        data = {"mobile":'test-mobile3'}
        response = self.client.patch(f"/api/data-detail/{id}/", data ,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK) 

    def test_delete_detailed_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        id = UserData.objects.get(user=self.user,details_for='test-details3').id
        response = self.client.delete(f"/api/data-detail/{id}/" ,format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)  


class UpdateProfilePasswordTestCase(APITestCase):

    def setUp(self):
        self.update_profile_password = reverse('update-profile-password')
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.token = Token.objects.get(user=self.user)

    def test_change_profile_password_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        data = {'password':'testpassword'}
        response = self.client.post(self.update_profile_password, data=data, format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data['is-authenticated'], True)
        if response.data['is-authenticated']:
            data1 = {'password':'new_test_password'}
            response2 = self.client.patch(self.update_profile_password, data=data1, format='json')
            self.assertEqual(response2.status_code,status.HTTP_200_OK)
            self.assertEqual(response2.data['message'],'Password has been updated')
        else:
            self.fail('Unauthenticated, Password cannot be updated')

    def test_change_profile_password_unauthenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        data = {'password':'invalid_password'}
        response = self.client.post(self.update_profile_password, data=data, format='json')
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['is-authenticated'], False)
        if response.data['is-authenticated']:
            data1 = {'password':'new_test_password'}
            response2 = self.client.patch(self.update_profile_password, data=data1, format='json')
            self.assertEqual(response2.status_code,status.HTTP_200_OK)
            self.assertEqual(response2.data['message'],'Password has been updated')
        else:
            self.fail('Unauthenticated, Password cannot be updated')

    def test_change_profile_password_unauthorized(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token invalid_token')
        data = {'password':'testpassword'}
        response = self.client.post(self.update_profile_password, data=data, format='json')
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)