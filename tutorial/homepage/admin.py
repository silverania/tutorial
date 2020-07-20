from django.contrib import admin
from .models import Tutorial,Category
from user.models import Profile
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug','status')
    search_fields = ('title', 'slug','status')

class CategoryData(admin.ModelAdmin):
    filter_horizontal = ('user',)
    search_fields = ('title','created','updated')
    list_display = ('title','created','updated')
admin.site.register(Tutorial,PostAdmin)

admin.site.register(Category,CategoryData)
