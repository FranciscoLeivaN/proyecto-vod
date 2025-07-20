import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const success = login({ username, password });
    
    if (success) {
      navigate('/home');
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-logo">VOD Platform</h1>
      </div>
      <div className="login-card">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
        <div className="login-info">
          <p>Para probar la aplicación, use:</p>
          <p>Usuario: <strong>admin</strong></p>
          <p>Contraseña: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
