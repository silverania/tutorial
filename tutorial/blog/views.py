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
        r=Resp()
        myuser=Profile()
        tutorial_all = Tutorial.objects.all
        formatted_datetime = formats.date_format(datetime.now(), "SHORT_DATETIME_FORMAT")
        post.created=formatted_datetime
        if 'title' in request.GET and request.GET['title'] :
            post.title=request.GET.get('title',None)
            print("title="+post.title)
        if 'messaggio' in request.GET and request.GET['messaggio'] :
            message=request.GET.get('messaggio')
            post.body=message
            aggiornato=post.created
            print("message="+message)
        if 'type' in request.GET and request.GET['type'] :
            type=request.GET.get('type',None)
            if "resp" in type:
                r.body=message
                post.risposte=r
                print(str("è una risposta:"+str(post.risposte)))
            print("tipo:"+type)
        if 'tutorial' in request.GET and request.GET['tutorial'] :
            tutorial=request.GET.get('tutorial',None)
            print("tutorial:"+tutorial)
        thistutorial=Tutorial.objects.get(title__contains=tutorial)
        print("thistutorial="+str(thistutorial))
        thistutorial.post=post
        print("thistutorial="+str(thistutorial.post.body))
        myuser=Profile.objects.get(user_id=request.user.id)
        myuser.post=post
        user=request.GET.get('username',None)
        if "anonymousUser" in user:
            photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
        else :
            photo=settings.MEDIA_URL+str(myuser.photo)
        r.author=myuser
        r.save()
        post.save()
        thistutorial.save()
        print("post.created="+str(post.created)+"post.body="+str(post.body))
        print("user autenticato:"+str(myuser)+" url:"+photo+"myuser.post="+str(myuser.post.body)+photo+"post.created="+str(post.created))
        if isinstance(r,Resp):
            print("trovata instanza risposta")
        data={'message':message,'type':type,'photo':photo,'aggiornato':aggiornato}
        return  JsonResponse(data)
