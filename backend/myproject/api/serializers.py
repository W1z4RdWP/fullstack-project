from rest_framework import serializers
from django.contrib.auth.models import User

from blog.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    surname = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'name', 'surname')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
            }

    def create(self, validated_data):
        name = validated_data.pop('name')
        surname = validated_data.pop('surname')
        user = User(
            username=validated_data['email'], 
            email=validated_data['email'],
            first_name=name,
            last_name=surname
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

