from django.db import models
from homepage.models import Category

# Create your models here.
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime
#from django.contrib.auth.models import User
from django.urls import reverse


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    categories = models.ManyToManyField(Category,related_name='users')
    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)
