import React from 'react';
import Navbar from './Navbar.jsx';

const questions = [
  { q: 'Are courses really free?', a: 'Yes. All courses on LearnSphere are currently free to enroll and learn.' },
  { q: 'Do I get a certificate?', a: 'Yes. You’ll receive a shareable certificate after completing course requirements.' },
  { q: 'Can I learn at my own pace?', a: 'Absolutely. All courses are self-paced with lifetime access.' },
  { q: 'How do recommendations work?', a: 'Pick your interested domains and we tailor recommendations for you.' },
];

const FAQ = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>Frequently Asked Questions</h1>
        <div style={{ marginTop: '1.5rem' }}>
          {questions.map((item, idx) => (
            <details key={idx} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1rem', marginBottom: '0.75rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.q}</summary>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;


