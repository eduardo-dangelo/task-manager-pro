from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer, OkrSerializer, SprintSerializer, TaskSerializer, ChecklistSerializer, NoteSerializer
from .models import Project, Okr, Sprint, Task, Checklist, Note


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.projects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class OkrViewSet(viewsets.ModelViewSet):
    queryset = Okr.objects.all()
    serializer_class = OkrSerializer


class SprintViewSet(viewsets.ModelViewSet):
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class ChecklistViewSet(viewsets.ModelViewSet):
    queryset = Checklist.objects.all()
    serializer_class = ChecklistSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [
        permissions.AllowAny
    ]
