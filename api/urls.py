from django.urls import path
from .views import contact_view, projects_view, articles_view, about_view, project_extended_view

urlpatterns = [
    path('contact', contact_view, name='contact'),
    path('projects', projects_view, name='projects'),
    path('projects/<str:project_name>', project_extended_view, name='project_extended'),
    path('articles', articles_view, name='articles'),
    path('about', about_view, name='about'),
    
]
