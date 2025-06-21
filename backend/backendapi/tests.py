from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from unittest.mock import patch

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
