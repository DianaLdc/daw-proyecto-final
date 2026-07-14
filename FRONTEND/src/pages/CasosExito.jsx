import { useState, useEffect } from 'react';
import { getCasosExito } from '../services/api';
import './CasosExito.css';

function CasoCard({ animal }) {
  return (
    <div className="caso-card">
      <span className="badge-adoptado">Adoptado ❤️</span>
      {animal.foto && (
        <img
          src={animal.foto}
          alt={animal.nombre}
        />
      )}
      <div className="caso-card-body">
        <h3>{animal.nombre}</h3>
        <p><strong>Especie:</strong> {animal.especie}</p>
        <p><strong>Raza:</strong> {animal.raza}</p>
        <p><strong>Edad:</strong> {animal.edad} años</p>
        <p>{animal.descripcion}</p>
      </div>
    </div>
  );
}

export default function CasosExito() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCasosExito()
      .then(data => {
        setCasos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="no-casos">Cargando casos de éxito...</p>;

  return (
    <div className="casos-exito">
      <h2>Casos de Éxito</h2>
      <p className="subtitulo">Historias felices de mascotas que encontraron un hogar</p>

      <div className="casos-grid">
        {casos.map(animal => (
          <CasoCard key={animal.id} animal={animal} />
        ))}
      </div>

      {casos.length === 0 && (
        <p className="no-casos">Aún no hay casos de éxito registrados.</p>
      )}
    </div>
  );
}