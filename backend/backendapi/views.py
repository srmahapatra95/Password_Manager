from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,logout,login
from django.views.decorators.http import require_safe
from django.views.decorators.cache import never_cache
from django.middleware.csrf import get_token



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication,SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, renderer_classes




from .models import UserData
from .serializers import *


#https://stackoverflow.com/questions/77026228/how-do-i-setup-csrf-token-for-purely-rest-api-communication-between-two-django-a
@require_safe # only safe methods GET and HEAD, any operation with PUT, PATCH, POST is rejected
@never_cache
@api_view(('GET',))
def get_csrf(request):
    get_token(request)
    return Response(status.HTTP_200_OK)

class UserNameAvailableView(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        user = User.objects.filter(username=username).exists()
        print(user)
        if not user:
            return Response({'msg':'Available'}, status=status.HTTP_200_OK)
        return Response({'msg':'Not Available'}, status=status.HTTP_200_OK)

class UserCreationView(APIView):
    """
        Create a User, only POST method allowed
    """
    serializer_class = UserCreationSerializers
    permission_classes = [permissions.AllowAny]     
          
        
    def post(self, request):
        try:
            serializer = UserCreationSerializers(data=request.data)
            if not serializer.is_valid():
                return Response(
                    {'errors': serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            else:
                serializer.save()
                return Response({'message':'User Successfully Created...'}, status=status.HTTP_201_CREATED)      




        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )    
    
class UpdateProfilePasswordView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    
    def post(self, request):
        user = authenticate(username=request.user.username,password=request.data["password"])
        if user:
            return Response({"is_authenticated":"True"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request):
        user = request.user
        serializer = ProfilePasswordUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Password has been updated'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):

    serializer_class = UserLoginSerializers
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            serializer = UserLoginSerializers(data=request.data)

            if not serializer.is_valid():
                return Response(
                    {'errors': serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )

            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                token = Token.objects.get(user=user)
                return Response(
                    {'message': 'Login successful', 'username': user.username,'token':token.key},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Invalid username or password'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    
@api_view(('GET',))
def Logout(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

class UserDataListView(APIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserDataDetailSerializers


    def get(self, request):
        instance = UserData.objects.filter(user=request.user)
        serializer = UserDataDetailSerializers(instance,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddUserDataView(APIView):

    authentication_classes = [TokenAuthentication,SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserDataDetailSerializers

    def post(self, request):
        serializer = UserDataDetailSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserDataDetailView(APIView):
    serializer_class = UserDataDetailSerializers
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, request):
        return User.objects.get(username=request.user)

    def get(self, request, pk):
        user = self.get_object(request)
        try:
            instance = UserData.objects.get(user=user,id=pk)
            serializer = UserDataDetailSerializers(instance)
        except:
            instance = None

        if instance:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request, pk):
        user = self.get_object(request)
        try:
            instance = UserData.objects.get(user=user,id=pk)
            serializer = UserDataDetailSerializers(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            instance = None
        return Response(status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        user = self.get_object(request)
        try:
            instance = UserData.objects.get(user=user,id=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            instance = None        
        return Response(status=status.HTTP_400_BAD_REQUEST)

