from django.urls import path
from . import views

app_name = 'blog'
urlpatterns = [
path('getpost', views.newPost,name="newPost"),
]
