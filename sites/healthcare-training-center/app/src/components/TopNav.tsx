import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types';
import './TopNav.css';

export interface TopNavProps {
  user?: User;
  onLogout?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ user, onLogout }) => {
  return (
    <nav className="top-nav">
      <div className="top-nav__container">
        <Link to="/" className="top-nav__logo">
          <span className="top-nav__logo-icon">🏥</span>
          <span className="top-nav__logo-text">Healthcare Center</span>
        </Link>

        {user && (
          <div className="top-nav__user">
            <span className="top-nav__user-name">{user.name}</span>
            {onLogout && (
              <button className="top-nav__logout" onClick={onLogout}>
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
