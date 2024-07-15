from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.contrib.auth.hashers import make_password

from .models import *
from .forms import *

# Create your views here.
def home(request):
    if  request.user.is_authenticated:
        form = FormUsuario(instance=request.user)
    else:
        form = FormUsuario()
    contexto = {"form":form}
    return render(request,"home.html",contexto)


def login (request):
    if request.method == "POST":
        user = authenticate(username=request.POST.get('username'),
                            password=request.POST.get('password'))
        if user:
            auth_login(request,user)
    return HttpResponseRedirect(reverse('home'))

def logout (request):
    auth_logout(request)
    return HttpResponseRedirect(reverse('home'))


def cadastro(request):
    if request.method=="POST":
        form = FormUsuario(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.password = make_password(form.password)
            form.save()
            return HttpResponseRedirect(reverse("home"))

    form = FormUsuario()
    contexto = {"form":form}
    return render(request,"cadastro.html",contexto)


def editar_perfil(request):
    if request.method == "POST":
        usuario = User.objects.get(id = request.user.id)
        novo_usuario = request.POST.copy()
        novo_usuario["password"] = usuario.password
        form = FormUsuario(instance=usuario,data=novo_usuario)
        if form.is_valid:
            form.save()
    return HttpResponseRedirect(reverse('home'))