import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const HomePage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <div className="home-content">
      <div className="hero-section">
        <h1>Empower Your Mind with LearnSphere</h1>
        <p className="hero-subtitle">
          Discover cutting-edge technology courses, master new skills, and advance your career with our comprehensive learning platform.
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Courses</p>
          </div>
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Students</p>
          </div>
          <div className="stat-item">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => window.location.href = '/search'}>Explore Courses</button>
          <button className="btn-secondary" onClick={() => window.location.href = '/domains'}>Learn More</button>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Why Choose LearnSphere?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Learning</h3>
            <p>AI-powered recommendations tailored to your learning style and career goals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of real-world experience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Learn Anywhere</h3>
            <p>Access your courses on any device, anytime, anywhere with our mobile app.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Certification</h3>
            <p>Earn industry-recognized certificates upon course completion.</p>
          </div>
        </div>
      </div>

      <div className="features-section" style={{ background: 'var(--bg-primary)' }}>
        <h2>What learners say</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⭐️⭐️⭐️⭐️⭐️</div>
            <p>“The best free platform I’ve used. The projects helped me land my first internship.”</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>— Priya, Web Developer</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐️⭐️⭐️⭐️⭐️</div>
            <p>“Crystal clear explanations and hands-on labs. Certificates look great on my profile.”</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>— Ahmed, Cloud Enthusiast</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐️⭐️⭐️⭐️⭐️</div>
            <p>“Love the recommendations based on domains I selected. Super personalized.”</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>— Sneha, Data Analyst</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default HomePage;