import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Trophy, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="app-container">
      <Navbar />

      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--teal-700)', textTransform: 'uppercase' }}>About FutureHire</span>
          <h1 style={{ fontSize: '2.75rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
            Empowering Next-Gen Engineers to <span className="gradient-text">Conquer Campus Placements</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            FutureHire was created by educators and tech industry leaders to bridge the gap between academic curriculum and high-stakes corporate campus hiring tests. We provide an end-to-end placement ecosystem with structured learning paths.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '1rem' }}>Our Core Mission</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                Every engineering student deserves equal access to top-tier preparation materials, live interview practice, and clear guidance regardless of their college location.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle size={18} style={{ color: 'var(--emerald-500)' }} /> Curated Data Structures & Algorithms path
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle size={18} style={{ color: 'var(--emerald-500)' }} /> Automated Aptitude evaluation with detailed solutions
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle size={18} style={{ color: 'var(--emerald-500)' }} /> Realistic mock interview environment with feedback
                </li>
              </ul>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1.2rem' }}>Platform Stats at a Glance</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--teal-50)', color: 'var(--teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>50,000+ Students</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered across 180+ engineering colleges</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--teal-50)', color: 'var(--teal-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trophy size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>500+ Hiring Partners</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top Product & Service tech leaders</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--emerald-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>98.4% Placement Rate</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Students completing 80%+ roadmap goals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
