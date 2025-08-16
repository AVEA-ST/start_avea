import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const allCourses = [
  { id: 101, title: 'Intro to Machine Learning', domain: 'ai-ml', level: 'Beginner', duration: '10h', image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=ML' },
  { id: 102, title: 'Neural Networks Crash Course', domain: 'ai-ml', level: 'Intermediate', duration: '8h', image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=NN' },
  { id: 201, title: 'Modern React + Hooks', domain: 'web-dev', level: 'Beginner', duration: '15h', image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=React' },
  { id: 202, title: 'Node.js APIs with Express', domain: 'web-dev', level: 'Intermediate', duration: '12h', image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Node' },
  { id: 301, title: 'Ethical Hacking Basics', domain: 'cybersecurity', level: 'Beginner', duration: '9h', image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Security' },
  { id: 401, title: 'AWS for Beginners', domain: 'cloud-computing', level: 'Beginner', duration: '14h', image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=AWS' },
  { id: 501, title: 'Data Analysis with Pandas', domain: 'data-science', level: 'Beginner', duration: '11h', image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Data' },
  { id: 601, title: 'Kotlin for Android', domain: 'mobile-dev', level: 'Beginner', duration: '13h', image: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=Android' },
];

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDomains = (location.state && location.state.selectedDomains) || [];

  const recommended = selectedDomains.length
    ? allCourses.filter(c => selectedDomains.includes(c.domain))
    : allCourses.slice(0, 6);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '800', color: 'var(--text-primary)' }}>
            Recommended for You
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Based on your selected domains: {selectedDomains.length ? selectedDomains.join(', ') : 'All'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {recommended.map(course => (
            <div key={course.id} className="course-card" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
              <img src={course.image} alt={course.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ marginTop: 0 }}>{course.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Level: {course.level} • Duration: {course.duration}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button className="form-button" style={{ flex: 1 }} onClick={() => navigate(`/course/${course.id}`)}>Start Learning</button>
                  <button className="btn-secondary" onClick={() => navigate('/search')}>Explore More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;


