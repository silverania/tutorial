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
from django.forms.models import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder

photo=""
message=""
tu=Tutorial()
formatted_datetime = formats.date_format(datetime.now(), "SHORT_DATETIME_FORMAT")


class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Resp) or isinstance(obj, Tutorial) :
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

def getLoginName():
    photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
    return photo

#Funzione per raccogliere i post da visualizzare al caricamento della homepage
def serializer(data):
    datas=serializers.serialize("json",data,cls=LazyEncoder)
    return datas

def getPost(request):
    global tu,formatted_datetime
    data_l=[]
    data_r=[]
    photos=[]
    photo=getLoginName()
    print(photo)
    print ("entrypoint to getPost")
    if 'tutorial' in request.GET and request.GET['tutorial'] :
        tutorial=request.GET.get('tutorial')
        tu=Tutorial.objects.filter(title=tutorial)#.get(title__icontains=tutorial)
        tu_serialized=serializer(Tutorial.objects.filter(title=tutorial))
        aggiornato=formatted_datetime
        #cnum=Comment.objects.filter(tutorial=tu[0]).count()
        cobj=Comment.objects.filter(tutorial=tu[0])
        data_l=cobj#data_l+list(x.tutorial.comments.all())
        for x in cobj:
            data_r=data_r+list(x.risposte.all())
            usr=Profile.objects.filter(username=x.author)
            #x.author.photo=settings.MEDIA_URL+str(x.author.photo)
            #print("usr="+str(usr))
            photos=photos+list(usr)
        print("commento:"+str(x))
        print("data_r:"+str(data_r))
        print("photos:"+str(photos))
        data_l6 = serializer(data_r)
        data_l7 = serializer(photos)
        data_l5=serializer(data_l)
        print("data_l:"+str(data_l6))
        print("data_r:"+str(data_l5))
        print("data_l7:"+str(data_l7))
        data = json.dumps({'data_l5': data_l5,'data_l7':data_l7, 'tu_serialized': tu_serialized,'data_l6':data_l6,'anonymousPhoto':photo})
        showPost(tu)
        #data_l=({'data_l5':data_l5,'tu_serialized':tu_serialized,})
        return JsonResponse(data,safe=False)
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
                r.author=myuser
                r.authorname=myuser.username
                r.commento=post
                r.save()
                print(str("è una risposta:"+str(post.risposte)))
            else:
                tu.post=post
                post.body=message
                post.author=myuser
                post.authorname=myuser.username
                print("creato,autore:"+str(post.created)+str(post.author))
                aggiornato=formatted_datetime
        if 'title' in request.GET and request.GET['title'] :
                post.title=request.GET.get('title',None)
                print("titolo"+post.title)
                post.save()
        if 'tutorial' in request.GET and request.GET['tutorial'] :
                tu.post=post
                print("tu.post="+str(tu.post)+"risposta:"+str(tu.post.risposte.all()))
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
