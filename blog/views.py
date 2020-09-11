from django.shortcuts import render,redirect
from user.models import Profile
from blog.models import Comment,Resp
from homepage.models import Tutorial
from django.http import HttpResponse,JsonResponse
from django.conf import settings
from django.utils import formats
from datetime import datetime
import json
from django.core import serializers

photo=""
message=""
tu=Tutorial()
formatted_datetime = formats.date_format(datetime.now(), "SHORT_DATETIME_FORMAT")

from django.core.serializers.json import DjangoJSONEncoder

class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Resp):
            return str(obj)
        return super().default(obj)

def getLoginName(request):
    if request.user.is_authenticated:
        try:
            myuser=Profile.objects.get(user_id=request.user.id)
            myuser.photo=settings.MEDIA_URL+str(myuser.photo)
        except:
            print('non è possibile recuperare l user !')
    else:
        user=request.GET.get('username',None)
        myuser=Profile.objects.get(user__username=user)
        myuser.photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
    return myuser

#Funzione per raccogliere i post da visualizzare al caricamento della homepage
def getPost(request):
    global tu,formatted_datetime
    print ("entrypoint to getPost")
    if 'tutorial' in request.GET and request.GET['tutorial'] :
        tutorial=request.GET.get('tutorial')
        tu=Tutorial.objects.get(title=tutorial)#.get(title__icontains=tutorial)
        aggiornato=formatted_datetime
        c=Comment.objects.filter(body=tu.post.body).first()
        data_l=c.risposte.all()
        data_l5 = serializers.serialize("json",data_l,cls=LazyEncoder)
        #data_l=data_l.replace("\'","\"")

        #data_l=data_l.replace("[","\'")
        #data_l=data_l.replace("]","\'")
        #data_l=data_l.replace("<QuerySet","")


        print("data"+str(data_l5))
        showPost(tu)
    return JsonResponse(data_l5,safe=False)
    #return JsonResponse({'post':tu.post.body,'creato': aggiornato,'user':str(tu.author)})

def newPost(request):
        global formatted_datetime
        print ("entrypoint to newPost")
        #thistutorial=Tutorial()
        post=Comment()
        myuser=getLoginName(request)
        print("tu globale="+str(tu))
        if 'type' in request.GET and request.GET['type'] :
            type=request.GET.get('type',None)
        if 'messaggio' in request.GET and request.GET['messaggio'] :
            message=request.GET.get('messaggio')
            if "resp" in type:
                r=Resp()
                r.body=message
                post.risposte=r
                r.author=myuser
                r.save()
                aggiornato=formatted_datetime
                r.created=aggiornato
                print(str("è una risposta:"+str(post.risposte)))
            else:
                post.body=message
                post.author=myuser
                print("creato,autore:"+str(post.created)+str(post.author))
                aggiornato=formatted_datetime
                post.created=aggiornato
        if 'title' in request.GET and request.GET['title'] :
                post.title=request.GET.get('title',None)
                print("titolo"+post.title)
                post.save()
        if 'tutorial' in request.GET and request.GET['tutorial'] :
                tu.post=post
                print("tu.post="+str(tu.post)+"risposta:"+str(tu.post.risposte))
        try:
            if isinstance(r,Resp):
                print("trovata instanza risposta")
                post.risposte=r
        except UnboundLocalError:
                print("il messaggio non è una risposta !"+post.title)
        data={'message':message,'type':type,'photo':str(myuser.photo),'aggiornato':aggiornato}
        return  JsonResponse(data)
def showPost(tutorial):
    thistutorial=tutorial
    print("fffffff"+str(thistutorial.post.body)+"/nautore:"+str(thistutorial.post.author))
