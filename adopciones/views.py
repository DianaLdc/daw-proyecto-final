from django.shortcuts import render, get_object_or_404, redirect
from .forms import AnimalForm, DuenoForm, SolicitudAdopcionForm
from .models import Animal, Vacuna, SolicitudAdopcion, Cita
from datetime import date, timedelta
from django.http import JsonResponse

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



def panel_alertas(request):
    hoy = date.today()
    en_7_dias = hoy + timedelta(days=7)
    vacunas_proximas = Vacuna.objects.filter(
        proxima_dosis__gte=hoy,
        proxima_dosis__lte=en_7_dias
    ).select_related('animal')
    return render(request, 'adopciones/panel_alertas.html', {'vacunas': vacunas_proximas})



def registro_paciente(request):
    if request.method == 'POST':
        dueno_form = DuenoForm(request.POST)
        animal_form = AnimalForm(request.POST, request.FILES)
        if dueno_form.is_valid() and animal_form.is_valid():
            dueno = dueno_form.save()
            animal = animal_form.save(commit=False)
            animal.dueno = dueno
            animal.save()
            return redirect('adopciones:animal_list')
    else:
        dueno_form = DuenoForm()
        animal_form = AnimalForm()
    return render(request, 'adopciones/registro_paciente.html', {
        'dueno_form': dueno_form,
        'animal_form': animal_form
    })

def solicitud_adopcion(request, pk):
    animal = get_object_or_404(Animal, pk=pk)
    if request.method == 'POST':
        form = SolicitudAdopcionForm(request.POST)
        if form.is_valid():
            solicitud = form.save(commit=False)
            solicitud.animal = animal
            solicitud.save()
            return redirect('adopciones:animal_list')
    else:
        form = SolicitudAdopcionForm(initial={'animal': animal})
    return render(request, 'adopciones/solicitud_adopcion.html', {
        'form': form,
        'animal': animal
    })

def casos_exito(request):
    animales = Animal.objects.filter(estado='adoptado')
    return render(request, 'adopciones/casos_exito.html', {'animales': animales})

def dashboard(request):
    from datetime import date, timedelta
    hoy = date.today()
    en_7_dias = hoy + timedelta(days=7)
    citas_hoy = Cita.objects.filter(fecha=hoy)
    vacunas_proximas = Vacuna.objects.filter(proxima_dosis__gte=hoy, proxima_dosis__lte=en_7_dias)
    solicitudes = SolicitudAdopcion.objects.order_by('-fecha_solicitud')[:5]
    animales_disponibles = Animal.objects.filter(estado='disponible').count()
    return render(request, 'adopciones/dashboard.html', {
        'citas_hoy': citas_hoy,
        'vacunas_proximas': vacunas_proximas,
        'solicitudes': solicitudes,
        'animales_disponibles': animales_disponibles,
    })