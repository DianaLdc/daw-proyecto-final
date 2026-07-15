# 🐾 Veterinaria Aurora — Sistema Web de Gestión Veterinaria

> Proyecto Final — Desarrollo de Aplicaciones Web  
> M.Sc. Carlo Jose Luis Corrales Delgado  
> Universidad Nacional de San Agustín | 2026

---

## 📋 Descripción

**Veterinaria Aurora** es una aplicación web completa para una clínica veterinaria ubicada en Arequipa, Perú. Permite gestionar animales en adopción, registrar citas y vacunas, y ofrecer una interfaz moderna para que los clientes puedan adoptar mascotas y hacer seguimiento de sus animales.

---

## 👥 Equipo

| Integrantes                |
| -------------------------- |
| Diana Ramos Rodrigo        |
| Karen Alvarez Molina       |
| Alexandra Martel Gallegos  |
| Raúl Wilfredo Condori Idme |

---

## 🛠️ Stack Tecnológico

**Backend:**

- Python 3.12
- Django 6.0.6
- SQLite3
- django-cors-headers

**Frontend:**

- React 18 + Vite
- Axios
- React Router DOM
- CSS modular por componente

---

## 🏗️ Arquitectura

```
Usuario
   │
   ▼
React (puerto 5173)  ──fetch/Axios──►  Django API (puerto 8000)
   │                                         │
   │  Páginas públicas:                      │  Endpoints:
   │  - Inicio                               │  /adopciones/api/
   │  - Adopciones                           │  /adopciones/api/login/
   │  - Casos de Éxito                       │  /adopciones/api/registro/
   │  - Login/Registro                       │  /adopciones/api/citas/
   │  - Formulario Adopción                  │  /adopciones/api/vacunas/
   │  - Mi Mascota                           │  /adopciones/api/mis-mascotas/
   │  - Tienda Virtual                       │
   ▼                                         ▼
localhost:5173                        127.0.0.1:8000
```

---

## 🗄️ Modelos de Base de Datos

```
Dueño
├── nombre, apellido, dni, telefono, email, direccion

Veterinario
├── nombre, especialidad, telefono, horario

Animal ──────────────────────► Dueno (FK)
├── nombre, especie, raza, edad, foto, descripcion, estado

Vacuna ──────────────────────► Animal (FK)
├── nombre, fecha_aplicada, proxima_dosis, lote

Cita ────────────────────────► Animal (FK)
│   └───────────────────────► Veterinario (FK)
├── fecha, hora, motivo, observaciones, estado

SolicitudAdopcion ──────────► Animal (FK)
├── nombre, dni, telefono, email, direccion
├── tipo_vivienda, tiene_jardin, otros_animales
├── horas_en_casa, experiencia, fecha_solicitud
```

---

## Funcionalidades Implementadas

### Backend Django

- ✅ App independiente `adopciones` con URLs propias usando `reverse`
- ✅ Plantillas propias con herencia de `base.html`
- ✅ Widgets elegantes en formularios (DatePicker, Select, FileInput)
- ✅ Vistas CRUD completas: Listado, Detalle, Crear, Editar, Borrar
- ✅ Formularios con CSRF y validaciones personalizadas
- ✅ Vista JSON `/adopciones/api/` que devuelve datos en formato JSON
- ✅ Filtro Ajax por especie y estado en tiempo real
- ✅ Panel de control del veterinario (dashboard, alertas, casos de éxito)
- ✅ Sistema de Login/Registro con autenticación por sesión
- ✅ CRUD de Citas y Vacunas (solo admin)
- ✅ Panel de alertas: vacunas próximas en los siguientes 7 días
- ✅ Foreign Keys: Animal→Dueño, Cita→Animal/Veterinario, Vacuna→Animal

### Frontend React

- ✅ Página de inicio con carrusel de productos, sede y albergues aliados
- ✅ Catálogo de adopciones con filtro por especie
- ✅ Casos de Éxito (animales adoptados)
- ✅ Login y Registro de usuarios
- ✅ Formulario completo de solicitud de adopción
- ✅ "Mi Mascota": panel del cliente con citas y vacunas
- ✅ Tienda Virtual con categorías y filtros
- ✅ Navbar dinámico según estado de sesión
- ✅ Footer con datos de contacto de Arequipa

---

## 🚀 Cómo correr el proyecto

### Requisitos

- Python 3.12+
- Node.js 18+

### Backend (Django)

```bash
# Clonar el repositorio
git clone https://github.com/DianaLdc/daw-proyecto-final.git
cd daw-proyecto-final

# Crear y activar entorno virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser
# Usuario: admin | Email: admin@veterinariaaurora.com | Contraseña: 1234

# Correr servidor
python manage.py runserver
```

Abre: `http://127.0.0.1:8000/adopciones/`  
Admin: `http://127.0.0.1:8000/admin/`

### Frontend (React)

```bash
# En otra terminal
cd FRONTEND
npm install
npm run dev
```

Abre: `http://127.0.0.1:5173`

> ⚠️ **Importante:** usar `127.0.0.1` en lugar de `localhost` para que las cookies de sesión funcionen correctamente entre Django y React.

---

## Ramas Git

| Rama                        | Contenido                                             |
| --------------------------- | ----------------------------------------------------- |
| `main`                      | Código integrado y funcional                          |
| `feature/setup-inicial`     | Configuración base, modelos, admin, URLs, vistas CRUD |
| `feature/frontend-react`    | Frontend React con Vite                               |
| `feature/templates-grupob`  | Templates Bootstrap mejorados                         |
| `feature/karen-backend-api` | Login, CRUD Citas/Vacunas, APIs JSON                  |

---

## 📁 Estructura del Proyecto

```
daw-proyecto-final/
├── adopciones/                  # App Django principal
│   ├── models.py                # Modelos de BD
│   ├── views.py                 # Vistas y endpoints API
│   ├── urls.py                  # URLs con reverse
│   ├── forms.py                 # Formularios con validaciones
│   ├── admin.py                 # Panel de administración
│   └── templates/adopciones/   # Templates HTML con Bootstrap
├── veterinaria/                 # Configuración del proyecto
│   ├── settings.py
│   └── urls.py
├── FRONTEND/                    # Aplicación React
│   └── src/
│       ├── pages/               # Páginas de la app
│       ├── components/          # Componentes reutilizables
│       └── services/api.js      # Axios + endpoints
├── media/                       # Archivos subidos (fotos de animales)
├── manage.py
└── requirements.txt
```

---

## 🔑 Credenciales de prueba

| Campo                 | Valor                                     |
| --------------------- | ----------------------------------------- |
| URL Admin             | `http://127.0.0.1:8000/admin/`            |
| Usuario admin         | `admin`                                   |
| Contraseña admin      | `1234`                                    |
| Usuario cliente React | Crear desde `http://127.0.0.1:5173/login` |

---

## 📚 Referencias

- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [Axios](https://axios-http.com/)
- [django-cors-headers](https://pypi.org/project/django-cors-headers/)

---

## 🏥 Sobre la Veterinaria

**Veterinaria Aurora** — Arequipa, Perú  
📍 Calle Mercaderes 234, Cercado, Arequipa  
📞 (054) 227-890  
✉️ veterinariaurora.aqp@gmail.com  
🕐 Lunes a Sábado, 8:00 am - 8:00 pm
