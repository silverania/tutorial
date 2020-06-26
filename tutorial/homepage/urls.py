from django.urls import path
from . import views
from .views import tutorials_all

app_name = 'homepage'
urlpatterns = [
path('', views.tutorial_list,name="home"),
path('tutorial/html_panel', views.tutorial_list,name="tutorial_list"),
path('tutorials/all', tutorials_all.as_view(),name="tutorials_all"),

path('tutorial/linux/home', views.tutorial_list,name="compilare_il_kernel_su_linux"),
path('tutorial/html/aggiungere_fonts', views.tutorial_list,name="aggiungere_fonts"),
path('web', views.tutorial_list, name='tutorialweb'),
path('<int:year>/<int:month>/<int:day>/<slug:tutorial>/',views.tutorial_detail,name='tutorial_detail'),
]
