from django.shortcuts import render,redirect
from user.models import Profile
from blog.models import Comment
from django.http import HttpResponse,JsonResponse
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
            myuser=Profile.objects.get(pk=request.user.id)
            print("user autenticato:"+str(myuser))
        else:
            if 'username' in request.GET and request.GET['username'] :
                user=request.GET.get('username',None)
                print("user non autenticato:"+user)
        data={'message':message,'type':type}
        return  JsonResponse(data)
