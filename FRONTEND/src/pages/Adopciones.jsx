import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnimales } from '../services/api';
import './Adopciones.css';

function AnimalCard({ animal, onAdoptar }) {
  const disponible = animal.estado === 'disponible';

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

        {disponible && (
          <button
            className="btn-adoptar"
            onClick={() => onAdoptar(animal)}
          >
            🐾 Adoptar
          </button>
        )}
      </div>
    </div>
  );
}

export default function Adopciones() {
  const [animales, setAnimales] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarAnimales();
  }, []);

  const cargarAnimales = () => {
    getAnimales()
      .then(data => {
        setAnimales(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleAdoptar = (animal) => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Debes iniciar sesión para adoptar');
      navigate('/login');
      return;
    }
    navigate(`/solicitud-adopcion/${animal.id}`);
  };

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
          <AnimalCard key={animal.id} animal={animal} onAdoptar={handleAdoptar} />
        ))}
      </div>

      {animalesFiltrados.length === 0 && (
        <p className="no-animales">No hay animales disponibles.</p>
      )}
    </div>
  );
}