from rest_framework import serializers
from django.contrib.auth.models import User, Group

class usuario_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','first_name','last_name','email']
