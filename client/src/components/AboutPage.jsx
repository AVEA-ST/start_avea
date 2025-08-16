import React from 'react';
import Navbar from './Navbar.jsx';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            About LearnSphere
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            A modern, learner-first platform to help you master in-demand skills.
          </p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Our Mission</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Make high-quality tech education accessible, practical, and enjoyable for everyone.
            </p>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>How We Teach</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Bite-sized lessons, real projects, and adaptive paths tailored to your goals.
            </p>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>What You Get</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Certificates, career guidance, and a supportive community of peers and mentors.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ marginTop: 0 }}>Why Learners Love Us</h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
            <li>Curated paths across AI/ML, Web, Cloud, Security, Data, and Mobile</li>
            <li>Interactive quizzes and hands-on labs</li>
            <li>Goal tracking, streaks, and achievements to keep you motivated</li>
            <li>Community support and regular live sessions</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;


