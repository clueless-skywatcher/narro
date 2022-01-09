from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from narro_app.models import Profile
from narro_app.serializers.user import AppUserSerializer, AppUserProfileSerializer

class RegistrationAPIView(CreateAPIView):
    model = get_user_model()
    permission_classes = [AllowAny]
    serializer_class = AppUserSerializer

class UserViewSet(ModelViewSet):
    serializer_class = AppUserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def retrieve(self, request, username = None):
        queryset = Profile.objects.filter(user__username = username)
        profile = get_object_or_404(queryset)
        serializer = AppUserProfileSerializer(profile, context = {"request": request})
        return Response(serializer.data)