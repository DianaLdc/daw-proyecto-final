from django.urls import path
from . import views

app_name = 'adopciones'

urlpatterns = [
    path('', views.animal_list, name='animal_list'),
]