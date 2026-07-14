from django.shortcuts import render, get_object_or_404, redirect
from .models import Animal
from .forms import AnimalForm
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required, user_passes_test
from django.views.decorators.csrf import csrf_exempt
import json

def animal_list(request):
    animales = Animal.objects.all()
    return render(request, 'adopciones/animal_list.html', {'animales': animales})

def animal_detail(request, pk):
    animal = get_object_or_404(Animal, pk=pk)
    return render(request, 'adopciones/animal_detail.html', {'animal': animal})

def animal_delete(request, pk):
    animal = get_object_or_404(Animal, pk=pk)
    if request.method == 'POST':
        animal.delete()
        return redirect('adopciones:animal_list')
    return render(request, 'adopciones/animal_confirm_delete.html', {'animal': animal})

def animal_create(request):
    if request.method == 'POST':
        form = AnimalForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('adopciones:animal_list')
    else:
        form = AnimalForm()
    return render(request, 'adopciones/animal_form.html', {'form': form})

def animal_update(request, pk):
    animal = get_object_or_404(Animal, pk=pk)
    if request.method == 'POST':
        form = AnimalForm(request.POST, request.FILES, instance=animal)
        if form.is_valid():
            form.save()
            return redirect('adopciones:animal_list')
    else:
        form = AnimalForm(instance=animal)
    return render(request, 'adopciones/animal_form.html', {'form': form})

def animal_api(request):
    animales = Animal.objects.all()
    data = []
    for animal in animales:
        data.append({
            'id': animal.id,
            'nombre': animal.nombre,
            'especie': animal.especie,
            'raza': animal.raza,
            'edad': animal.edad,
            'descripcion': animal.descripcion,
            'estado': animal.estado,
            'foto': request.build_absolute_uri(animal.foto.url) if animal.foto else None,
        })
    return JsonResponse(data, safe=False)

    from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required, user_passes_test
from django.views.decorators.csrf import csrf_exempt
import json

# ==================== AUTENTICACION ====================

@csrf_exempt
def api_registro(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'El usuario ya existe'}, status=400)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return JsonResponse({'mensaje': 'Usuario creado correctamente', 'id': user.id}, status=201)

    return JsonResponse({'error': 'Metodo no permitido'}, status=405)


@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({
                'mensaje': 'Login exitoso',
                'username': user.username,
                'email': user.email,
                'es_admin': user.is_staff
            })
        else:
            return JsonResponse({'error': 'Credenciales incorrectas'}, status=401)

    return JsonResponse({'error': 'Metodo no permitido'}, status=405)


@csrf_exempt
def api_logout(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'mensaje': 'Sesion cerrada correctamente'})
    return JsonResponse({'error': 'Metodo no permitido'}, status=405)


def es_admin(user):
    return user.is_staff

# ==================== CRUD CITAS ====================

@login_required
@user_passes_test(es_admin)
def cita_list(request):
    from .models import Cita
    citas = Cita.objects.all()
    return render(request, 'adopciones/cita_list.html', {'citas': citas})

@login_required
@user_passes_test(es_admin)
def cita_create(request):
    from .models import Cita
    from .forms import CitaForm
    if request.method == 'POST':
        form = CitaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('adopciones:cita_list')
    else:
        form = CitaForm()
    return render(request, 'adopciones/cita_form.html', {'form': form})

@login_required
@user_passes_test(es_admin)
def cita_update(request, pk):
    from .models import Cita
    from .forms import CitaForm
    cita = get_object_or_404(Cita, pk=pk)
    if request.method == 'POST':
        form = CitaForm(request.POST, instance=cita)
        if form.is_valid():
            form.save()
            return redirect('adopciones:cita_list')
    else:
        form = CitaForm(instance=cita)
    return render(request, 'adopciones/cita_form.html', {'form': form})

@login_required
@user_passes_test(es_admin)
def cita_delete(request, pk):
    from .models import Cita
    cita = get_object_or_404(Cita, pk=pk)
    if request.method == 'POST':
        cita.delete()
        return redirect('adopciones:cita_list')
    return render(request, 'adopciones/cita_confirm_delete.html', {'cita': cita})

# ==================== CRUD VACUNAS ====================

