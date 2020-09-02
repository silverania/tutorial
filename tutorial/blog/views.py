from django.shortcuts import render,redirect
from user.models import Profile
from blog.models import Comment,Resp
from homepage.models import Tutorial
from django.http import HttpResponse,JsonResponse
from django.conf import settings
from django.utils import formats
from datetime import datetime
# Create your views here.
#class HomePost:
#    def show():

def newPost(request):
        print ("entrypoint to newPost")
        post=Comment()
        tutorial_all = Tutorial.objects.all
        formatted_datetime = formats.date_format(datetime.now(), "SHORT_DATETIME_FORMAT")
        post.created=formatted_datetime
        if 'messaggio' in request.GET and request.GET['messaggio'] :
            message=request.GET.get('messaggio')
            post.body=message
            aggiornato=post.created
            post.save()
            print("message="+message)
        if 'type' in request.GET and request.GET['type'] :
            type=request.GET.get('type',None)
            if "resp" in type:
                r=Resp()
                r.body=message
                post.risposte=r
                print(str(post.risposte))
            print("tipo:"+type)
        if 'tutorial' in request.GET and request.GET['tutorial'] :
            tutorial=request.GET.get('tutorial',None)
            print("tutorial:"+tutorial)
        if 'argomento' in request.GET and request.GET['argomento'] :
            argomento=request.GET.get('argomento',None)
            print("argomento:"+argomento)
        if request.user.is_authenticated:
            print("id="+str(request.user.id))
            myuser=Profile.objects.get(user_id=request.user.id)
            myuser.post=post
            photo=settings.MEDIA_URL+str(myuser.photo)
            print("user autenticato:"+str(myuser)+" url:"+photo+"myuser.post="+str(myuser.post.message)+photo+"post.created="+str(post.created))
            data={'message':message,'type':type,'photo':photo,'aggiornato':aggiornato}
        else:
            if 'username' in request.GET and request.GET['username'] :
                user=request.GET.get('username',None)
                photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
                print("post.created="+str(post.created)+"post.body="+str(post.body))
                data={'message':message,'type':type,'photo':photo,'aggiornato':aggiornato}
        return  JsonResponse(data)
