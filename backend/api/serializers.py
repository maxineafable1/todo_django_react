from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
  class Meta(object):
    model = User 
    fields = ['id', 'username', 'password', 'email']