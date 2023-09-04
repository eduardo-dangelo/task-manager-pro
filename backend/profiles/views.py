from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer
from .models import Profile

# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)