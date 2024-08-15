from django.urls import path

from . import views

urlpatterns = [
  path('signup/', views.signup),
  path('login/', views.login),
  path('todos/', views.todo_list),
  path('todos/<str:pk>/', views.todo_detail),
]