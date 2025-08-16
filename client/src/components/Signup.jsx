import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here
    navigate('/domains');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignup}>
        <h2 className="form-title">Join LearnSphere</h2>
        <p className="text-center mb-6" style={{color: 'var(--text-secondary)'}}>
          Start your learning journey today
        </p>
        
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            className="form-input"
            placeholder="Enter your full name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
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
            placeholder="Create a password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="form-button">Create Account</button>
        
        <div className="form-link">
          <p>Already have an account? <a href="/login">Sign in here</a></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;