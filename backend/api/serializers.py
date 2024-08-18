from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
  tags = serializers.SlugRelatedField(
    many=True,
    read_only=True,
    slug_field='tag'
  )

  class Meta:
    model = Todo
    fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
  class Meta(object):
    model = User 
    fields = ['id', 'username', 'password', 'email']