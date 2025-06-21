from rest_framework import serializers
from django.contrib.auth.models import User

from.models import UserData

class UserCreationSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password':{'write_only':True}} # Field doesnt include the hashed password in the json data

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        user = User.objects.create_user(username=username)
        user.set_password(password)
        user.save()
        return user
    
class UserNameAvailableSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class ProfilePasswordUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']
        extra_kwargs = {'password':{'write_only':True}} # Field doesnt include the hashed password in the json data
    def update(self,instance, validated_data):   
        password = validated_data.pop('password')
        instance.set_password(password)
        instance.save()
        return instance
    
class UserLoginSerializers(serializers.Serializer):
    # IMPORTANT: Using Model Serializer here will result in error
    """
        ModelSerializer is used to provide a quick standard serialization for CRUD operations,
        so when your request is POST your serializer will assume that you are creating a new user
        with the request data for Users model so creation validators will be applied and as the username
        is unique..., this will result in the error.

        Check the stackoverflow link here : https://stackoverflow.com/questions/60533893/user-with-this-username-already-exists-in-drf-modelserializer-if-not-specified
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

class UserDataDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields='__all__'
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        instance = UserData.objects.create(**validated_data)
        instance.save()
        return instance
    
