from rest_framework import serializers

from narro_app.models import ProfileCard, Sigil

class ProfileCardSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only = True)
    name = serializers.CharField()
    img = serializers.ImageField()
    img_url = serializers.SerializerMethodField('get_img_url')

    def to_representation(self, instance):
        instance = super(ProfileCardSerializer, self).to_representation(instance)

        return {
            "ProfCardID": instance['id'],
            "ProfCardName": instance['name'],
            "ProfCardImgURL": instance['img_url']
        }

    def get_img_url(self, obj):
        request = self.context["request"]
        return request.build_absolute_uri(obj.img.url)
        
    class Meta:
        model = ProfileCard
        fields = ('id', 'name', 'img_url', 'img')

class SigilSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only = True)
    name = serializers.CharField()
    img_url = serializers.SerializerMethodField('get_img_url')

    def to_representation(self, instance):
        instance = super(SigilSerializer, self).to_representation(instance)

        return {
            "SigilID": instance['id'],
            "SigilName": instance['name'],
            "SigilImgURL": instance['img_url']
        }

    def get_img_url(self, obj):
        request = self.context["request"]
        return request.build_absolute_uri(obj.img.url)

    class Meta:
        model = Sigil
        fields = ('id', 'name', 'img_url')