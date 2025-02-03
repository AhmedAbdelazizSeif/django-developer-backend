from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import requests
import json

from .models import Project, Contact, Article, Person, Certificate

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Save contact data to the database
        contact = Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )

        contact.save()



        return JsonResponse({"msg": "Success"}, status=201)
    return JsonResponse({"msg": "Only POST allowed."}, status=405)


def projects_view(request):
    """
    Instead of returning in-memory data,
    we now query the Project model and serialize.
    """
    projects = Project.objects.all().order_by('id')  # or any ordering you prefer
    result = []
    for project in projects:
        result.append({
            "id": project.id,
            "name": project.name,
            'image': project.image.url if project.image else None,
            "description": project.description,
            "tags": project.tag_list(),  # convert comma-separated to a list
            "source_code": project.source_code,
            "demo": project.demo
        })
    return JsonResponse(result, safe=False)

def get_person(request):
    """
    Return the person's info.
    """
    person = Person.objects.all().first()
    result = {
        "name": person.name,
        "age": person.age,
        "title": person.title,
        "story": person.story,
        "connect": person.connect,
        "email": person.email,
        "phone_number": person.phone_number,
        "github": person.github,
        "linkedin": person.linkedin,
        "image": person.image.url if person.image else None,
    }
    return result

def person_view(request):
    """
    Return the person's info.
    """
    person = get_person(request)
    name = person['name']
    title = person['title']
    image = person['image']
    return JsonResponse({
        "name": name,
        "title": title,
        "image": image,
    }, safe=False)

def articles_view(request):
    """
    Return a list of all articles with minimal info 
    (enough for the cards). 
    """
    articles = Article.objects.all().order_by('id')
    
    result = []
    for article in articles:
        result.append({
            "id": article.id,
            "name": article.name,
            "name_ara": article.name_ara,
            "image": article.image.url if article.image else None,
            "description": article.description,  # might be truncated on frontend
            "description_ara": article.description_ara, 
            "created_at": article.created_at.isoformat(),
        })
    
    return JsonResponse(result, safe=False)


def article_detail_view(request, article_id):
    """
    Return the full details for a single article.
    """
    try:
        article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return JsonResponse({'error': 'Article not found'}, status=404)

    result = {
        "id": article.id,
        "name": article.name,
        "name_ara": article.name_ara,
        "image": article.image.url if article.image else None,
        "description": article.description,
        "description_ara": article.description_ara,
        "created_at": article.created_at.isoformat("#", "hours"),
    }
    return JsonResponse(result, safe=False)

def about_view(request):
    """
    About page content.
    """
    person = get_person(request)
    story = person['story']
    connect = person['connect']
    return JsonResponse({
                "title": "About Me",
                "story": story,
                "connect": connect,
                },
                safe=True)

import datetime
def get_certificates(request):
    """
    Return the certificates.
    """
    certificates = Certificate.objects.all().order_by('id')
    result = []
    for certificate in certificates:
        result.append({
            "id": certificate.id,
            "title": certificate.title,
            "acquired_at": datetime.datetime.strftime(certificate.acquired_at, "%B %Y"),
            "expires_at": datetime.datetime.strftime(certificate.expires_at, "%B %Y") if certificate.expires_at else None,
            "image": ertificate.image.url if certificate.image else None,
            "provider": certificate.provider,
            "provider_url": certificate.provider_url,
            "small_image": certificate.small_image.url if certificate.small_image else None,
            "cert_url": certificate.cert_url,
        })
    return JsonResponse(result, safe=False)




def project_extended_view(request, project_name):
    """
    Return the extended description of a project.
    """
    project_name = project_name.replace('-', ' ')
    project = get_object_or_404(Project, name=project_name)
    result = {
        "name": project.name,
        'image': project.image.url if project.image else None,
        "extended_description": project.extended_description,
        'source_code': project.source_code,
        'skills': project.tag_list(),
    }
    return JsonResponse({"project": result}, safe=True)

def get_contact_info(request):
    """
    Return the contact info.
    """
    person = get_person(request)
    return JsonResponse({
        "email": person['email'],
        "phone_number": person['phone_number'],
        "github": person['github'],
        "linkedin": person['linkedin'],
    }, safe=True)

