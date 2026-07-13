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
    path('alertas/', views.panel_alertas, name='panel_alertas'),
    path('alertas/', views.panel_alertas, name='panel_alertas'),
    path('registro-paciente/', views.registro_paciente, name='registro_paciente'),
    path('<int:pk>/adoptar/', views.solicitud_adopcion, name='solicitud_adopcion'),
    path('casos-exito/', views.casos_exito, name='casos_exito'),
    path('dashboard/', views.dashboard, name='dashboard'),
]