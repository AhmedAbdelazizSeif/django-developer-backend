from django.db import migrations
import cloudinary.uploader

def migrate_to_cloudinary(apps, schema_editor):
    # Get models
    Project = apps.get_model('api', 'Project')
    Person = apps.get_model('api', 'Person')
    Article = apps.get_model('api', 'Article')
    Certificate = apps.get_model('api', 'Certificate')

    # Helper function to upload to cloudinary
    def upload_to_cloudinary(instance, field_name, folder):
        old_image = getattr(instance, field_name)
        if old_image:
            try:
                result = cloudinary.uploader.upload(
                    old_image.path,
                    folder=folder
                )
                return result['public_id']
            except Exception as e:
                print(f"Error uploading {field_name} for {instance}: {e}")
                return None
        return None

    # Migrate Projects
    for project in Project.objects.all():
        project.image = upload_to_cloudinary(project, 'image', 'projects')
        project.save()

    # Migrate Person
    for person in Person.objects.all():
        person.image = upload_to_cloudinary(person, 'image', 'person')
        person.save()

    # Migrate Articles
    for article in Article.objects.all():
        article.image = upload_to_cloudinary(article, 'image', 'articles')
        article.save()

    # Migrate Certificates
    for cert in Certificate.objects.all():
        cert.image = upload_to_cloudinary(cert, 'image', 'certificates')
        cert.small_image = upload_to_cloudinary(cert, 'small_image', 'certificates/small')
        cert.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_article_image_alter_certificate_image_and_more'),  # Replace with actual dependency
    ]

    operations = [
        migrations.RunPython(migrate_to_cloudinary),
    ]