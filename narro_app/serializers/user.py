from collections import OrderedDict

from django.contrib.auth import get_user_model

from rest_framework import serializers

from narro_app.models import Profile
from narro_app.serializers.cosmetics import ProfileCardSerializer, SigilSerializer

UserModel = get_user_model()

class AppUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    
    def create(self, data):
        user = UserModel.objects.create_user(
            username = data['username'],
            password = data['password'],
            email = data['email']
        )

        return user

    def to_representation(self, instance):
        instance = super(AppUserSerializer, self).to_representation(instance)

        return {
            "Username": instance['username'],
            "UserID": instance['id'],
            "UserEmail": instance['email']
        }

    class Meta:
        model = UserModel
        fields = ("id", "username", "password", "email")

class AppUserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only = True)
    desc = serializers.CharField()
    hometown = serializers.CharField()
    birth_date = serializers.DateField()
    user = AppUserSerializer(read_only = True)
    current_profile_card = ProfileCardSerializer(read_only = True)
    current_sigil = SigilSerializer(read_only = True)
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            'id', 
            'desc', 
            'hometown', 
            'birth_date', 
            'user', 
            'current_profile_card',
            'current_sigil',
            'followers',
            'following'
        )

    def to_representation(self, instance):
        instance = super(AppUserProfileSerializer, self).to_representation(instance)

        user_dict = instance['user']
        profile_card_dict = instance['current_profile_card']
        sigil_dict = instance['current_sigil']
        
        bloguser_dict = {
            'ProfileID': instance['id'],
            'UserID': user_dict['UserID'],
            'Description': instance['desc'],
            'Hometown': instance['hometown'],
            'BirthDate': instance['birth_date'],
            'Username': user_dict['Username'],
            'UserEmail': user_dict['UserEmail'],
            'CurrentProfileCosmetics': {
                'CurrentProfileCard': profile_card_dict,
                'CurrentSigil': sigil_dict
            },            
            'Followers': instance['followers'],
            'Following': instance['following']
        }

        sorted_dict = OrderedDict()
        sorted_user_keys = sorted(bloguser_dict.keys())
        for key in sorted_user_keys:
            sorted_dict[key] = bloguser_dict[key]

        return sorted_dict

    def get_followers(self, obj):
        return obj.user.followers.count()

    def get_following(self, obj):
        return obj.user.following.count()