@login_required
@user_passes_test(es_admin)
def vacuna_list(request):
    from .models import Vacuna
    vacunas = Vacuna.objects.all()
    return render(request, 'adopciones/vacuna_list.html', {'vacunas': vacunas})

@login_required
@user_passes_test(es_admin)
def vacuna_create(request):
    from .models import Vacuna
    from .forms import VacunaForm
    if request.method == 'POST':
        form = VacunaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('adopciones:vacuna_list')
    else:
        form = VacunaForm()
    return render(request, 'adopciones/vacuna_form.html', {'form': form})

@login_required
@user_passes_test(es_admin)
def vacuna_update(request, pk):
    from .models import Vacuna
    from .forms import VacunaForm
    vacuna = get_object_or_404(Vacuna, pk=pk)
    if request.method == 'POST':
        form = VacunaForm(request.POST, instance=vacuna)
        if form.is_valid():
            form.save()
            return redirect('adopciones:vacuna_list')
    else:
        form = VacunaForm(instance=vacuna)
    return render(request, 'adopciones/vacuna_form.html', {'form': form})

@login_required
@user_passes_test(es_admin)
def vacuna_delete(request, pk):
    from .models import Vacuna
    vacuna = get_object_or_404(Vacuna, pk=pk)
    if request.method == 'POST':
        vacuna.delete()
        return redirect('adopciones:vacuna_list')
    return render(request, 'adopciones/vacuna_confirm_delete.html', {'vacuna': vacuna})

# ==================== APIs JSON ====================

@csrf_exempt
def api_citas(request):
    from .models import Cita
    if request.method == 'GET':
        citas = Cita.objects.all()
        data = []
        for cita in citas:
            data.append({
                'id': cita.id,
                'fecha': str(cita.fecha),
                'hora': str(cita.hora),
                'motivo': cita.motivo,
                'estado': cita.estado,
                'animal': cita.animal.nombre,
                'veterinario': cita.veterinario.nombre,
            })
        return JsonResponse(data, safe=False)

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'No autenticado'}, status=401)
        data = json.loads(request.body)
        from .models import Cita, Animal, Veterinario
        cita = Cita.objects.create(
            fecha=data.get('fecha'),
            hora=data.get('hora'),
            motivo=data.get('motivo'),
            animal=get_object_or_404(Animal, pk=data.get('animal_id')),
            veterinario=get_object_or_404(Veterinario, pk=data.get('veterinario_id')),
        )
        return JsonResponse({'mensaje': 'Cita creada', 'id': cita.id}, status=201)

    return JsonResponse({'error': 'Metodo no permitido'}, status=405)


@csrf_exempt
def api_vacunas(request):
    from .models import Vacuna
    vacunas = Vacuna.objects.all()
    data = []
    for v in vacunas:
        data.append({
            'id': v.id,
            'nombre': v.nombre,
            'fecha_aplicada': str(v.fecha_aplicada),
            'proxima_dosis': str(v.proxima_dosis),
            'lote': v.lote,
            'animal': v.animal.nombre,
        })
    return JsonResponse(data, safe=False)


@login_required
def api_mis_mascotas(request):
    from .models import Animal, Cita, Vacuna
    animales = Animal.objects.filter(dueno__email=request.user.email)
    data = []
    for animal in animales:
        citas = Cita.objects.filter(animal=animal)
        vacunas = Vacuna.objects.filter(animal=animal)
        data.append({
            'id': animal.id,
            'nombre': animal.nombre,
            'especie': animal.especie,
            'citas': [{'fecha': str(c.fecha), 'motivo': c.motivo, 'estado': c.estado} for c in citas],
            'vacunas': [{'nombre': v.nombre, 'proxima_dosis': str(v.proxima_dosis)} for v in vacunas],
        })
    return JsonResponse(data, safe=False)


@csrf_exempt
def api_solicitud_adopcion(request):
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Debes iniciar sesion para adoptar'}, status=401)
        data = json.loads(request.body)
        from .models import Animal
        animal = get_object_or_404(Animal, pk=data.get('animal_id'))
        animal.estado = 'adoptado'
        animal.save()
        return JsonResponse({'mensaje': f'Solicitud de adopcion para {animal.nombre} enviada correctamente'})
    return JsonResponse({'error': 'Metodo no permitido'}, status=405)