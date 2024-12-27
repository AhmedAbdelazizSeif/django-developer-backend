from django.urls import path
from .views import contact_view, projects_view, articles_view, about_view

urlpatterns = [
    path('contact', contact_view, name='contact'),
    path('projects', projects_view, name='projects'),
    path('articles', articles_view, name='articles'),
    path('about', about_view, name='about'),

]
