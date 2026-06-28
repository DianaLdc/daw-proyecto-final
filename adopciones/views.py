from django.shortcuts import render, get_object_or_404, redirect
from .models import Animal
from .forms import AnimalForm
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
    animales = Animal.objects.all().values('id', 'nombre', 'especie', 'raza', 'edad', 'descripcion', 'estado')
    return JsonResponse(list(animales), safe=False)