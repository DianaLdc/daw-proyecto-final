import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimales, apiSolicitarAdopcion } from '../services/api';
import './SolicitudAdopcion.css';

export default function SolicitudAdopcion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    email: '',
    direccion: '',
    tipo_vivienda: 'casa',
    tiene_jardin: 'si',
    otros_animales: 'no',
    horas_en_casa: '',
    experiencia: '',
  });

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Debes iniciar sesión para adoptar');
      navigate('/login');
      return;
    }

    getAnimales().then(data => {
      const encontrado = data.find(a => a.id === parseInt(id));
      setAnimal(encontrado);
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      const res = await apiSolicitarAdopcion({
        animal_id: parseInt(id),
        ...form,
        horas_en_casa: parseInt(form.horas_en_casa),
      });
      alert(res.mensaje);
      navigate('/adopciones');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la solicitud');
      setEnviando(false);
    }
  };

  if (!animal) return <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</p>;

  return (
    <div className="solicitud-container">
      <div className="solicitud-card">
        <h2>Solicitud de Adopción</h2>
        <p className="solicitud-subtitulo">Completa tus datos para adoptar a {animal.nombre}</p>

        <div className="solicitud-animal-info">
          {animal.foto && <img src={animal.foto} alt={animal.nombre} />}
          <div>
            <strong>{animal.nombre}</strong>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
              {animal.especie} - {animal.raza} - {animal.edad} años
            </p>
          </div>
        </div>

        {error && <div className="solicitud-error">{error}</div>}

        <form className="solicitud-form" onSubmit={handleSubmit}>
          <label>Nombre completo</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

          <div className="solicitud-row">
            <div>
              <label>DNI</label>
              <input type="text" name="dni" value={form.dni} onChange={handleChange} maxLength="8" required />
            </div>
            <div>
              <label>Teléfono</label>
              <input type="text" name="telefono" value={form.telefono} onChange={handleChange} maxLength="9" required />
            </div>
          </div>

          <label>Correo electrónico</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Dirección</label>
          <textarea name="direccion" rows="2" value={form.direccion} onChange={handleChange} required />

          <div className="solicitud-row">
            <div>
              <label>Tipo de vivienda</label>
              <select name="tipo_vivienda" value={form.tipo_vivienda} onChange={handleChange}>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label>¿Tiene jardín?</label>
              <select name="tiene_jardin" value={form.tiene_jardin} onChange={handleChange}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="solicitud-row">
            <div>
              <label>¿Tiene otros animales?</label>
              <select name="otros_animales" value={form.otros_animales} onChange={handleChange}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label>Horas en casa al día</label>
              <input type="number" name="horas_en_casa" min="0" max="24" value={form.horas_en_casa} onChange={handleChange} required />
            </div>
          </div>

          <label>Experiencia con animales</label>
          <textarea name="experiencia" rows="3" placeholder="Cuéntanos tu experiencia cuidando mascotas..." value={form.experiencia} onChange={handleChange} required />

          <button type="submit" className="solicitud-btn" disabled={enviando}>
            {enviando ? 'Enviando...' : '🐾 Enviar solicitud de adopción'}
          </button>
        </form>
      </div>
    </div>
  );
}