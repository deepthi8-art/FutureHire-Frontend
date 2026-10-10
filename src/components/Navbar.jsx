import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Sun,
  Moon,
  Bell,
  LogOut,
  Menu,
  Search
} from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout, theme, toggleTheme, notifications, markNotificationAsRead } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const isDashboard = location.pathname.startsWith('/student') || location.pathname.startsWith('/admin');
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0 1.75rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

        {/* Left: Sidebar Toggle + Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {isDashboard && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              style={{
                width: '34px', height: '34px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)', background: 'var(--bg-input)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)', transition: 'var(--transition)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-500)'; e.currentTarget.style.color = 'var(--teal-600)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              aria-label="Toggle Sidebar"
            >
              <Menu size={18} />
            </button>
          )}

          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="brand-name">FutureHire</span>
              <span className="brand-tagline">Placement Portal</span>
            </div>
          </Link>
        </div>

        {/* Center: Search (dashboard) or Public Nav Links */}
        {isDashboard ? (
          <div className="search-container" style={{ maxWidth: '360px', width: '100%', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search problems, companies, resources..."
              className="form-input"
              style={{ paddingLeft: '2.2rem', height: '36px', fontSize: '0.83rem' }}
            />
          </div>
        ) : (
          <div className="desktop-links" style={{ gap: '1.75rem' }}>
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/#features', label: 'Features', isAnchor: true },
              { to: '/#contact', label: 'Contact', isAnchor: true },
            ].map(({ to, label, isAnchor }) =>
              isAnchor ? (
                <a
                  key={label}
                  href={to}
                  className="nav-link-item"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link-item${location.pathname === to ? ' active' : ''}`}
                >
                  {label}
                </Link>
              )
            )}
          </div>
        )}

        {/* Right: Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Theme"
            style={{
              width: '34px', height: '34px', borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)', background: 'var(--bg-input)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)', transition: 'var(--transition)',
            }}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} style={{ color: '#F59E0B' }} />}
          </button>

          {/* Notifications Bell */}
          {isDashboard && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                title="Notifications"
                style={{
                  width: '34px', height: '34px', borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)', background: 'var(--bg-input)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-muted)', position: 'relative',
                  transition: 'var(--transition)',
                }}
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-2px', right: '-2px',
                    backgroundColor: '#EF4444', color: 'white',
                    fontSize: '0.6rem', fontWeight: '800',
                    width: '16px', height: '16px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div
                  className="card"
                  style={{
                    position: 'absolute', right: 0, top: '42px',
                    width: '310px', padding: '1rem', zIndex: 60,
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-title)' }}>Notifications</span>
                    <Link
                      to="/student/notifications"
                      style={{ fontSize: '0.75rem', color: 'var(--teal-600)', fontWeight: '600' }}
                      onClick={() => setShowNotifMenu(false)}
                    >
                      View All
                    </Link>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '0.5rem 0' }}>No notifications.</p>
                    ) : (
                      notifications.slice(0, 3).map(n => (
                        <div
                          key={n.id}
                          style={{
                            padding: '0.5rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: n.read ? 'transparent' : 'var(--teal-50)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s',
                          }}
                          onClick={() => markNotificationAsRead(n.id)}
                        >
                          <div style={{ fontWeight: '600', color: 'var(--text-title)', marginBottom: '0.1rem' }}>{n.title}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Auth: User chip or Login/Register buttons */}
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.3rem 0.75rem 0.3rem 0.35rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-400)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  backgroundColor: user.role === 'admin' ? 'var(--teal-700)' : 'var(--teal-500)',
                  color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '0.78rem', flexShrink: 0,
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-title)', lineHeight: 1.2 }}>{user.name}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--teal-600)', lineHeight: 1.2 }}>
                    {user.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  width: '34px', height: '34px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)', background: 'var(--bg-input)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-muted)', transition: 'var(--transition)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF4444'; e.currentTarget.style.color = '#EF4444'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register Free</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
