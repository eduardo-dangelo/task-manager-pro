"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from task_manager import views
from django.urls import path, include
from rest_framework import routers
from accounts.api import RegisterAPI
from profiles.views import ProfileViewSet

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet, 'project')
router.register(r'okrs', views.OkrViewSet, 'okr')
router.register(r'tasks', views.TaskViewSet, 'task')
router.register(r'sprints', views.SprintViewSet, 'sprints')
router.register(r'checklists', views.ChecklistViewSet, 'checklists')
router.register(r'notes', views.NoteViewSet, 'notes')
router.register(r'profiles', ProfileViewSet, 'profile')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('accounts.urls')),
]
