# Portfolio API Backend (Django)

A Django REST backend powering a personal portfolio: projects, extended project details, articles (multi‑language fields), certificates, about/profile info, and contact submissions with Cloudinary media storage, CKEditor 5 rich text, throttled public endpoints, and GitHub API integration.

## ✨ Features
- Projects list + extended project description endpoint
- Articles list + detail (supports English & Arabic fields)
- Certificates with acquisition / expiry dates
- Person (profile) + About + Contact info endpoints
- Contact form persistence
- Rich text via CKEditor 5 (custom toolbar config)
- Cloudinary-hosted images (projects, person, articles, certificates) `To be replaced if you use another CDN`
- CORS enabled (all origins by default)
- Rate limiting (Anon/User throttles)
- Environment driven configuration (12‑factor ready)
- Procfile for easy PaaS deploy (e.g. Render / Railway / Heroku)

## 🗂 Tech Stack
Django 5, Django REST Framework, Cloudinary Storage, CKEditor 5, dj-database-url, CORS Headers, dotenv.

## 📦 Directory Highlights
| Directory/File | Description |
|----------------|-------------|
| `backend/` | Django project settings & root urls |
| `api/` | Core app (models, views, urls) + github sub-app (future use) |
| `public/` | Media root (served via MEDIA_URL) if not on Cloudinary |
| `staticfiles/` | Collected static assets (Whitenoise ready) |
| `Procfile` | WSGI entry for dyno/server |
| `requirements.txt` | Python dependencies |

## 🔐 Required Environment Variables
Create a `.env` file in the project root (same level as `manage.py`). All of these must be set before Django starts (settings.py raises if GitHub vars missing):
```
DJANGO_SECRET_KEY=replace-with-strong-secret
DEBUG=True  # Set False in production
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

# GitHub (if used by github app/views consuming API)
GITHUB_USERNAME=your-github-username
GITHUB_API_KEY=ghp_xxxxxxxxxxxxxxxxxxxxx

# Cloudinary credentials
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
# OR set individually if you adapt settings:
# CLOUDINARY_CLOUD_NAME=<cloud_name>
# CLOUDINARY_API_KEY=<api_key>
# CLOUDINARY_API_SECRET=<api_secret>
```
Replace placeholders with real values. For production add your domain(s) to `DJANGO_ALLOWED_HOSTS`.

> Note: Current `settings.py` hardcodes `cloudinary.config(...)` with placeholders. Update it to read from env (recommended) or replace the inline `<cloudinary-*>` values.

## 🧪 Local Setup (Windows PowerShell)
```powershell
# 1. (Optional) Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create .env from template
copy .env.example .env  # (If you create an example file) or manually create

# 4. Apply migrations
python manage.py migrate

# 5. Create superuser to have access to add data through out admin panel and access to user (get_person functionality)
python manage.py createsuperuser

# 6. Run development server
python manage.py runserver
```
Visit: http://127.0.0.1:8000/admin/ for admin, or API endpoints under `/api/` (see below).

## 🌐 API Endpoints (GET unless noted)
Base path may be `/api/` depending on `backend/urls.py` (adjust if mounted differently):
```
GET  /api/get_person                -> minimal person (name, title, image)
GET  /api/projects                  -> list projects
GET  /api/projects/<name>           -> extended project (rich description, skills)
GET  /api/articles                  -> list articles
GET  /api/articles/<id>             -> article detail
GET  /api/about                     -> about/story/connect text
GET  /api/certificates              -> list certificates
GET  /api/get_contact_info          -> contact channels (email, phone, github, linkedin)
POST /api/contact                   -> submit contact form (name,email,subject,message)
```
Response objects include Cloudinary URLs where images are present.

## 🖼 Media & Static
- CloudinaryField stores references remotely; no manual upload code needed.
- `MEDIA_URL=/public/` and `MEDIA_ROOT=public/` used only if local files (mostly empty when Cloudinary used).
- Collect static for production: `python manage.py collectstatic`.

## 🚀 Production Notes
- Set `DEBUG=False`.
- Provide a strong `DJANGO_SECRET_KEY`.
- Use a real database (set `DATABASE_URL` env: Postgres/MySQL) — `dj-database-url` will auto-configure.
- Run `python manage.py collectstatic` and serve via Whitenoise (already in middleware) or CDN.
- Ensure Cloudinary credentials are valid; remove any hardcoded placeholders.
- Add allowed hosts: `DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com`.
- Use gunicorn (Procfile) in your platform or `uvicorn` ASGI variant if adapting to async.

### Example Procfile (already present)
```
web: gunicorn backend.wsgi --log-file -
```
(Install `gunicorn` if deploying to Linux; for Windows dev you can stay with `runserver`.)

## 🔄 Migrations
Any model changes ->
```powershell
python manage.py makemigrations
python manage.py migrate
```

## 🧩 CKEditor 5
Configured toolbars in `settings.py` (`CKEDITOR_5_CONFIGS`). File upload permission constant: `CKEDITOR_5_FILE_UPLOAD_PERMISSION` (modify to adjust upload access).

## ♻ Rate Limiting
Configured in `REST_FRAMEWORK` as `100/day` anonymous and `1000/day` authenticated. Adjust in `settings.py` as needed.

## ✅ Health Checklist Before Deploy
- [ ] `.env` created & secrets set
- [ ] `DEBUG=False`
- [ ] `ALLOWED_HOSTS` includes production domains
- [ ] Database URL configured (if not SQLite)
- [ ] Migrations applied
- [ ] Static collected
- [ ] Cloudinary credentials valid

## 🛠 Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| ValueError: GITHUB_* must be set | Missing env vars | Add to `.env` then restart server |
| 400 Bad Request host header | ALLOWED_HOSTS empty | Add host/domain to `DJANGO_ALLOWED_HOSTS` |
| Images not showing | Cloudinary config placeholders | Replace with real credentials |
| CKEditor toolbar missing buttons | Wrong config name | Ensure `config_name='extends'` where needed |

## 🔧 Optional Improvement Ideas
- Convert cloudinary inline config to env-based
- Add automated tests in `api/tests.py`
- Add pagination for large lists

## 📄 License
Apache License 2.0

