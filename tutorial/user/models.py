from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User



class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    #post=models.ForeignKey('blog.Comment',related_name="commenti",blank=True,null=True,on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    photo = models.ImageField(default="settings.MEDIA_URL+str('images/user-secret-solid.svg')",upload_to='users/%Y/%m/%d/',blank=True,null=True)
    username=models.CharField(max_length=80)
    def __str__(self):
        return '{}'.format(self.user.username)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance,username=str(instance.username))
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
