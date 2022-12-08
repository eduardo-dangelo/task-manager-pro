from rest_framework import serializers
from .models import Project, Okr, Note, Task, Checklist, Sprint


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'created_at', 'status')


class OkrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Okr
        fields = ('id', 'title', 'description','created_at', 'status', 'project')


class SprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = ('id', 'title', 'result','created_at', 'status', 'project,' 'results')


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'created_at', 'status', 'project,' 'sprint')


class ChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checklist
        fields = ('id', 'title', 'completed', 'created_at', 'task')


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'content', 'project', 'created_at', 'task')

