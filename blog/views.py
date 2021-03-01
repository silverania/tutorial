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
    datas=serializers.serialize("json",data,cls=LazyEncoder,use_natural_primary_keys=True,use_natural_foreign_keys=True)
    return datas

def getPost(request):
    print("entry in view getpost")
    global tu,formatted_datetime
    data_l=[]
    data_r=[]
    data_l7=[]
    profile_list=[]
    photos=[]
    datac=[]
    data_resp=[]
    comments=Comment()
    risposte=[]
    risposte_serialized=[]
    profiles_list=[]
    comments_in_database=Comment.objects.all()
    photo=getLoginName(request)

    if 'tutorial' in request.GET and request.GET['tutorial'] :
        tutorial=request.GET.get('tutorial')
        tu=Tutorial.objects.get(slug=tutorial)
        #tu_serialized=serializer(Tutorial.objects.filter(slug=tutorial))
        aggiornato=formatted_datetime


        all_comments_for_page=Comment.objects.filter(tutorial=tu) # tutti i commenti sul tutorial
        #for comment in all_comments_for_page:
        #    comment.publish = formats.date_format(comment.publish, "SHORT_DATETIME_FORMAT")
        datac=list(all_comments_for_page)
        data_comm=serializer(datac)
        comment_model_serialized=serializer(all_comments_for_page)
        print("data comment Json format="+str(datac))
        print("comment_model_serialized="+str(comment_model_serialized))
        for comment in all_comments_for_page:
            print("body Comment"+str(comment.body))
            print()
            print("Comm="+str(comment))
            t=list(comment.risposte.all())
            try:
                t2=t2+t
            except UnboundLocalError :
                t2=t
                break
        try:
            print("RISPOSTE JSON SERIALIZED :"+str(t2)+"PROFILKE_LIST="+str(profile_list))
            risposte_serialized=serializer(t2)
            profiles=list(Profile.objects.all())
            profiles_list=serializer(profiles)
        except UnboundLocalError:
            print("Nessun commento per la pagina !")
        #data_l6=data_l6+list(comments.risposte.all())

        #    for ii in i.risposte.all():
        #        usrResp=Profile.objects.filter(user=(ii.author.id))
        #        data_l7=data_l7+list(usrResp)
        #        print("data_l7="+str(data_l7))
        #        try:
        #            resp=serializer(data_l6)
        #            print("data_l6"+str(resp))
        #        except (TypeError):
        #            print(commento senza risposte !')
        #photos=serializer(data_l7)
        #print("photos="+serializer(data_l7))
        data_l5=serializer(data_l)
        #data = json.dumps({'data_comm':data_comm,'profile':photos,'resp':risposte3})
        data = json.dumps({'data_comm':data_comm,'resps':risposte_serialized,'profiles':profiles_list})
        showPost(tu)
    try:
        return JsonResponse(data,safe=False)
    except UnboundLocalError:
        print("cahe sfcaccim")

def newPost(request):
        print("entry in view newpost")
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
    thistutorial=tutorial.slug
    print("thistutorial="+tutorial.slug)
