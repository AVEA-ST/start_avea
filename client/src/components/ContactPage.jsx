import React, { useState } from 'react';
import Navbar from './Navbar.jsx';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>Have questions or feedback? We’d love to hear from you.</p>

        <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '640px' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Mercer" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea rows={5} className="form-input" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us how we can help..." />
          </div>
          <button type="submit" className="form-button">Send Message</button>
          {sent && (
            <p style={{ color: 'var(--success-color)', marginTop: '0.75rem' }}>Thanks! We’ll get back to you within 24 hours.</p>
          )}
        </form>

        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Email</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>support@learnsphere.com</p>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Community</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Join our Discord to connect with mentors and peers.</p>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Office</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Remote-first, global team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;


