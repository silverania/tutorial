from django.shortcuts import render,redirect
from user.models import Profile
from blog.models import Comment
from django.http import HttpResponse,JsonResponse
from django.conf import settings
# Create your views here.
#class HomePost:
#    def show():

def newPost(request):
        print ("entrypoint to newPost")
        if 'messaggio' in request.GET and request.GET['messaggio'] :
            message=request.GET.get('messaggio',None)
            print("message="+message)
        if 'type' in request.GET and request.GET['type'] :
            type=request.GET.get('type',None)
            print("tipo:"+type)
        if 'argomento' in request.GET and request.GET['argomento'] :
            argomento=request.GET.get('argomento',None)
            print("argomento:"+argomento)
        if request.user.is_authenticated:
            post=Comment()
            post.message=message
            print("id="+str(request.user.id))
            myuser=Profile.objects.get(user_id=request.user.id)
            myuser.post=post
            photo=settings.MEDIA_URL+str(myuser.photo)
            print("user autenticato:"+str(myuser)+" url:"+photo+"+post.message="+str(post.message)+"myuser.post="+str(myuser.post.message)+photo)
            data={'message':message,'type':type,'photo':photo}
        else:
            if 'username' in request.GET and request.GET['username'] :
                user=request.GET.get('username',None)
                photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
                print("user non autenticato:"+user)
                data={'message':message,'type':type,'photo':photo}
        return  JsonResponse(data)
