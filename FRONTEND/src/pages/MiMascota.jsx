import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMisMascotas } from '../services/api';
import './MiMascota.css';

function badgeClase(estado) {
  if (estado === 'pendiente') return 'badge-pendiente';
  if (estado === 'completada') return 'badge-completada';
  if (estado === 'cancelada') return 'badge-cancelada';
  return 'badge-pendiente';
}

export default function MiMascota() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Debes iniciar sesión para ver tus mascotas');
      navigate('/login');
      return;
    }

    getMisMascotas()
      .then(data => {
        setMascotas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar tus mascotas');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando tus mascotas...</p>;

  return (
    <div className="mi-mascota">
      <h2>Mi Mascota</h2>
      <p className="subtitulo">Aquí puedes ver a tus mascotas, sus citas y vacunas</p>
      {error && <p className="no-mascotas">{error}</p>}

      {!error && mascotas.length === 0 && (
        <p className="no-mascotas">
          Aún no tienes mascotas registradas. <br />
          Si adoptaste recientemente, contacta a la veterinaria para vincular tu mascota a tu cuenta,
          o revisa nuestras <a href="/adopciones">Adopciones</a> disponibles.
        </p>
      )}

      {mascotas.map(mascota => (
        <div className="mascota-card" key={mascota.id}>
          <div className="mascota-header">
            {mascota.foto && (
              <img
                src={mascota.foto}
                alt={mascota.nombre}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
              />
            )}
            <div>
              <h3>{mascota.nombre}</h3>
              <span>{mascota.especie} - {mascota.raza} - {mascota.edad} años</span>
            </div>
          </div>

          <div className="mascota-seccion">
            <h4>📅 Citas</h4>
            {mascota.citas.length === 0 ? (
              <p className="sin-datos">No tiene citas registradas.</p>
            ) : (
              mascota.citas.map((cita, i) => (
                <div className="mascota-item" key={i}>
                  <span>{cita.fecha} — {cita.motivo}</span>
                  <span className={`badge-estado ${badgeClase(cita.estado)}`}>{cita.estado}</span>
                </div>
              ))
            )}
          </div>

          <div className="mascota-seccion">
            <h4>💉 Vacunas</h4>
            {mascota.vacunas.length === 0 ? (
              <p className="sin-datos">No tiene vacunas registradas.</p>
            ) : (
              mascota.vacunas.map((vacuna, i) => (
                <div className="mascota-item" key={i}>
                  <span>{vacuna.nombre}</span>
                  <span>Próxima dosis: {vacuna.proxima_dosis}</span>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}