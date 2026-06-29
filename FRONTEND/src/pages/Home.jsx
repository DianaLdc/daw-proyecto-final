import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
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

      {/* Servicios */}
      <section className="services">
        <h2>Nuestros Servicios</h2>
        <div className="services-grid">
          <div className="service-item">
            <div className="icon">🏪</div>
            <h3>Tienda Virtual</h3>
            <p>Los mejores productos para tu mascota</p>
          </div>
          <div className="service-item">
            <div className="icon">📍</div>
            <h3>Nuestras sedes</h3>
            <p>Encuéntranos cerca de ti</p>
          </div>
          <div className="service-item">
            <div className="icon">🐾</div>
            <h3>Adopciones</h3>
            <p>Dale un hogar a una mascota</p>
          </div>
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