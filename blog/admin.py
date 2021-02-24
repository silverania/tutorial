from django.contrib import admin
from blog.models import Comment,Resp
# Register your models here.
class PostAdmin(admin.ModelAdmin):
    search_fields = ('title','body')
    list_filter = ('title','status','created', 'publish', 'author')
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)}
    list_display = ('author',)
    date_hierarchy = 'publish'
    ordering = ('status', 'publish')
class RespAdmin(admin.ModelAdmin):
    search_fields = ('commento','body')
    list_display = ( 'commento','body','created', 'publish', 'author')
    list_filter = ('created','commento','publish', 'author')
    date_hierarchy = 'publish'
    ordering = ('commento', 'publish')
admin.site.register(Resp,RespAdmin)
admin.site.register(Comment,PostAdmin)
