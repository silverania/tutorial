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
            print("id"+str(request.user.id))
            myuser=Profile.objects.get(user_id=request.user.id)
        except:
            print("error"+str(myuser))
    else:
        user=request.GET.get('username',None)
        myuser=Profile.objects.filter(user__username=user)
        myuser.photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
    return myuser



#Funzione per raccogliere i post da visualizzare al caricamento della homepage
def serializer(data):
    datas=serializers.serialize("json",data,cls=LazyEncoder)
    return datas

def getPost(request):
    global tu,formatted_datetime
    data_l=[]
    data_r=[]
    photos=[]
    data=[]
    photo=getLoginName(request)
    if 'tutorial' in request.GET and request.GET['tutorial'] :
        tutorial=request.GET.get('tutorial')
        tu=Tutorial.objects.get(title=tutorial)
        tu_serialized=serializer(Tutorial.objects.filter(title=tutorial))
        aggiornato=formatted_datetime
        cnum=Comment.objects.filter(tutorial=tu.title)
        print(str(cnum))
        #resp=Resp.objects.filter(commento=cnum).first()
        for i in cnum:
            print("cnum i "+str(i))
            for ii in i.risposte.all():
                print("iiiiiii="+str(ii.author))
            #data_r=data_r+list(x.risposte.all())
            #print("#########"+data_r)
            #for i in x.risposte.all():
                usrResp=Profile.objects.get(user=(ii.author.id))
                print("########"+str(usrResp.user)+str(ii.author))
                photos=photos+list(usrResp)
        #usr=Profile.objects.filter(user__username=x.author)
        #x.author.photo=settings.MEDIA_URL+str(x.author.photo)
        #print("usr="+str(usr))
        #photos=photos+list(usr)
        data_l6 = serializer(data_r)
        data_l7 = serializer(photos)
        photo=(photo)
        photo=serializer(list(photo))
        print("dataL7,data_r="+str(data_l7)+str(data_r)+str(usrResp))
        data_l5=serializer(data_l)
        data = json.dumps({'data_l5': data_l5,'data_l7':data_l7, 'tu_serialized': tu_serialized,'data_l6':data_l6,'anonymousPhoto':photo})
        showPost(tu)
    try:
        return JsonResponse(data,safe=False)
    except UnboundLocalError:
        print("cahe sfcaccim")

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
        data={'username':myuser.username,'message':message,'type':type,'photo':str(myuser.photo),'aggiornato':aggiornato}
        return  JsonResponse(data)
def showPost(tutorial):
    thistutorial=tutorial
