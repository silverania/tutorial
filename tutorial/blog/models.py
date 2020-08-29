from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import User

from django.urls import reverse
from user.models import Profile
# Create your models here.



class Resp(models.Model):
    STATUS_CHOICES = (
    ('rigettato', 'Rigettato'),
    ('publicato', 'Publicato'),
    )
    author = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='resps')
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-publish',)
    def __str__(self):
        return self.body

class Comment(models.Model):
    STATUS_CHOICES = (
    ('rigettato', 'Rigettato'),
    ('publicato', 'Publicato'),
    )
    #tutorial=models.ForeignKey(Tutorial,related_name='all_comments',on_delete=models.CASCADE,null=True,blank=True)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250,unique_for_date='publish')
    author = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='blog_posts',null=True,blank=True)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='bozza')
    risposte=models.ForeignKey(Resp,related_name="risposte",on_delete=models.CASCADE,null=True,blank=True)
    def get_absolute_url(self):
        return reverse('blog:newPost',args=[self.publish.year,self.publish.month,self.publish.day, self.slug])
    class Meta:
        ordering = ('-publish',)
    def __str__(self):
        return self.title
