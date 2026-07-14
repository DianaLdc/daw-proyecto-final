import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🐾 Veterinaria Aurora
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/adopciones">Adopciones</Link></li>
      </ul>
      <Link to="/tienda" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
        Tienda
      </Link>
    </nav>
  );
}