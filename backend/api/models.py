from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tag(models.Model):
  tag = models.CharField(max_length=30)

  def __str__(self):
    return self.tag

class Todo(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  description = models.TextField(null=True, blank=True)
  completed = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  tags = models.ManyToManyField(Tag, related_name='todos')

  def __str__(self):
    return self.title