from django.db import models

class Dueno(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=8)
    telefono = models.CharField(max_length=9)
    email = models.EmailField()
    direccion = models.TextField()

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Animal(models.Model):
    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('adoptado', 'Adoptado'),
    ]
    nombre = models.CharField(max_length=100)
    especie = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    edad = models.IntegerField()
    foto = models.ImageField(upload_to='animales/')
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='disponible')
    dueno = models.ForeignKey(Dueno, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nombre

class Vacuna(models.Model):
    nombre = models.CharField(max_length=100)
    fecha_aplicada = models.DateField()
    proxima_dosis = models.DateField()
    lote = models.CharField(max_length=50)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre} - {self.animal.nombre}"
    
class Veterinario(models.Model):
    nombre = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)
    telefono = models.CharField(max_length=9)
    horario = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Cita(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('atendida', 'Atendida'),
        ('cancelada', 'Cancelada'),
    ]
    fecha = models.DateField()
    hora = models.TimeField()
    motivo = models.TextField()
    observaciones = models.TextField(blank=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cita {self.fecha} - {self.animal.nombre}"
