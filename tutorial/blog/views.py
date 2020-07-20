from django.shortcuts import render
from user.models import Profile
from blog.models import Comment
from django.http import HttpResponse;
# Create your views here.
def newPost(request):
    # prendi l user collegato
    if request.GET['q']:
        message=request.GET['q']
        print("yes!")
        username = None
        co=Comment.objects.all()

        if request.user.is_authenticated:
            currentUser=request.user
            currentUser.message=message
            return HttpResponse("o yes , user logged is  "+str(currentUser.blog_posts.all()) +"and messages is :"+currentUser.message+"from database:")
