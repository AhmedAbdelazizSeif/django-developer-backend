from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json

from .models import Project, Contact

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Save contact data to the database
        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )

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


def articles_view(request):
    """
    As before, if you want articles to come from your DB,
    you can create an Article model and query that as done above.
    Otherwise, keep them as example data or fetch from dev.to, etc.
    """
    data = [
        {
            "id": 1,
            "title": "How to Convert Next.js to React + Django",
            "url": "https://dev.to/article1",
            "description": "Step by step guide ...",
            "cover_image": "https://example.com/cover.png",
            "page_views_count": 120,
            "public_reactions_count": 4,
            "comments_count": 2
        },
        # ...
    ]
    return JsonResponse(data, safe=False)

def about_view(request):
    """
    About page content.
    """
    return JsonResponse({
                "title": "About Me",
                "story": """In 2019, a simple volunteer project introduced me to the intricacies of economic sectors, igniting a fascination with the stock market. My enthusiasm soon turned into action, but during Ramadan that year, a distracted, fasting me watched my investments in APPL stock crumble. The culprit? Hunger-induced impatience before iftar

That pivotal moment merged two of my passions: programming and problem-solving. I vowed to create a system that wouldn’t miss opportunities like I did. Fast forward to my graduation project—an AI-powered trading assistant that analyzed trends and made calculated decisions.

Yet, I realized something: Data science often works behind the scenes. I wanted my work to speak for itself, visually and impactfully. This drive led me to master Django, transforming my data-driven solutions into full-fledged backend systems.

Today, I craft intelligent systems that blend the precision of data science with the accessibility of user-friendly interfaces. With every project, I aim to make complex insights actionable, turning numbers into narratives that empower decisions.""",
                "connect": "Let’s connect—I’m always hungry for new challenges (post-iftar, of course)."
                })
