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