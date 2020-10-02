
from django.http import HttpResponse
from django.views import View
from django.shortcuts import render, get_object_or_404
from django.urls import path

import os


from django.contrib.auth import login, authenticate

from .forms import UserEditForm, ProfileEditForm
from .models import Profile,User
from django.contrib.auth.decorators import login_required
from .forms import LoginForm, UserRegistrationForm
from django.template import Template,Context
from django.template.loader import get_template
#from django.contrib.auth import get_user_model


@login_required
def dashboard(request):
    return render(request,'user/dashboard.html',{'section': 'dashboard'})



def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
                t= get_template('login_success.html')
                html=t.render()
                cd = form.cleaned_data
                user = authenticate(request,
                username=cd['username'],
                password=cd['password'])
                if user is not None:
                    if user.is_active:
                        login(request, user)
                        return HttpResponse(html)
                    else:
                        return HttpResponse('Disabled account')
                else:
                        return HttpResponse('I DATI NON SONO ESATTI , SE NON RIESCI A FARE IL LOGIN FATTI REINVIARE LA PASSWORD .')
    else:
        if request.user.is_authenticated:
            return HttpResponse( "Utente gia autenticato !!")
        form = LoginForm()
    return render(request, 'user/login.html', {'form': form})

class LogoutView():
    def logout(request):
        logout(request)
        redirect_to = self.request.GET.get("next", "/")
        print("redirect to"+redirect_to)
        return redirect_to

def user_register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            # Create a new user object but avoid saving it yet

            new_user = user_form.save(commit=False)
            #user = User.objects.get(pk=user_id)
            # Set the chosen password
            new_user.set_password(
            user_form.cleaned_data['password'])
            # Save the User object
            new_user.save()
            #Profile.objects.create(user=new_user)
            #print(new_user.pk)
            #update_profile(request,new_user)
            return render(request,'user/register_done.html',{'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request,'user/register.html',{'user_form': user_form})


@login_required
def edit(request):
    print("call def edit")
