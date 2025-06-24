from rest_framework import serializers
from django.contrib.auth.models import User
from cryptography.fernet import Fernet

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
    
class UserNameAvailableSerializers(serializers.Serializer):
    username = serializers.CharField(required=True)
    
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


class UserDataListSerializers(serializers.ModelSerializer):


    class Meta:
        model = UserData
        fields='__all__'
        extra_kwargs = {'password':{'write_only':True}}

    def to_representation(self,instance):
        representation = super().to_representation(instance)
        representation['password'] = '*'*len(instance.password)
        return representation

class ShowPasswordSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    key = serializers.CharField(required=True)

    def decrypt(self, validated_data):
        id = validated_data.get('id')
        key = validated_data.get('key')
        token = UserData.objects.get(id=id).password
        fkey = str.encode(key)
        f = Fernet(fkey)
        passwd = f.decrypt(str.encode(token))
        passwd = passwd.decode()
        return passwd
class UserDataDetailSerializers(serializers.ModelSerializer):


    class Meta:
        model = UserData
        fields='__all__'
        extra_kwargs = {'password':{'write_only':True}}

    def to_representation(self,instance):
        representation = super().to_representation(instance)
        representation['password'] = '*'*len(instance.password)
        return representation
    
    def encrypt(self, password):
        key = Fernet.generate_key()
        f = Fernet(key)
        token = f.encrypt(str.encode(password))
        return token.decode('utf-8'),key.decode('utf-8')

    def create(self, validated_data):
        password = validated_data.get('password')
        encrypted_password,key = self.encrypt(password)
        self.encryption_key = key
        instance = UserData.objects.create(**validated_data)
        instance.password = encrypted_password
        instance.save()
        
        return instance
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            new_password = validated_data.pop('password')
            encrypted_password,key = self.encrypt(new_password)
            instance.password = encrypted_password
            self.encryption_key = key
        if (len(validated_data.items()) > 0):
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
        instance.save() 


        return instance
    
