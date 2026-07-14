import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { PRODUCTOS_MOCK } from '../components/Tienda';
import './Home.css';

// Tomamos solo 6 productos destacados para el carrusel de inicio
const PRODUCTOS_DESTACADOS = PRODUCTOS_MOCK.slice(0, 6);

const ALBERGUES = [
  {
    nombre: 'Refugio Huellitas Arequipa',
    icon: '🐕',
    descripcion: 'Rescate y adopción de perros abandonados en Cerro Colorado.'
  },
  {
    nombre: 'Michi Refugio AQP',
    icon: '🐱',
    descripcion: 'Enfocados en el rescate y esterilización de gatos callejeros.'
  },
  {
    nombre: 'Patitas Solidarias',
    icon: '🐾',
    descripcion: 'Red de voluntarios que apoya campañas de adopción en toda la ciudad.'
  },
];

export default function Home() {
  const carruselRef = useRef(null);

  const scroll = (direccion) => {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({ left: direccion * 250, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <h1>Veterinaria Aurora</h1>
        <p>Cuidamos a tus mascotas como si fueran nuestras</p>
        <Link to="/adopciones" className="btn-red">
          Ver Animales en Adopción
        </Link>
      </section>

      {/* Por qué elegirnos */}
      <section className="why-us">
        <img
          src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=600"
          alt="Mascota"
        />
        <div className="why-us-text">
          <h2>¿Por qué elegirnos?</h2>
          <p>
            Veterinaria Aurora es sinónimo de profesionalismo y pasión por la medicina veterinaria.
            Años de experiencia salvaguardando el bienestar de las mascotas, siendo precursores
            en incluir tecnología médica de punta y capacitación constante de nuestro staff,
            cada día es un reto para mejorar y salvar una vida.
          </p>
          <Link to="/adopciones" className="btn-red" style={{ marginTop: '1rem' }}>
            Leer más
          </Link>
        </div>
      </section>

      {/* Tienda Virtual - Carrusel */}
      <section className="tienda-seccion">
        <h2>🏪 Tienda Virtual</h2>
        <p className="subtitulo">Los mejores productos para el cuidado de tu mascota</p>

        <div className="carrusel-wrapper">
          <button className="carrusel-btn" onClick={() => scroll(-1)}>‹</button>
          <div className="carrusel-track" ref={carruselRef}>
            {PRODUCTOS_DESTACADOS.map(producto => (
              <div className="producto-card" key={producto.id}>
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="producto-card-body">
                  <h4>{producto.nombre}</h4>
                  <p className="precio">{producto.precio}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carrusel-btn" onClick={() => scroll(1)}>›</button>
        </div>

        <Link to="/tienda" className="btn-red">Ver toda la tienda</Link>
      </section>

      {/* Nuestra Sede */}
      <section className="sede-seccion">
        <div className="sede-info">
          <h2>📍 Nuestra Sede</h2>
          <div className="sede-dato">
            <span>📌</span>
            <span>Calle Mercaderes 234, Cercado, Arequipa</span>
          </div>
          <div className="sede-dato">
            <span>🕐</span>
            <span>Lunes a Sábado, 8:00 am - 8:00 pm</span>
          </div>
          <div className="sede-dato">
            <span>📞</span>
            <span>(054) 227-890</span>
          </div>
        </div>
        <div className="sede-mapa">
          <iframe
            title="Ubicación Veterinaria Aurora"
            src="https://www.google.com/maps?q=Calle%20Mercaderes%20234%2C%20Arequipa&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Albergues Aliados */}
      <section className="albergues-seccion">
        <h2>🏠 Albergues Aliados</h2>
        <p className="subtitulo">Trabajamos junto a estos refugios para dar más mascotas en adopción</p>
        <div className="albergues-grid">
          {ALBERGUES.map((albergue, i) => (
            <div className="albergue-card" key={i}>
              <div className="icon">{albergue.icon}</div>
              <h4>{albergue.nombre}</h4>
              <p>{albergue.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Momentos Aurora */}
      <section className="momentos">
        <h2>Momentos Aurora</h2>
        <p className="momentos-subtitulo">Historias de nuestros clientes, eventos y mucho más.</p>
        <div className="momentos-grid">
          <img src="/imagenes/foto1.jpg" alt="Momento 1" />
          <img src="/imagenes/foto2.jpg" alt="Momento 2" />
          <img src="/imagenes/foto3.jpg" alt="Momento 3" />
          <img src="/imagenes/foto4.jpg" alt="Momento 4" />
          <img src="/imagenes/foto5.jpg" alt="Momento 5" />
          <img src="/imagenes/foto6.jpg" alt="Momento 6" />
        </div>
      </section>
    </div>
  );
}