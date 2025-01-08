from django.urls import path
from .views import (
    contact_view, 
    projects_view, 
    articles_view, 
    about_view, 
    project_extended_view,
    article_detail_view,
    get_contact_info,
    person_view,
)

urlpatterns = [
    path('get_person', person_view, name='person'),
    path('contact', contact_view, name='contact'),
    path('get_contact_info', get_contact_info, name='get_contact_info'),
    path('projects', projects_view, name='projects'),
    path('projects/<str:project_name>', project_extended_view, name='project_extended'),
    path('articles', articles_view, name='articles'),
    path('articles/<int:article_id>', article_detail_view, name='article_detail'),
    path('about', about_view, name='about'),
]
