import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const mockSyllabus = [
  'Introduction and setup',
  'Core concepts and fundamentals',
  'Hands-on project 1',
  'Advanced patterns',
  'Hands-on project 2',
  'Final assessment and certificate'
];

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>Course #{id}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Lifetime access • Certificate included • Self-paced</p>

        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>What you'll learn</h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
            <li>Build real-world projects with modern tools</li>
            <li>Understand core theory with practical examples</li>
            <li>Prepare for interviews and certifications</li>
          </ul>
        </div>

        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Syllabus</h2>
          <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
            {mockSyllabus.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ol>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="form-button" onClick={() => navigate(`/course/${id}/start`)} style={{ maxWidth: 220 }}>
            Enroll Free
          </button>
          <button className="btn-secondary" onClick={() => navigate('/search')}>
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;


