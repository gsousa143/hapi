from django import forms
from django.contrib.auth.models import User
from django.forms.widgets import *
from .models import *


class FormUsuario(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username','password','first_name','last_name','email']
        widgets = {'password': PasswordInput(),'email':EmailInput()}
    def __init__ (self, *args , **kwargs):
        super().__init__(*args , **kwargs)
        self.fields['username'].widget.attrs.update({'required':'True','placeholder':'','class':'col form-control my-2 p-2','autocomplete':'new-password'})
        self.fields['password'].widget.attrs.update({'required':'True','placeholder':'','class':'col form-control my-2 p-2','autocomplete':'new-password'})
        self.fields['first_name'].widget.attrs.update({'required':'True','placeholder':'','class':'col form-control my-2 p-2','autocomplete':'new-password'})
        self.fields['last_name'].widget.attrs.update({'required':'True','placeholder':'','class':'col form-control my-2 p-2','autocomplete':'new-password'})
        self.fields['email'].widget.attrs.update({'required':'True','placeholder':'','class':'col form-control my-2 p-2','autocomplete':'new-password'})