from narro_app.serializers.user import AppUserSerializer

def jwt_response_handler(token, user = None, request = None):
    return {
        'Token': token,
        'UserObject': AppUserSerializer(user, context = {'request': request}).data
    }