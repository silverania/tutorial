from django.contrib import admin
from blog.models import Comment
# Register your models here.
@admin.register(Comment)
class PostAdmin(admin.ModelAdmin):
    search_fields = ('title','body')
    list_display = ('title','status','slug', 'created', 'publish', 'author')
    list_filter = ('status', 'created', 'publish', 'author')
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)}
    raw_id_fields = ('author',)
    date_hierarchy = 'publish'
    ordering = ('status', 'publish')
