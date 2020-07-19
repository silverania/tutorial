from django.shortcuts import render

# Create your views here.
def newPost(request):
    if request.GET['q']:
        print("read q")
