# api/github/views.py
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.cache import cache  # Add this import
from .serializers import GitHubUserSerializer, GitHubRepoSerializer

@api_view(['GET'])
def get_github_user(request):
    cache_key = 'github_user_data'
    user_data = cache.get(cache_key)
    
    if not user_data:
        url = f"https://api.github.com/users/{settings.GITHUB_USERNAME}"
        headers = {
            "Authorization": f"token {settings.GITHUB_API_KEY}",
            "Accept": "application/vnd.github.v3+json",
        }
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            user_data = response.json()
            cache.set(cache_key, user_data, timeout=60*60)  # Cache for 1 hour
        else:
            return Response({"error": response.json()}, status=response.status_code)
    
    serializer = GitHubUserSerializer(user_data)
    return Response(serializer.data)

@api_view(['GET'])
def get_github_repos(request):
    cache_key = 'github_repos_data'
    repos_data = cache.get(cache_key)
    
    if not repos_data:
        url = f"https://api.github.com/users/{settings.GITHUB_USERNAME}/repos?per_page=100"
        headers = {
            "Authorization": f"token {settings.GITHUB_API_KEY}",
            "Accept": "application/vnd.github.v3+json",
        }
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            repos_data = response.json()
            sorted_repos = sorted(repos_data, key=lambda x: x.get('stargazers_count', 0), reverse=True)[:6]
            cache.set(cache_key, sorted_repos, timeout=60*60)  # Cache for 1 hour
        else:
            return Response({"error": response.json()}, status=response.status_code)
    
    serializer = GitHubRepoSerializer(repos_data, many=True)
    return Response(serializer.data)
