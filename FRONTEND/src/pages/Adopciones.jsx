import { useState, useEffect } from 'react';
import { getAnimales } from '../services/api';
import './Adopciones.css';

function AnimalCard({ animal }) {
  return (
    <div className="animal-card">
      {animal.foto && (
        <img
          src={animal.foto}
          alt={animal.nombre}
        />
      )}
      <div className="animal-card-body">
        <h3>{animal.nombre}</h3>
        <p><strong>Especie:</strong> {animal.especie}</p>
        <p><strong>Raza:</strong> {animal.raza}</p>
        <p><strong>Edad:</strong> {animal.edad} años</p>
        <p><strong>Estado:</strong> {animal.estado}</p>
      </div>
    </div>
  );
}

export default function Adopciones() {
  const [animales, setAnimales] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimales()
      .then(data => {
        setAnimales(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const animalesFiltrados = filtro
    ? animales.filter(a => a.especie.toLowerCase() === filtro.toLowerCase())
    : animales;

  if (loading) return <p className="no-animales">Cargando animales...</p>;

  return (
    <div className="adopciones">
      <h2>Animales en Adopción</h2>

      <div className="filtros">
        <button onClick={() => setFiltro('')} className={filtro === '' ? 'active' : ''}>Todos</button>
        <button onClick={() => setFiltro('perro')} className={filtro === 'perro' ? 'active' : ''}>Perros</button>
        <button onClick={() => setFiltro('gato')} className={filtro === 'gato' ? 'active' : ''}>Gatos</button>
      </div>

      <div className="animales-grid">
        {animalesFiltrados.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

      {animalesFiltrados.length === 0 && (
        <p className="no-animales">No hay animales disponibles.</p>
      )}
    </div>
  );
}