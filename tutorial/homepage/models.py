from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime
# Create your models here.
from django.contrib.auth.models import User


class Visite(models.Model):
    visite=models.PositiveIntegerField(default=1)
    def __str__(self):
        return "%s" % (self.visite)

class Category(models.Model):
    CATEGORY = (
    ('linux', 'Linux'),
    ('web', 'Web'),
    ('django', 'Django'),
    ('generica', 'Generica'),
    )
    linux='Linux'
    web='Web'
    django='Django'
    generica='Generica'
    title = models.CharField(max_length=250)
    user = models.ManyToManyField(User,related_name='categories')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=50,
    choices=CATEGORY,
    default=generica)
    class Meta:
        ordering = ('-created',)
    def __str__(self):
        return "%s" % (self.title)

class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    users = User.objects.all()
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category,related_name='users')
    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)


class Tutorial(models.Model):
    STATUS_CHOICES = (
    ('draft', 'Draft'),
    ('published', 'Published'),)
    title = models.CharField(max_length=250)
    overview = models.TextField(default="tutorial")
    slug = models.SlugField(max_length=250,unique_for_date='publish',null=True,blank=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    cat=Category
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='draft')
    class Meta:
        ordering = ('-publish',)
    def __str__(self):
        return "%s" % (self.title)
    def get_absolute_url(self):
        return reverse('blog:post_detail',
        args=[self.publish.year,
        self.publish.month,
        self.publish.day,
        self.slug])

class Post(models.Model):
    STATUS_CHOICES = (
    ('draft', 'Draft'),
    ('published', 'Published'),)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250,
    unique_for_date='publish')
    author = models.ForeignKey(User,
    on_delete=models.CASCADE,
    related_name='blog_posts')
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,
    choices=STATUS_CHOICES,
    default='draft')
    class Meta:
        ordering = ('-publish',)
    def __str__(self):
        return self.title


# la classe category definisce le categorie in cui sarannno inseriti i singoli tutorials
# ad esempio sara creata la categoria linux, web , ecc..
