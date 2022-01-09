from collections import OrderedDict

from rest_framework import serializers

from narro_app.models import BlogPost
from narro_app.serializers.user import AppUserSerializer

class BlogPostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only = True)
    title = serializers.CharField()
    content = serializers.CharField()
    post_date = serializers.DateTimeField()
    author = AppUserSerializer()
    votes = serializers.IntegerField()

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'content', 'post_date', 'author', 'votes')

    def to_representation(self, instance):
        return {
            'PostID': instance['id'],
            'PostTitle': instance['title'],
            'PostContent': instance['content'],
            'PostDate': instance['post_date'].isoformat(),
            'PostAuthor': instance['author'],
            'PostVotes': instance['votes']
        }