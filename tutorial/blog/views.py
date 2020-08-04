from django.shortcuts import render,redirect
from user.models import Profile
from blog.models import Comment
from django.http import HttpResponse,JsonResponse
# Create your views here.
def newPost(request):
        print ("entrypoint to newPost")
        if 'messaggio' in request.GET and request.GET['messaggio'] :
            message=request.GET.get('messaggio')
            print("message="+message)
        if 'type' in request.GET and request.GET['type'] :
            type=request.GET.get('type',None)
            print("tipo:"+type)
        if request.user.is_authenticated:
            user=str(request.user)
            print("user autenticato:"+str(user))
        else:
            if 'username' in request.GET and request.GET['username'] :
                user=request.GET.get('username',None)
                print("user non autenticato:"+user)
            user
            #currentUser.message=message
            #return HttpResponse("o yes , user logged is  "+str(currentUser.blog_posts.all()) +"and messages is #:"+currentUser.message+"from database:)
        data={'message':message,'type':type,'user':user}
        return  JsonResponse(data)
