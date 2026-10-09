import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      id="contact"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '4rem 2rem 2rem 2rem',
        marginTop: 'auto'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-500) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF'
                }}
              >
                <GraduationCap size={24} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '800' }} className="gradient-text">
                FutureHire
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Empowering college students with real-world coding problems, automated aptitude evaluations, resume scanning, and mock interviews to crack top tech campus placements.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.45rem' }}>
                <Linkedin size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.45rem' }}>
                <Github size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.45rem' }}>
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-title)' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-muted)' }}>About Us</Link></li>
              <li><a href="#features" style={{ color: 'var(--text-muted)' }}>Features</a></li>
              <li><Link to="/login" style={{ color: 'var(--text-muted)' }}>Student Login</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-muted)' }}>Student Registration</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-title)' }}>
              Preparation Modules
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><Link to="/student/coding-practice" style={{ color: 'var(--text-muted)' }}>Coding Practice</Link></li>
              <li><Link to="/student/aptitude-practice" style={{ color: 'var(--text-muted)' }}>Aptitude Tests</Link></li>
              <li><Link to="/student/company-info" style={{ color: 'var(--text-muted)' }}>Company Insights</Link></li>
              <li><Link to="/student/resume" style={{ color: 'var(--text-muted)' }}>ATS Resume Scanner</Link></li>
              <li><Link to="/student/mock-interviews" style={{ color: 'var(--text-muted)' }}>Mock Interviews</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-title)' }}>
              Placement Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} style={{ color: 'var(--teal-500)' }} /> support@futurehire.edu
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--teal-500)' }} /> +91 1800-FUTURE-HIRE
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--teal-500)', marginTop: '3px' }} /> Tech Park Hub, University Campus, Bangalore - 560100
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)'
          }}
        >
          <p>© 2026 FutureHire Placement Preparation Portal. All Rights Reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with <Heart size={14} style={{ color: 'var(--rose-500)', fill: 'var(--rose-500)' }} /> for Campus Placements
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
