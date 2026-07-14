import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { PRODUCTOS_MOCK } from '../components/Tienda';
import './Home.css';

const PRODUCTOS_DESTACADOS = PRODUCTOS_MOCK.slice(0, 6);

const ALBERGUES = [
  {
    nombre: 'Ayúdanos a Ayudar',
    imagen: 'https://scontent.ftcq3-1.fna.fbcdn.net/v/t39.30808-6/713364065_1380842224090084_730965225104430095_n.jpg?stp=dst-jpg_tt6&cstp=mx1254x1254&ctp=s1254x1254&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=PZXSgY85eRkQ7kNvwH6JMnS&_nc_oc=AdoGZMEs8wSjnlpX7byhvPvZDIAk27sVlhFaIiLvL8lohvP6NpI2zWA0AxHv1JccUTmctu2aYBkcR-LIEevtt5z0&_nc_zt=23&_nc_ht=scontent.ftcq3-1.fna&_nc_gid=ccuClBYho-gPatBwLUkWdA&_nc_ss=7b2a8&oh=00_AQCkkr8fOfSTxLL-JtRgl9BqPBA3gX4AJPO0F6vZj2FWog&oe=6A5BF49E',
    descripcion: 'Asociación sin fines de lucro en Socabaya. Rescate y adopción de perritos abandonados.',
    facebook: 'https://www.facebook.com/ayudanosayudaraqp/',
  },
  {
    nombre: 'Refugio Huellitas en Busca de Amor',
    imagen: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80',
    descripcion: 'Más de 200 huellitas esperando un hogar. Adopciones válidas para la provincia de Arequipa.',
    facebook: 'https://www.facebook.com/refugiohuellitasenbuscadeamor/',
  },
  {
    nombre: 'Entre Patas Refugio',
    imagen: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&q=80',
    descripcion: 'Refugio arequipeño activo en rescate y adopción responsable de perros y gatos.',
    facebook: 'https://www.facebook.com/EntrePatasRefugio/',
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
              <img
                src={albergue.imagen}
                alt={albergue.nombre}
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.8rem' }}
              />
              <h4>{albergue.nombre}</h4>
              <p>{albergue.descripcion}</p>
              <a href={albergue.facebook} target="_blank" rel="noreferrer" style={{
                display: 'inline-block',
                marginTop: '0.8rem',
                background: '#1877f2',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '5px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                📘 Ver en Facebook
              </a>
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