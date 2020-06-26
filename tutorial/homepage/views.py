from django.http import HttpResponse
from django.views import View
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from .forms import LoginForm
from django.shortcuts import render, get_object_or_404
from .models import Tutorial,Visite
from django.urls import path
from .models import User,Category

import os



def tutorial_list(request):
    tutorial_all = Tutorial.objects.all()
    categorie=Category.objects.all()
    for cat in categorie:
        cat.title=str(cat.title)
    if request.user.is_authenticated:
        login=True
        t=Tutorial
        for tut in tutorial_all:
            author_name=str(tut.author.first_name)+" "+str(tut.author.last_name)
            user_name=str(request.user.first_name)+" "+str(request.user.last_name)
            if user_name in author_name:
                us_author=User.objects.filter(first_name__contains=str(request.user.first_name))
                print("#############"+str(us_author))

                tutorials_author=Tutorial.objects.get(title=tut.title)
                tutorials_author.save()
                print("tut_autor="+str(tut.author))
                tut.title=str(tut.title)
    else:
        login=False
    vis=Visite()
    try:
        lastobj=Visite.objects.latest('visite')
        vis.visite=lastobj.visite+1
    except :
        vis.visite=1
    vis.save()
    print(str(request.path))
    pat=request.path
    print("PAT="+pat)

    #return render(request,'blog/post/list.html',{'posts': posts})
    if 'title' in request.GET and request.GET['title']:
        title=request.GET.get('title')
        tut_title=title.replace("_"," ")
        tutorial = Tutorial.objects.filter(title__icontains=tut_title)
        print(str(tutorial)+"=tutorial "+title)
        page=title+".html"
    elif "homepage" in request.path:
        page = "html_-_menu_a_comparsa.html"
        tutorial = Tutorial.objects.filter(title__icontains="menu_a_comparsa")
    else: 
        page = "html_-_menu_a_comparsa.html"
        tutorial = Tutorial.objects.filter(title__icontains="menu_a_comparsa")
    return render(request,page,{'tutorial': tutorial,'visitato':vis,'login':login,'tutorial_all':tutorial_all,'categorie':categorie})

def tutorial_detail(request, year, month, day, post):
    post = get_object_or_404(Post, slug=post,
    status='published',
    publish__year=year,
    publish__month=month,
    publish__day=day)
    return render(request,'blog/post/detail.html',{'post': post})



class home(View):
    def get(self, request, *args, **kwargs):
        t = get_template('tutorial.html')
        html = t.render({'request':request,'pat':path,'titlecarousel':s,'titleVideo' : lista , 'numeropagine': numeroPagine,'pagina':pag,'login':login,'filmsNumber':count})
        return HttpResponse(html)


class tutorials_all(View):
    def get(self,request):
        tutorial=Tutorial.objects.all()
        users=User.objects.all()
        return render(request,"tutorials_list.html",{'users':users,'tutorial':tutorial })



BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
