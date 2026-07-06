import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TopNav, BottomNav } from './components';
import { Auth } from './pages/Auth';
import { Lobby } from './pages/Lobby';
import type { User } from './types';
import './styles/design-tokens.css';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('htc-user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (email: string, name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'learner',
      completedModules: [],
    };
    setUser(newUser);
    localStorage.setItem('htc-user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('htc-user');
  };

  return (
    <Router>
      <div className="app">
        {user && <TopNav user={user} onLogout={handleLogout} />}

        <main className="app__main" style={{ paddingBottom: user ? '80px' : '0' }}>
          <Routes>
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
            <Route
              path="/"
              element={user ? <Lobby userName={user.name} /> : <Navigate to="/auth" />}
            />
            {/* Additional routes will be added in Week 2 and 3 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {user && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
