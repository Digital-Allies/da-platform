import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import './Auth.css';

export interface AuthProps {
  onLogin: (email: string, name: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);
    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    onLogin(email, name);
    navigate('/');
  };

  const handleTestLogin = () => {
    onLogin('mom@example.com', 'Mom');
    navigate('/');
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__content">
          <div className="auth__hero">
            <span className="auth__icon">🏥</span>
          </div>

          <h1 className="auth__title">Welcome to Healthcare Training Center</h1>
          <p className="auth__subtitle">Learn at your own pace with interactive training modules</p>

          <form onSubmit={handleLogin} className="auth__form">
            <div className="auth__field">
              <label htmlFor="name" className="auth__label">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="auth__input"
              />
            </div>

            <div className="auth__field">
              <label htmlFor="email" className="auth__label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="auth__input"
              />
            </div>

            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="auth__divider">or</div>

          <Button variant="ghost" fullWidth size="lg" onClick={handleTestLogin}>
            Sign in as Test User
          </Button>

          <p className="auth__footer">This is a demo application. No data is stored.</p>
        </div>
      </div>
    </div>
  );
};
