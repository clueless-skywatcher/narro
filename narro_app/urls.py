from django.urls import path
from django.urls.conf import include

from narro_app.views.api.cosmetics import *
from narro_app.views.api.post import *
from narro_app.views.api.user import *

urlpatterns = [
    path('api/v1/register', RegistrationAPIView.as_view()),
    path('api/v1/user/<str:username>/', UserViewSet.as_view({'get': 'retrieve'})),
    path('api/v1/user/<str:username>/profile_cards/', ShowUserProfileCardsView.as_view({'get': 'retrieve'})),
    path('api/v1/user/<str:username>/sigils/', ShowUserSigilsView.as_view({'get': 'retrieve'})),
    path('api/v1/admin/new_profile_card/', ProfileCardUploadView.as_view()),
    path('api/v1/post/create/', PostCreateView.as_view()),
    path('api/v1/posts/<str:username>/', PostListView.as_view()),
    path('api/v1/set_profile_card/', ChangeUserProfileCardView.as_view()),
    path('api/v1/set_sigil/', ChangeUserSigilView.as_view()),
    path('api/v1/post/<int:id>/', PostDetailView.as_view())
]