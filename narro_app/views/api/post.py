from datetime import datetime as DateTime

from rest_framework.decorators import permission_classes
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from narro_app.models import BlogPost, ProfileCard, ProfileCardGallery, Sigil, SigilGallery
from narro_app.serializers.cosmetics import ProfileCardSerializer, SigilSerializer
from narro_app.serializers.post import BlogPostSerializer
from narro_app.serializers.user import AppUserProfileSerializer, AppUserSerializer

class PostCreateView(CreateAPIView):
    model = BlogPost
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        pass

class PostListView(ListCreateAPIView):
    def list(self, request, username = None):
        queryset = BlogPost.objects.filter(author__username = username).values(
            'id', 
            'title', 
            'content', 
            'post_date', 
            'author', 
            'votes',
            'author__username',
            'author__profile__current_profile_card',
            'author__profile__current_sigil'
        )

        post_details = []

        for query in queryset:
            post_detail = BlogPostSerializer(query).data
            user_detail = {
                "UserName": query['author__username'],
                "UserProfileCard": ProfileCardSerializer(
                    ProfileCard.objects.filter(
                        id = query['author__profile__current_profile_card']
                    ).first(), 
                    context = {
                        'request': request
                    }
                ).data,
                "UserSigil": SigilSerializer(
                    Sigil.objects.filter(
                        id = query['author__profile__current_sigil']
                    ).first(), 
                    context = {
                        'request': request
                    }
                ).data
            }

            post_detail["Author"] = user_detail
            post_details.append(post_detail)

        return Response(post_details)

class ChangeUserProfileCardView(APIView):
    def post(self, request):
        profile_card = request.data['ProfCard']
        user = request.data['User']

        profile_card_mapping = ProfileCardGallery.objects.filter(
            user__user__username = user,
            profile_card__name = profile_card
        ).first()

        if not profile_card_mapping:
            return Response({
                "Error": status.HTTP_400_BAD_REQUEST,
                "Message": f"User {user} does not have any profile card named: {profile_card}",
                "Success": False
            }, status = status.HTTP_400_BAD_REQUEST)

        profile_card_mapping.user.current_profile_card = profile_card_mapping.profile_card
        profile_card_mapping.user.save()

        return Response({
            "UserProfile": AppUserProfileSerializer(
                profile_card_mapping.user,
                context = {"request": request}
            ).data
        })

class ChangeUserSigilView(APIView):
    def post(self, request):
        sigil = request.data['Sigil']
        user = request.data['User']

        sigil_mapping = SigilGallery.objects.filter(
            user__user__username = user,
            sigil__name = sigil
        ).first()

        if not sigil_mapping:
            return Response({
                "Error": status.HTTP_400_BAD_REQUEST,
                "Message": f"User {user} does not have any sigil named: {sigil}",
                "Success": False
            }, status = status.HTTP_400_BAD_REQUEST)

        sigil_mapping.user.current_sigil = sigil_mapping.sigil
        sigil_mapping.user.save()

        return Response({
            "UserProfile": AppUserProfileSerializer(
                sigil_mapping.user,
                context = {"request": request}
            ).data
        })

class PostDetailView(APIView):
    def get(self, request, id = None):
        queryset = BlogPost.objects.filter(id = id).values(
            'id', 
            'title', 
            'content', 
            'post_date', 
            'author', 
            'votes',
            'author__username',
            'author__profile__current_profile_card',
            'author__profile__current_sigil'
        )[0]
        # import pdb
        # pdb.set_trace()
        if not queryset:
            return Response({
                "Error": status.HTTP_404_NOT_FOUND,
                "Message": f"Post with id: {id} does not exist",
                "Success": False
            }, status = status.HTTP_404_NOT_FOUND)

        post_detail = BlogPostSerializer(queryset).data
        user_detail = {
            "UserName": queryset['author__username'],
            "UserProfileCard": ProfileCardSerializer(
                ProfileCard.objects.filter(
                    id = queryset['author__profile__current_profile_card']
                ).first(), 
                context = {
                    'request': request
                }
            ).data,
            "UserSigil": SigilSerializer(
                Sigil.objects.filter(
                    id = queryset['author__profile__current_sigil']
                ).first(), 
                context = {
                    'request': request
                }
            ).data
        }

        post_detail["Author"] = user_detail
        return Response(post_detail)