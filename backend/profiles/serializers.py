from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'profile_picture', 'theme', 'marketing_preference', 'bio')