from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer, TodoSerializer
from .models import Todo

# Create your views here.
@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
    return Response({'error': 'incorrect email or password'}, status=status.HTTP_404_NOT_FOUND)

  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer(instance=user)
  return Response({'token': token.key, 'user': serializer.data})


@api_view(['POST'])
def signup(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.get(username=request.data['username'])
    user.set_password(request.data['password'])
    user.save()
    token = Token.objects.create(user=user)
    return Response({'token': token.key, 'user': serializer.data})
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def todo_list(request):
  user = request.user

  if request.method == 'GET':
    todos = user.todo_set.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

  elif request.method == 'POST':
    request.data['user'] = user.id
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def todo_detail(request, pk):
  user = request.user
  try:
    todo = Todo.objects.filter(user=user.id).get(id=pk)
  except Todo.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if (request.method == 'PUT'):
    request.data['user'] = user.id
    serializer = TodoSerializer(todo, data=request.data)
    if serializer.is_valid():
      serializer.save()
      todos = user.todo_set.all()
      serializer = TodoSerializer(todos, many=True)
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'DELETE':
    todo.delete()
    todos = user.todo_set.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)