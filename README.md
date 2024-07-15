



## Passo a passo


* Criar e ativar o ambiente virtual

```powershell
python -m venv venv
venv\Scripts\activate
```

* Instalar as Bibliotecas necessarias

```powershell
pip install django
pip install djangorestframework
pip install psycopg2
pip install psycopg2-binary
```


* Iniciar um Projeto Django

```powershell
django-admin startproject hapi
```


* Configuração do arquivo **settings.py**
```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "mydatabase",
        "USER": "mydatabaseuser",
        "PASSWORD": "mypassword",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```
