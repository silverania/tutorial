from django.contrib import admin
from .models import Tutorial,User,Category
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'publish','status')
    search_fields = ('title', 'slug', 'publish','status')
class UserData(admin.ModelAdmin):
    search_fields = ('first_name', 'last_name','email','users')
    list_display = ('first_name', 'last_name','email','users')
class CategoryData(admin.ModelAdmin):
    filter_horizontal = ('user',)
    search_fields = ('title','created','updated')
    list_display = ('title','created','updated')
admin.site.register(Tutorial,PostAdmin)
admin.site.register(User,UserData)
admin.site.register(Category,CategoryData)
