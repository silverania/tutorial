from django.http import HttpResponse
from django.views import View
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from .forms import LoginForm
from django.shortcuts import render, get_object_or_404
from .models import Tutorial,Visite
from django.urls import path
from .models import Category
from user.models import Profile
from django.conf import settings
#User
from django.contrib.auth.models import User
import datetime
#from django.http import urllib

import os

def getLink(title):
    template=tutorial.title.replace(" ","_").lower()+".html"
    return template


def tutorial_detail(request, **kwargs):
    print("entry in tutorial_detail view")
    if request.user.is_authenticated:
        login=True
    else:
        login=False
    tutorial_all = Tutorial.objects.all()
    categorie=Category.objects.all()
    users=Profile.objects.all()
    for key,value in kwargs.items():
        print("value="+str(key)+str(value))
        if "post" in str(key) :
            post=value
            print("post="+post)
        elif 'year' in key :
            year=str(value)
            print("year="+year)
        elif 'month' in key:
            month=str(value)
            print("moth="+month)
        elif 'day' in key:
            day=str(value)
            print("day="+day)
    try:
        tutorial = Tutorial.objects.get(slug=post,
        publish__year=year)
        user=tutorial.author
        autore=str(user)
        photo=settings.MEDIA_URL+str(user.photo)
        #photo=user.photo
        print("anno?="+str(tutorial.publish.year)+str(tutorial.publish.day)+"autor="+str(tutorial.author)+"photo="+str(photo))

    except UnboundLocalError :
        if '' in request.path:
            tutorial=Tutorial.objects.latest('publish')
            user=tutorial.author
            autore=str(user)
            photo=settings.MEDIA_URL+str(user.photo)
    template=tutorial.title.replace(" ","_").lower()+".html"
    print("template="+template)

    vis=Visite()
    try:
        lastobj=Visite.objects.latest('visite')
        vis.visite=lastobj.visite+1
    except :
        vis.visite=1
    vis.save()
    return render(request,template,{'tutorial': tutorial,'visitato':vis,'login':login,'tutorial_all':tutorial_all,'categorie':categorie,'photo':photo,'users':users,'autore':autore})







def readInfoClient(request):
    req=request.META['HTTP_USER_AGENT']
    return str(req)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
