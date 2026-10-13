import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code, Brain, FileText, Video, Building2,
  ArrowRight, Target, Trophy, Users, Star,
  CheckCircle2, Sparkles, BookOpen, TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const featureData = [
  {
    icon: Code,
    label: 'Coding Practice',
    desc: 'LeetCode-styled interface with syntax highlighting, custom test cases, sample I/O, and instant execution in JS, Java & Python.',
    bg: 'var(--teal-50)', color: 'var(--teal-600)',
  },
  {
    icon: Brain,
    label: 'Aptitude Tests',
    desc: 'Timed quizzes covering Quantitative Aptitude, Logical Reasoning and Verbal Ability to sharpen campus-drive performance.',
    bg: 'rgba(245,158,11,0.1)', color: '#D97706',
  },
  {
    icon: FileText,
    label: 'Resume Builder',
    desc: 'Upload your PDF resume and get an instant ATS compatibility score with keyword gap analysis for top hiring companies.',
    bg: 'rgba(16,185,129,0.1)', color: '#059669',
  },
  {
    icon: Video,
    label: 'Mock Interviews',
    desc: 'Book 1-on-1 virtual technical & HR interviews with industry mentors and receive detailed improvement feedback.',
    bg: 'var(--teal-50)', color: 'var(--teal-600)',
  },
  {
    icon: Building2,
    label: 'Company Intel',
    desc: 'Deep profiles on 500+ hiring companies — eligibility criteria, salary packages, past interview questions and roadmaps.',
    bg: 'rgba(239,68,68,0.08)', color: '#DC2626',
  },
  {
    icon: TrendingUp,
    label: 'Progress Tracker',
    desc: 'Visual analytics on solved problems, quiz scores over time, placement readiness score and weekly milestones.',
    bg: 'rgba(245,158,11,0.1)', color: '#D97706',
  },
];

