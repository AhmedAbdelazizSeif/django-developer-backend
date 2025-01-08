# github/serializers.py
from rest_framework import serializers

class GitHubUserSerializer(serializers.Serializer):
    login = serializers.CharField()
    avatar_url = serializers.URLField()
    public_repos = serializers.IntegerField()
    followers = serializers.IntegerField()
    # Add other necessary fields

class GitHubRepoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    html_url = serializers.URLField()
    stargazers_count = serializers.IntegerField()
