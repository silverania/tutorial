from django.urls import path
from . import views

app_name = 'homepage'
urlpatterns = [
path('homepage/', views.tutorial_detail,name="tutorial_detail"),


path('<int:year>/<int:month>/<int:day>/<slug:post>',views.tutorial_detail,name='tutorial_detail'),
]
