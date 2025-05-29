from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,logout,login

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication,SessionAuthentication
from rest_framework.authtoken.models import Token



from .models import UserData
from .serializers import *


class UserCreationView(APIView):
    """
        Create a User, only POST method allowed
    """
    serializer_class = UserCreationSerializers
    permission_classes = [permissions.AllowAny]
        
    def post(self, request, format=None):
        serializer = UserCreationSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
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
        #return Response(status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):

    serializer_class = UserLoginSerializers
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user = authenticate(username=request.data["username"],password=request.data["password"])
        if user:
            login(request, user)
            serializer=UserLoginSerializers(user)

            token = Token.objects.get(user=user)
            return Response({"token":token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDataListView(generics.ListAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataDetailSerializers
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

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