const Home = () => {
  return (
    <div className="app-container">
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          padding: '5rem 2rem 3.5rem',
          backgroundColor: 'var(--bg-main)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative blob */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-60px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(32,166,154,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18,59,58,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>
          {/* Eyebrow badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.35rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--teal-50)',
            color: 'var(--teal-700)',
            fontSize: '0.82rem', fontWeight: '700',
            marginBottom: '1.5rem',
            border: '1px solid var(--teal-100)',
          }}>
            <Sparkles size={14} />
            #1 Placement Preparation Portal for Engineers
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--teal-800)',
            marginBottom: '1.25rem',
          }}>
            Your Future Starts With the{' '}
            <span className="gradient-text">Right Preparation</span>
          </h1>

          <p style={{
            fontSize: '1.1rem', color: 'var(--text-muted)',
            marginBottom: '2.25rem', lineHeight: 1.7,
            maxWidth: '680px', margin: '0 auto 2.25rem',
          }}>
            FutureHire equips engineering students with real-world DSA challenges,
            timed aptitude quizzes, ATS resume scanning, company intelligence, and
            1-on-1 mock interviews — everything to land your dream tech job.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              Explore Features
            </a>
          </div>

          {/* Preview card strip */}
          <div className="card" style={{
            marginTop: '3.5rem', padding: '1.25rem',
            boxShadow: '0 16px 40px rgba(18,59,58,0.10)',
            borderColor: 'var(--teal-100)',
          }}>
            <div className="grid-3" style={{ textAlign: 'left' }}>
              {[
                { label: 'Live Practice', title: '250+ Curated DSA Problems', desc: 'Easy → Hard with live code runner in JS, Java & Python.', bg: 'var(--teal-50)', color: 'var(--teal-700)' },
                { label: 'Company Rounds', title: 'Aptitude & Speed Tests', desc: 'Timed Quant, Logical & Verbal section speed drills.', bg: 'rgba(245,158,11,0.08)', color: '#B45309' },
                { label: '1-on-1 Mentorship', title: 'Mock Interviews', desc: 'Slots with Tech Leads from Amazon, Google & Microsoft.', bg: 'var(--teal-50)', color: 'var(--teal-600)' },
              ].map(({ label, title, desc, bg, color }) => (
                <div key={title} style={{ padding: '1rem', background: bg, borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                  <h4 style={{ fontSize: '1.05rem', marginTop: '0.3rem', color: 'var(--text-title)', fontFamily: 'var(--font-display)' }}>{title}</h4>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '4.5rem 2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--teal-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Comprehensive Toolkit
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.4rem', color: 'var(--teal-800)' }}>
              Everything to Master Campus Placement
            </h2>
          </div>
          <div className="grid-3">
            {featureData.map(({ icon: Icon, label, desc, bg, color }) => (
              <div key={label} className="card card-hover">
                <div style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-md)', backgroundColor: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.9rem' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.45rem', color: 'var(--text-title)', fontFamily: 'var(--font-display)' }}>{label}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '4.5rem 2rem', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--teal-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Step-by-Step Workflow
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.4rem', color: 'var(--teal-800)' }}>
              How FutureHire Works
            </h2>
          </div>
          <div className="grid-4">
            {[
              { step: '01', title: 'Register & Profile', desc: 'Create your account with college details and set target companies.', color: 'var(--teal-800)' },
              { step: '02', title: 'Practice & Learn', desc: 'Solve DSA problems, take aptitude tests, and read study resources.', color: 'var(--teal-500)' },
              { step: '03', title: 'Mock & Evaluate', desc: 'Scan your ATS resume and book 1-on-1 virtual mock interviews.', color: 'var(--teal-600)' },
              { step: '04', title: 'Get Placed', desc: 'Crack campus drives confidently and secure your dream tech offer.', color: '#059669' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: '800', color, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>{step}</div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.45rem', color: 'var(--text-title)', fontFamily: 'var(--font-display)' }}>{title}</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--teal-800)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {[
              { value: '98.4%', label: 'Campus Placement Rate' },
              { value: '50,000+', label: 'Active Student Learners' },
              { value: '500+', label: 'Hiring Partner Companies' },
              { value: '10,000+', label: 'Mock Interviews Conducted' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: '800', color: '#FFFFFF' }}>{value}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--teal-200)', marginTop: '0.25rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '4.5rem 2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--teal-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Success Stories
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.4rem', color: 'var(--teal-800)' }}>
              What Our Placed Students Say
            </h2>
          </div>
          <div className="grid-3">
            {[
              { quote: '"The mock interview feedback from an ex-Amazon engineer helped me refine my System Design skills. Placed at Amazon SDE-1 with 44 LPA!"', name: 'Rohan Sharma', role: 'SDE-1 at Amazon' },
              { quote: '"FutureHire\'s Aptitude quizzes with countdown timers boosted my speed dramatically. Cracked TCS Digital in my very first campus drive!"', name: 'Priya Patel', role: 'System Engineer at TCS Digital' },
              { quote: '"The ATS Resume Scanner identified missing keywords in my CV. Within a week of updating, I was shortlisted for Microsoft interview rounds!"', name: 'Ankit Verma', role: 'Software Engineer at Microsoft' },
            ].map(({ quote, name, role }) => (
              <div key={name} className="card" style={{ borderTop: '3px solid var(--teal-400)' }}>
                <div style={{ display: 'flex', gap: '0.2rem', color: '#F59E0B', marginBottom: '0.9rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" />)}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '1.1rem' }}>{quote}</p>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-title)' }}>{name}</div>
                <div style={{ fontSize: '0.77rem', color: 'var(--teal-600)', fontWeight: '600', marginTop: '0.1rem' }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--teal-50)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', color: 'var(--teal-800)', marginBottom: '1rem' }}>
            Ready to Start Your Placement Journey?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Join 50,000+ students who prepared smarter and landed top tech roles.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Student Login
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
