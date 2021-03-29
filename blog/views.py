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
from django.urls import reverse

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
            myuser=Profile.objects.filter(user_id=request.user.id)
        except:
            print("error"+str(myuser))
    else:
        user=request.GET.get('username')
        myuser=Profile.objects.filter(first_name="anonimo")
        myuser.photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
        print("USER NON AUTENT "+ str(myuser))
    return myuser

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
    userLogged=getLoginName(request)
    print("USERLOGGED="+str(userLogged))
    if 'tutorial' in request.GET and request.GET['tutorial'] :
        tutorial=request.GET.get('tutorial')
        tu=Tutorial.objects.get(slug=tutorial)
        aggiornato=formatted_datetime
        all_comments_for_page=Comment.objects.filter(tutorial=tu)[:5] # tutti i commenti sul tutorial
        datac=list(all_comments_for_page)
        userLogged=list(userLogged)
        userLogged=serializer(userLogged)
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
        data_l5=serializer(data_l)
        data = json.dumps({'userLogged':userLogged,'data_comm':data_comm,'resps':risposte_serialized,'profiles':profiles_list})
        #showPost(tu)
    try:
        return JsonResponse(data,safe=False)
    except UnboundLocalError:
        print("cahe sfcaccim")


def newPost(request):
        #global formatted_datetime
        print ("entrypoint to newPost")
        #thistutorial=Tutorial()
        post=Comment()
        myuser=Profile()
        myuser.firstname=getLoginName(request)
        post.tutorial=tu
        post.slug=retReverse("newPost").replace("/","_")
        post.publish=datetime.now()
        post.created=post.publish
        print("SLUG="+str(post.slug))
        if 'type' in request.GET and request.GET['type'] :
            post.postType=request.GET.get('type')
        if 'username' in request.GET and request.GET['username'] :
            author=request.GET.get('username')
            myuser=Profile.objects.get(first_name=author)
            print("user MYUSER="+str(myuser))
            post.author=myuser
        if 'title' in request.GET and request.GET['title'] :
            title=request.GET.get('title')
            post.title=title
        if 'body' in request.GET and request.GET['body'] :
            body=request.GET.get('body')
            post.body=body
        tu.save()
        post.save()
        return HttpResponse("OK !")
        """
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
        if 'tutorial' in request.GET and request.GET['tutorial'] :
                tu.post=post
                print("tu.post="+str(tu.post)+"risposta:"+str(tu.post.risposte.all()))

        """
"""
def showPost(tutorial):
    print("entry in view showPost")
    thistutorial=tutorial.slug
    print("thistutorial="+tutorial.slug)
"""
def retReverse(name):
    return reverse("blog:"+name)
