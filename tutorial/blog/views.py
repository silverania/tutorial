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
photo=""
message=""
def getLoginName(request):
    if request.user.is_authenticated:
        user=request.GET.get('username',None)
        try:
            myuser=Profile.objects.get(user_id=request.user.id)
            photo=settings.MEDIA_URL+str(myuser.photo)
        except:
            myuser=Profile.objects.get(user__username=user)
            photo=settings.MEDIA_URL+"images/user-secret-solid.svg"
        return myuser

def getPost(request):
    print ("entrypoint to getPost")
    thistutorial=Tutorial()
    if 'tutorial' in request.GET and request.GET['tutorial'] :
        tutorial=request.GET.get('tutorial',None)
        tu=Tutorial.objects.order_by('publish').get(title__icontains=tutorial)
        # PRENDI I POST DEL TUTORIAL :::::GLI UULTIMI 5 MGARI
        print("tu="+str(tu.post.body))
        aggiornato=tu.post.created
        tu.save()
        print("creat:"+str(tu.post.created))
        showPost(tu)
    return JsonResponse({'post':tu.post.body,'creato': str(tu.post.publish),'user':str(tu.author)})

def newPost(request):
        print ("entrypoint to newPost")
        thistutorial=Tutorial()
        post=Comment()
        myuser=Profile()
        formatted_datetime = formats.date_format(datetime.now(), "SHORT_DATETIME_FORMAT")
        post.created=formatted_datetime
        if 'type' in request.GET and request.GET['type'] :
            type=request.GET.get('type',None)
        if 'messaggio' in request.GET and request.GET['messaggio'] :
            message=request.GET.get('messaggio')
            if "resp" in type:
                r=Resp()
                r.body=message
                post.risposte=r
                r.author=getLoginName(request)
                r.save()
                print(str("è una risposta:"+str(post.risposte)))
            else:
                post.body=message
                post.author=getLoginName(request)
                print("creato,autore:"+str(post.created)+str(post.author))
                aggiornato=post.created
        if 'title' in request.GET and request.GET['title'] :
                post.title=request.GET.get('title',None)
                print("titolo"+post.title)
                post.save()
        if 'tutorial' in request.GET and request.GET['tutorial'] :
                tutorial=request.GET.get('tutorial',None)
                thistutorial=Tutorial.objects.get(title__contains=tutorial)
                thistutorial.post=post
        try:
            if isinstance(r,Resp):
                print("trovata instanza risposta")
        except UnboundLocalError:
                print("il messaggio non è una risposta !"+post.title)

        data={'message':message,'type':type,'photo':photo,'aggiornato':aggiornato}
        return  JsonResponse(data)

def showPost(tutorial):
    thistutorial=tutorial
    p=Tutorial.objects.filter(title__icontains="Inserire Un Commento Per ")
    print("fffffff"+str(tutorial.post.body)+"/nautore:"+str(tutorial.author))
    tutorial.save()
