import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
        <span className="bottom-nav__icon">🏠</span>
        <span className="bottom-nav__label">Home</span>
      </NavLink>

      <NavLink to="/courses" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
        <span className="bottom-nav__icon">📚</span>
        <span className="bottom-nav__label">Courses</span>
      </NavLink>

      <NavLink to="/progress" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
        <span className="bottom-nav__icon">📊</span>
        <span className="bottom-nav__label">Progress</span>
      </NavLink>

      <NavLink to="/account" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
        <span className="bottom-nav__icon">👤</span>
        <span className="bottom-nav__label">Account</span>
      </NavLink>
    </nav>
  );
};
