from django.urls import path
from . import views

app_name = 'adopciones'

urlpatterns = [
    path('', views.animal_list, name='animal_list'),
    path('<int:pk>/', views.animal_detail, name='animal_detail'),
    path('crear/', views.animal_create, name='animal_create'),
    path('<int:pk>/editar/', views.animal_update, name='animal_update'),
    path('<int:pk>/borrar/', views.animal_delete, name='animal_delete'),
    path('api/', views.animal_api, name='animal_api'),
]