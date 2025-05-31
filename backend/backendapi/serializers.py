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
    
class UserLoginSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password':{'write_only':False}}

class UserDataDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields='__all__'
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        instance = UserData.objects.create(**validated_data)
        instance.save()
        return instance
    
