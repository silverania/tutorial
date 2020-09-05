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
        if 'type' in request.GET or not request.GET['type'] :
            print("not type ")
            if 'tutorial' in request.GET and request.GET['tutorial'] :
                tutorial=request.GET.get('tutorial',None)
                tu=Tutorial.objects.get(title=tutorial)
                showPost(tu)
        else :

            tutorial_all = Tutorial.objects.all
            formatted_datetime = formats.date_format(datetime.now(), "SHORT_DATETIME_FORMAT")
            post.created=formatted_datetime
        if 'title' in request.GET and request.GET['title'] :
            title=request.GET.get('title',None)

        if 'messaggio' in request.GET and request.GET['messaggio'] :
            message=request.GET.get('messaggio')
            post.body=message
            aggiornato=post.created

        if 'type' in request.GET and request.GET['type'] :
            type=request.GET.get('type',None)
            if "resp" in type:
                r.body=message
                post.risposte=r
                print(str("è una risposta:"+str(post.risposte)))

        if 'tutorial' in request.GET and request.GET['tutorial'] :
            tutorial=request.GET.get('tutorial',None)

        thistutorial=Tutorial.objects.get(title__contains=tutorial)

        thistutorial.post=post

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
        if isinstance(r,Resp):
            print("trovata instanza risposta")
        data={'message':message,'type':type,'photo':photo,'aggiornato':aggiornato}
        return  JsonResponse(data)

def showPost(tutorial):
    thistutorial=tutorial
    p=Tutorial.objects.filter(title__icontains="Inserire Un Commento Per ")
    print("fffffff"+str(tutorial.post.body))
