from django.db import models
from ckeditor.fields import RichTextField

class Project(models.Model):
    """
    Example fields for a project.
    Adjust the max_length, blank, null, etc. as needed.
    """
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='projects', blank=True, null=True)
    description = models.TextField(blank=True)
    # We'll store tags as a comma-separated string for simplicity
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags")
    source_code = models.URLField(blank=True, null=True)
    demo = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

    def tag_list(self):
        """
        Utility method to turn comma-separated tags into a Python list.
        e.g. "next,node,mongodb" -> ["next","node","mongodb"]
        """
        if not self.tags:
            return []
        return [tag.strip() for tag in self.tags.split(",")]


class Contact(models.Model):
    """
    Stores each contact submission.
    """
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contact from {self.name} <{self.email}>"

class Person(models.Model):
    name = models.CharField(max_length=100,null=True)
    age = models.IntegerField(null=True)
    title = models.CharField(max_length=100,null=True)
    story = RichTextField(null=True)  # Check if you need to migrate to CKEditor 5
    connect = models.CharField(max_length=150, default="Not specified",null=True)  # Added default value
    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=15,null=True)
    github = models.URLField(null=True)
    linkedin = models.URLField(null=True)
    
    image = models.ImageField(upload_to='person', blank=True, null=True)

    def __str__(self):
        return self.name
