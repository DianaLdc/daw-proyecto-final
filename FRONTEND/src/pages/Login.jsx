import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin, apiRegistro } from '../services/api';
import './Login.css';

export default function Login() {
  const [modo, setModo] = useState('login'); // 'login' o 'registro'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await apiLogin(username, password);
      localStorage.setItem('usuario', JSON.stringify(data));
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await apiRegistro(username, email, password);
      setModo('login');
      setError('');
      alert('Cuenta creada. Ahora inicia sesión.');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{modo === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        <p className="login-subtitulo">
          {modo === 'login' ? 'Accede a tu cuenta de Veterinaria Aurora' : 'Únete a Veterinaria Aurora'}
        </p>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={modo === 'login' ? handleLogin : handleRegistro}>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {modo === 'registro' && (
            <>
              <label>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            {modo === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <div className="login-switch">
          {modo === 'login' ? (
            <p>¿No tienes cuenta? <button onClick={() => { setModo('registro'); setError(''); }}>Regístrate</button></p>
          ) : (
            <p>¿Ya tienes cuenta? <button onClick={() => { setModo('login'); setError(''); }}>Inicia sesión</button></p>
          )}
        </div>
      </div>
    </div>
  );
}