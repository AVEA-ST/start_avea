import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      alert('Thank you for subscribing to our newsletter!');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const handleSocialClick = (platform) => {
    alert(`Redirecting to ${platform}...`);
    // In a real app, this would redirect to actual social media profiles
  };

  return (
    <footer style={{
      background: 'var(--text-primary)',
      color: 'white',
      padding: '3rem 2rem 1rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary-color)' }}>
              LearnSphere
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '1rem' }}>
              Empowering minds through cutting-edge technology education. Join thousands of learners worldwide.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => handleSocialClick('Facebook')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                📘
              </button>
              <button 
                onClick={() => handleSocialClick('Twitter')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                🐦
              </button>
              <button 
                onClick={() => handleSocialClick('Instagram')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                📷
              </button>
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                💼
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/home" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/search" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Browse Courses
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/domains" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Learning Paths
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', marginBottom: '1rem' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Web Development
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Data Science
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  AI & Machine Learning
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Cybersecurity
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', marginBottom: '1rem' }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Help Center
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Contact Us
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Privacy Policy
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ 
          borderTop: '1px solid #374151', 
          paddingTop: '2rem', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', marginBottom: '1rem' }}>
            Stay Updated
          </h4>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            Get the latest course updates and learning tips delivered to your inbox.
          </p>
          {!isSubscribed ? (
            <form onSubmit={handleNewsletterSubscribe} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  border: '1px solid #374151',
                  borderRadius: 'var(--border-radius)',
                  background: '#1f2937',
                  color: 'white',
                  fontSize: 'var(--font-size-sm)'
                }}
                required
              />
              <button type="submit" style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: 'var(--font-size-sm)'
              }}>
                Subscribe
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--success-color)', fontSize: 'var(--font-size-lg)', fontWeight: '600' }}>
              ✓ Successfully subscribed!
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid #374151', 
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: '#94a3b8', fontSize: 'var(--font-size-sm)' }}>
            © 2024 LearnSphere. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: '#94a3b8', fontSize: 'var(--font-size-sm)', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: '#94a3b8', fontSize: 'var(--font-size-sm)', textDecoration: 'none' }}>
              Terms of Service
            </a>
            <a href="#" style={{ color: '#94a3b8', fontSize: 'var(--font-size-sm)', textDecoration: 'none' }}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
