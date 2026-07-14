from django import forms
from .models import Animal

class AnimalForm(forms.ModelForm):
    class Meta:
        model = Animal
        fields = ['nombre', 'especie', 'raza', 'edad', 'foto', 'descripcion', 'estado', 'dueno']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombre del animal'
            }),
            'especie': forms.Select(
                choices=[
                    ('', 'Selecciona una especie'),
                    ('Perro', 'Perro'),
                    ('Gato', 'Gato'),
                ],
                attrs={'class': 'form-select'}
            ),
            'raza': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ej: Labrador, Siamés'
            }),
            'edad': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': 0,
                'max': 30
            }),
            'foto': forms.FileInput(attrs={
                'class': 'form-control'
            }),
            'descripcion': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Describe al animal...'
            }),
            'estado': forms.Select(attrs={
                'class': 'form-select'
            }),
            'dueno': forms.Select(attrs={
                'class': 'form-select'
            }),
        }
        labels = {
            'dueno': 'Dueño',
            'descripcion': 'Descripción',
        }

    def clean_edad(self):
        edad = self.cleaned_data.get('edad')
        if edad is None or edad < 0 or edad > 30:
            raise forms.ValidationError("La edad debe estar entre 0 y 30 años")
        return edad

    def clean_nombre(self):
        nombre = self.cleaned_data.get('nombre')
        if any(char.isdigit() for char in nombre):
            raise forms.ValidationError("El nombre no puede contener números")
        return nombre
from .models import Cita, Vacuna

class CitaForm(forms.ModelForm):
    class Meta:
        model = Cita
        fields = ['fecha', 'hora', 'motivo', 'observaciones', 'estado', 'animal', 'veterinario']
        widgets = {
            'fecha': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'hora': forms.TimeInput(attrs={
                'class': 'form-control',
                'type': 'time'
            }),
            'motivo': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Motivo de la cita...'
            }),
            'observaciones': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 2,
                'placeholder': 'Observaciones adicionales...'
            }),
            'estado': forms.Select(attrs={
                'class': 'form-select'
            }),
            'animal': forms.Select(attrs={
                'class': 'form-select'
            }),
            'veterinario': forms.Select(attrs={
                'class': 'form-select'
            }),
        }
        labels = {
            'fecha': 'Fecha',
            'hora': 'Hora',
            'motivo': 'Motivo',
            'observaciones': 'Observaciones',
            'estado': 'Estado',
            'animal': 'Animal',
            'veterinario': 'Veterinario',
        }


class VacunaForm(forms.ModelForm):
    class Meta:
        model = Vacuna
        fields = ['nombre', 'fecha_aplicada', 'proxima_dosis', 'lote', 'animal']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombre de la vacuna'
            }),
            'fecha_aplicada': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'proxima_dosis': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'lote': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Numero de lote'
            }),
            'animal': forms.Select(attrs={
                'class': 'form-select'
            }),
        }
        labels = {
            'nombre': 'Nombre de la vacuna',
            'fecha_aplicada': 'Fecha aplicada',
            'proxima_dosis': 'Proxima dosis',
            'lote': 'Lote',
            'animal': 'Animal',
        }