import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-logo">🐾 Veterinaria Aurora</div>
          <p>Cuidamos a tus mascotas como si fueran nuestras. Profesionalismo y amor en cada consulta.</p>
        </div>

        <div className="footer-col">
          <h4>Enlaces</h4>
          <Link to="/">Inicio</Link>
          <Link to="/adopciones">Adopciones</Link>
          <Link to="/casos-exito">Casos de Éxito</Link>
          <Link to="/tienda">Tienda</Link>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <p>📍 Calle Mercaderes 234, Cercado, Arequipa</p>
          <p>📞 (054) 227-890</p>
          <p>✉️ veterinariaurora.aqp@gmail.com</p>
        </div>

        <div className="footer-col">
          <h4>Horario</h4>
          <p>Lunes a Sábado</p>
          <p>8:00 am - 8:00 pm</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Veterinaria Aurora - Arequipa, Perú. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}