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
        try:
            username = request.query_params.get('username')
            serializer = UserNameAvailableSerializers(data={'username':username})

            if not serializer.is_valid():
                return Response(
                    {'errors': serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )            
            user_exists = User.objects.filter(username=username).exists()
            if not user_exists:
                return Response({'message':'Available'}, status=status.HTTP_200_OK)
            return Response({'message':'Not Available'}, status=status.HTTP_409_CONFLICT)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )  


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
                    {'message': 'Login successful','token':token.key},
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

class IsAuthenticatedUserView(APIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(username=request.user)
            if not user:
                return Response(
                    {'error': '401 UNAUTHORIZED'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            return Response(
                    {'id':user.id, 'username': user.username},
                    status=status.HTTP_200_OK
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
    serializer_class = UserDataListSerializers


    def get(self, request):
        try:
            instance = UserData.objects.filter(user=request.user)
            serializer = UserDataListSerializers(instance,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class AddUserDataView(APIView):

    authentication_classes = [TokenAuthentication,SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserDataDetailSerializers

    def post(self, request):
        try:
            serializer = UserDataDetailSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                encryption_key = getattr(serializer, 'encryption_key', {})
                print({'key':encryption_key,'data':serializer.data})
                return Response({'key':encryption_key,'data':serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class ShowPasswordView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]  

    def post(self, request):
        try:
            print(request.data)
            serializer = ShowPasswordSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors, status.HTTP_400_BAD_REQUEST
                )
            print(serializer.decrypt(serializer.data))
            return Response(serializer.decrypt(serializer.data), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class UpdatePasswordDataView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    
    def post(self, request):
        try:
            user = authenticate(username=request.user.username,password=request.data["password"])
            if user:
                return Response({"is_authenticated":True}, status=status.HTTP_200_OK)
            return Response({"is_authenticated":False}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 


    def patch(self, request):
        try:
            user = request.user
            serializer = ProfilePasswordUpdateSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Password has been updated'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 

        

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
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    def patch(self, request, pk):
        user = self.get_object(request)
        try:
            instance = UserData.objects.get(user=user,id=pk)
            serializer = UserDataDetailSerializers(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                encryption_key = getattr(serializer, 'encryption_key', {})
                if not encryption_key:
                    print(serializer.data)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({'key':encryption_key,'data':serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def delete(self, request, pk):
        user = self.get_object(request)
        try:
            instance = UserData.objects.get(user=user,id=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

