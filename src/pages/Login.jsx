import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Login = () => {
  const { login, showToast } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login({ email, password, role });
      if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoStudent = () => {
    setRole('student');
    setEmail('alex.morgan@university.edu');
    setPassword('student123');
    showToast('Demo Student credentials loaded!', 'info');
  };

  const fillDemoAdmin = () => {
    setRole('admin');
    setEmail('admin@futurehire.org');
    setPassword('admin123');
    showToast('Demo Admin credentials loaded!', 'info');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your email.', 'error');
      return;
    }
    showToast(`Password reset link sent to ${forgotEmail}`, 'success');
    setShowForgotModal(false);
    setForgotEmail('');
  };

  return (
    <div className="app-container">
      <Navbar />

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1rem',
          background: 'radial-gradient(circle at 50% 30%, rgba(32, 166, 154, 0.07) 0%, transparent 70%)'
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: '460px',
            width: '100%',
            padding: '2.25rem',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-500) 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                marginBottom: '0.75rem'
              }}
            >
              <GraduationCap size={28} />
            </div>
            <h2 style={{ fontSize: '1.75rem' }}>Sign In to FutureHire</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Access your placement portal dashboard
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              padding: '0.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <button
              type="button"
              onClick={() => setRole('student')}
              style={{
                flex: 1,
                padding: '0.55rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                backgroundColor: role === 'student' ? 'var(--bg-card)' : 'transparent',
                color: role === 'student' ? 'var(--teal-600)' : 'var(--text-muted)',
                boxShadow: role === 'student' ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <UserCheck size={16} /> Student Login
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              style={{
                flex: 1,
                padding: '0.55rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                backgroundColor: role === 'admin' ? 'var(--bg-card)' : 'transparent',
                color: role === 'admin' ? 'var(--teal-800)' : 'var(--text-muted)',
                boxShadow: role === 'admin' ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <ShieldCheck size={16} /> Admin Portal
            </button>
          </div>

          {/* 1-Click Quick Demo Bar */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              padding: '0.65rem',
              backgroundColor: 'rgba(32, 166, 154, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--teal-200)',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-title)' }}>Quick Demo:</span>
            <button
              type="button"
              onClick={fillDemoStudent}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
            >
              Student Demo
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', color: 'var(--teal-800)', borderColor: 'var(--teal-800)' }}
            >
              Admin Demo
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  placeholder={role === 'admin' ? 'admin@futurehire.org' : 'student@university.edu'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-600)', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--teal-500)', width: '16px', height: '16px' }}
              />
              <label htmlFor="remember" style={{ fontSize: '0.85rem', color: 'var(--text-body)', cursor: 'pointer' }}>
                Remember me on this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
            >
              {loading ? 'Authenticating...' : (
                <>Sign In to Dashboard <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Don't have a student account?{' '}
            <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: '700' }}>
              Register Here
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Reset Password</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Enter your registered email address and we will send you a password recovery link.
            </p>
            <form onSubmit={handleForgotSubmit}>
              <div className="form-group">
                <label className="form-label">Registered Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="form-input"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setShowForgotModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
