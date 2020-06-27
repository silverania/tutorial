from django.http import HttpResponse
from django.views import View
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from .forms import LoginForm
from django.shortcuts import render, get_object_or_404
from .models import Tutorial,Visite
from django.urls import path
from .models import User,Category
import datetime
#from django.http import urllib

import os

def getLink(title):
    template=tutorial.title.replace(" ","_").lower()+".html"
    return template


def tutorial_detail(request, **kwargs):
    for key,value in kwargs.items():
        print(str(key)+str(value))
        if "post" in str(key) :
            post=value
        elif 'year' in key :
            year=str(value)
        elif 'month' in key:
            month=str(value)
        elif 'day' in key:
            day=str(value)
    tutorial_all = Tutorial.objects.all()
    categorie=Category.objects.all()
    users=User.objects.all()
    try:
        tutorial = get_object_or_404(Tutorial, slug=post)
        print("anno?="+str(tutorial.publish.year)+str(tutorial.publish.day))
        tutorial = get_object_or_404(Tutorial, slug=post,
        publish__year=year,
        )
    except UnboundLocalError :
        if 'homepage' in request.path:
            tutorial=Tutorial.objects.latest('publish')
    template=tutorial.title.replace(" ","_").lower()+".html"
    print("template="+template)
    if request.user.is_authenticated:
        login=True
    else:
        login=False
    vis=Visite()
    try:
        lastobj=Visite.objects.latest('visite')
        vis.visite=lastobj.visite+1
    except :
        vis.visite=1
    vis.save()
    return render(request,template,{'tutorial': tutorial,'visitato':vis,'login':login,'tutorial_all':tutorial_all,'categorie':categorie,'users':users})







def readInfoClient(request):
    req=request.META['HTTP_USER_AGENT']
    return str(req)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
