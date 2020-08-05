from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import User
from homepage.models import Tutorial
from django.urls import reverse
from user.models import Profile
# Create your models here.

class Comment(models.Model):
    STATUS_CHOICES = (
    ('rigettato', 'Rigettato'),
    ('publicato', 'Publicato'),
    )
    tutorial=models.ForeignKey(Tutorial,related_name='all_comments',on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250,unique_for_date='publish')
    author = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='blog_posts')
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='bozza')
    def get_absolute_url(self):
        return reverse('blog:newPost',args=[self.publish.year,self.publish.month,self.publish.day, self.slug])
    class Meta:
        ordering = ('-publish',)
    def __str__(self):
        return self.title



"""
class Resp(models.Model):
    STATUS_CHOICES = (
    ('rigettato', 'Rigettato'),
    ('publicato', 'Publicato'),
    )
    resp=models.ForeignKey(Comment,related_name='resps',on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250,unique_for_date='publish')
    author = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='blog_posts')
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='bozza')
    def get_absolute_url(self):
        return reverse('blog:newPost',args=[self.publish.year,self.publish.month,self.publish.day, self.slug])
    class Meta:
        ordering = ('-publish',)
    def __str__(self):
        return self.title
"""
