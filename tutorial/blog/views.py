from django.shortcuts import render,redirect
from user.models import Profile
from blog.models import Comment
from django.http import HttpResponse,JsonResponse;
# Create your views here.
def newPost(request):
        message=request.GET.get('messaggio',None)
        print(str(message))

        if request.user.is_authenticated:
            currentUser=request.user
            currentUser.message=message
            return HttpResponse("o yes , user logged is  "+str(currentUser.blog_posts.all()) +"and messages is :"+currentUser.message+"from database:")
        else :
            data={'message':message}
            return  JsonResponse(data)
