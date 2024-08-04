from django.shortcuts import render
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import NotFound

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .serializers import *
# Create your views here.

class get_post_usuario(APIView):
    #View para o Get e Post de usuarios
    def get(self, request):
        #Metodo Get
        #if not request.user.is_authenticated:
        #    return Response(status=status.HTTP_401_UNAUTHORIZED)
        usuarios = User.objects.all()
        serializer = usuario_serializer(usuarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

    def post(self, request):
        #Metodo Post
        #if not request.user.is_authenticated:
        #    return Response(status=status.HTTP_401_UNAUTHORIZED)
        data = request.data.copy()
        if 'password' in data:
            data['password'] = make_password(data['password'])
        serializer = usuario_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    

class get_put_delete_usuario(APIView):
    #View para os metodos Get Put e Delete de Usuario
    def get_objeto(self,request,id):
        #Metodo que recebe um id e verifica se existe um usuario com esse id e o retorna
        try:
            usuario = User.objects.get(id=id)
            return usuario
        except User.DoesNotExist:
            raise NotFound()
        
    def get(self, request,id):
        #Metodo Get
        #if not request.user.is_authenticated:
        #    return Response(status=status.HTTP_401_UNAUTHORIZED)
        usuario = self.get_objeto(request,id)
        serializer = usuario_serializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request,id):
        #Metodo Put
       #if not request.user.is_authenticated:
         #   return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        usuario = self.get_objeto(request,id)
        
        data = request.data.copy()
        if 'password' in data:
            data['password'] = make_password(data['password'])
        serializer = usuario_serializer(instance=usuario, data=data)
        if not serializer.is_valid():
            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    
    def delete(self,request,id):
        #Metodo Delete
        #if not request.user.is_autheticated:
        #    return Response(status=status.HTTP_401_UNAUTHORIZED)
        usuario = self.get_objeto(request,id)
        #if usuario.is_superuser:
        #    return Response(status=status.HTTP_401_UNAUTHORIZED)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

