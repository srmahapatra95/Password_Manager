from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,logout,login
from django.contrib.auth.hashers import check_password, make_password



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, renderer_classes




from .models import UserData
from .serializers import *



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
                token, _ = Token.objects.get_or_create(user=user)
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
    authentication_classes = [TokenAuthentication]
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
class GetUserSettingsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            user = User.objects.get(username=request.user)
            user_settings = UserSettings.objects.get(user=user)
            serializer = UserSettingSerializer(user_settings)
            if not user:
                return Response(
                    {'error': '401 UNAUTHORIZED'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            return Response(
                    serializer.data,
                    status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class CheckPINView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(username=request.user)
            user_settings = UserSettings.objects.get(user=user)

            if(check_password(request.data['lock_screen_password'], user_settings.lock_screen_password)):
                return Response(
                    {'msg': 'Valid'},
                    status=status.HTTP_200_OK
            )
            return Response(
                    {'error': 'Invalid'},
                    status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SetUserSettingsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        try:
            user = User.objects.get(username=request.user)
            user_settings = UserSettings.objects.get(user=user)
            serializer = UserSettingSerializer(user_settings,data=request.data,partial=True)
            if not serializer.is_valid():
                return Response(
                    {'error': 'Invalid data'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer.save() 
            return Response(
                    serializer.data,
                    status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class CheckPasswordView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


    def post(self,request):
        try:

            user = User.objects.get(username=request.user)
            if not user:
                return Response(
                    {'error': '401 UNAUTHORIZED'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            password_matched = user.check_password(request.data['password'])
            if not password_matched:
                return Response(
                        {'error':'Invalid Password...'},
                        status=status.HTTP_401_UNAUTHORIZED
                )
            else:
                return Response(
                        {'message':'Password Matched'},
                        status=status.HTTP_200_OK
                )
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


    def patch(self,request):
        try:

            user = User.objects.get(username=request.user)
            if not user:
                return Response(
                    {'error': '401 UNAUTHORIZED'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            print(request.data)
            user.set_password(request.data['password'])
            user.save()
            return Response(
                    {'message':'Password Saved...'},
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
    authentication_classes = [TokenAuthentication]
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

    authentication_classes = [TokenAuthentication]
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
    authentication_classes = [TokenAuthentication]
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
            if(serializer.decrypt(serializer.data) == 'Could Not Decrypt'):
                data = {
                    'error':'Could Not Decrypt'
                }
            else:
                data = {
                    'key':serializer.decrypt(serializer.data)
                }                
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class UpdatePasswordDataView(APIView):
    authentication_classes = [TokenAuthentication]
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
    authentication_classes = [TokenAuthentication]
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


class BulkDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, request):
        return User.objects.get(username=request.user)
    
    def delete(self, request):
        try:
            user = self.get_object(request)
            instance = UserData.objects.filter(user=user,id__in=request.data)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {'error': f'Server Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
