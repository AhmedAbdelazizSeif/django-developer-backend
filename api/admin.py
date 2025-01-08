from django.contrib import admin
from .models import Project, Contact, Person, Article

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'image', 'tags', 'source_code', 'demo')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'title', 'story', 'connect', 'email', 'phone_number', 'github', 'linkedin', 'image')

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_ara', 'image', 'description', 'description_ara', 'created_at')