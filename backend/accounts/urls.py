from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, UserUpdateView
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/users', UserUpdateView.as_view(), name='update-user'),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]