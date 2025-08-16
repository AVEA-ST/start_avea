import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell.jsx';

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>LearnSphere</h2>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/domains">Courses</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
        <div className="navbar-auth">
          <button onClick={toggleTheme} className="auth-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <NotificationBell />
          <Link to="/dashboard" className="auth-link">Dashboard</Link>
          <Link to="/login" className="auth-link">Login</Link>
          <Link to="/signup" className="auth-button">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;