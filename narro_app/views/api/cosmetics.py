import operator

from rest_framework.decorators import parser_classes, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status

from narro_app.models import ProfileCardGallery, SigilGallery
from narro_app.serializers.cosmetics import ProfileCardSerializer, SigilSerializer
from narro_app.utils.build_response import BuildMessageResponse
from narro_app.utils.status_enums import StatusCodes

class ProfileCardUploadView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format = None):
        serializer = ProfileCardSerializer(data = request.data, context = {'request': request})
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(BuildMessageResponse(
            StatusCodes.HTTP_400_BAD_REQUEST.name,
            StatusCodes.HTTP_400_BAD_REQUEST.value,
            str(serializer.errors),
            False
        ).build(), status = status.HTTP_400_BAD_REQUEST)

class ShowUserProfileCardsView(ViewSet):
    def retrieve(self, request, username = None):
        # if username != request.user.username:
        #     return Response(BuildMessageResponse(
        #         StatusCodes.HTTP_401_UNAUTHORIZED.name,
        #         StatusCodes.HTTP_401_UNAUTHORIZED.value,
        #         "User is not authorized to access this page",
        #         False
        #     ).build(), status = status.HTTP_401_UNAUTHORIZED)

        profile_cards = ProfileCardGallery.objects.filter(
            user__user__username = username
        )
        
        card_list = []
        for x in profile_cards:
            card_list.append(
                ProfileCardSerializer(
                    x.profile_card, context = {"request": request}
                ).data
            )

        return Response(sorted(card_list, key = lambda i: i['ProfCardName']))

class ShowUserSigilsView(ViewSet):
    def retrieve(self, request, username = None):
        # if username != request.user.username:
        #     return Response(BuildMessageResponse(
        #         StatusCodes.HTTP_401_UNAUTHORIZED.name,
        #         StatusCodes.HTTP_401_UNAUTHORIZED.value,
        #         "User is not authorized to access this page",
        #         False
        #     ).build(), status = status.HTTP_401_UNAUTHORIZED)

        sigils = SigilGallery.objects.filter(
            user__user__username = username
        )
        
        sigil_list = []
        for x in sigils:
            sigil_list.append(
                SigilSerializer(
                    x.sigil, context = {"request": request}
                ).data
            )

        return Response(sorted(sigil_list, key = lambda i: i['SigilName']))