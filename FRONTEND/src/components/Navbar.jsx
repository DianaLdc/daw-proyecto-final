import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('usuario');
    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🐾 Veterinaria Aurora
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/adopciones">Adopciones</Link></li>
        <li><Link to="/casos-exito">Casos de Éxito</Link></li>
        {usuario && <li><Link to="/mi-mascota">Mi Mascota</Link></li>}
      </ul>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/tienda" style={{ textDecoration: 'none', color: '#f0a8ff', fontWeight: 'bold' }}>
          Tienda
        </Link>
        {usuario ? (
          <>
            <span style={{ color: '#f0a8ff', fontWeight: 'bold' }}>
              👤 {usuario.username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '2px solid #f0a8ff',
                color: '#f0a8ff',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: '#f0a8ff', fontWeight: 'bold' }}>
            Área de Clientes
          </Link>
        )}
      </div>
    </nav>
  );
}