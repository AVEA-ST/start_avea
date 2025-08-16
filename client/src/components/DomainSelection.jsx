import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const domains = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Master artificial intelligence, deep learning, and neural networks',
    icon: '🤖',
    courses: 45
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Build modern web applications with latest technologies',
    icon: '💻',
    courses: 38
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Learn to protect systems, networks, and programs from digital attacks',
    icon: '🔒',
    courses: 32
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    description: 'Master AWS, Azure, and Google Cloud platforms',
    icon: '☁️',
    courses: 28
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Analyze and interpret complex data to drive business decisions',
    icon: '📊',
    courses: 41
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    description: 'Create iOS and Android applications',
    icon: '📱',
    courses: 35
  }
];

const DomainSelection = () => {
  const navigate = useNavigate();
  const [selectedDomains, setSelectedDomains] = useState([]);

  const toggleDomain = (domainId) => {
    setSelectedDomains((prev) =>
      prev.includes(domainId) ? prev.filter((d) => d !== domainId) : [...prev, domainId]
    );
  };

  const handleSubmit = () => {
    if (selectedDomains.length === 0) return;
    navigate('/recommendations', { state: { selectedDomains } });
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="text-center mb-6">
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Choose Your Learning Path
          </h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Select the domains that interest you most. We'll personalize your learning experience based on your choices.
          </p>
        </div>
        
        <div className="domain-grid">
          {domains.map((domain) => (
            <div 
              key={domain.id}
              className={`domain-card ${selectedDomains.includes(domain.id) ? 'selected' : ''}`}
              onClick={() => toggleDomain(domain.id)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{domain.icon}</div>
              <h3>{domain.name}</h3>
              <p>{domain.description}</p>
              <div style={{ color: 'var(--text-light)', fontSize: 'var(--font-size-sm)', marginTop: '1rem' }}>
                {domain.courses} courses available
              </div>
              {selectedDomains.includes(domain.id) && (
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem', 
                  background: 'var(--success-color)', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '24px', 
                  height: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button 
            onClick={handleSubmit}
            className="form-button"
            style={{ 
              maxWidth: '300px',
              opacity: selectedDomains.length === 0 ? 0.5 : 1,
              cursor: selectedDomains.length === 0 ? 'not-allowed' : 'pointer'
            }}
            disabled={selectedDomains.length === 0}
          >
            Continue with {selectedDomains.length} {selectedDomains.length === 1 ? 'Domain' : 'Domains'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainSelection;