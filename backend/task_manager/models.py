from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
STATUS = [
    ('IN', 'initiated'),
    ('IP', 'in progress'),
    ('PK', 'inactive'),
    ('BK', 'blocked'),
    ('CP', 'completed'),
    ('CC', 'canceled'),
]


class Project(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField('created at', default=timezone.now)
    status = models.CharField(max_length=2, choices=STATUS, default="IN")
    owner = models.ForeignKey(User, related_name="projects", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title


class Okr(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField('created at', default=timezone.now)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    status =  models.CharField(max_length=2, choices=STATUS, default="IN")

    def __str__(self):
        return self.title


class Sprint(models.Model):
    title = models.CharField(max_length=300)
    created_at = models.DateTimeField('created at', default=timezone.now)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    result = models.TextField(null=True, blank=True)
    status =  models.CharField(max_length=2, choices=STATUS, default="IN")

    def __str__(self):
        return self.title


class Task(models.Model):
    title = models.CharField(max_length=120)
    created_at = models.DateTimeField('created at', default=timezone.now)
    description = models.TextField(null=True, blank=True)
    okr = models.ForeignKey(Okr, on_delete=models.CASCADE)
    sprint = models.ForeignKey(Sprint, on_delete=models.CASCADE, null=True, blank=True)
    status =  models.CharField(max_length=2, choices=STATUS, default="IN")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.title


class Checklist(models.Model):
    title = models.CharField(max_length=300)
    created_at = models.DateTimeField('created at', default=timezone.now)
    completed = models.BooleanField(default=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Note(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField('created at', default=timezone.now)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.content