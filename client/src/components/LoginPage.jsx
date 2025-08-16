import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here
    navigate('/home');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2 className="form-title">Welcome Back</h2>
        <p className="text-center mb-6" style={{color: 'var(--text-secondary)'}}>
          Sign in to continue your learning journey
        </p>
        
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input"
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="form-button">Sign In</button>
        
        <div className="form-link">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;