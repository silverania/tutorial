from django.shortcuts import render
from django.http import HttpResponse;
# Create your views here.
def newPost(request):
    # prendi l user collegato
    if request.GET['q']:
        message=request.GET['q']
        print("yes!")
        username = None
        if request.user.is_authenticated:
            username = request.user.username
            return HttpResponse("o yes , user logged is :"+username +" and messages is :"+message)
