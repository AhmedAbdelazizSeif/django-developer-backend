# github/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.get_github_user, name='get_github_user'),
    path('repos/', views.get_github_repos, name='get_github_repos'),
]
