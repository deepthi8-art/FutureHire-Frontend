import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Code,
  Brain,
  Building2,
  FileText,
  MessageSquareQuote,
  Video,
  TrendingUp,
  BookOpen,
  Bell,
  Users,
  HelpCircle,
  Building,
  FolderGit2,
  BarChart3,
  CalendarCheck,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, notifications } = useAuth();
  const isAdmin = user?.role === 'admin';
  const unreadCount = notifications.filter(n => !n.read).length;

  const studentLinks = [
    { path: '/student/dashboard',             label: 'Dashboard',            icon: LayoutDashboard },
    { path: '/student/coding-practice',       label: 'Coding Practice',      icon: Code },
    { path: '/student/aptitude-practice',     label: 'Aptitude Practice',    icon: Brain },
    { path: '/student/company-info',          label: 'Company Info',         icon: Building2 },
    { path: '/student/resume',                label: 'Resume Management',    icon: FileText },
    { path: '/student/interview-experiences', label: 'Interview Experiences',icon: MessageSquareQuote },
    { path: '/student/mock-interviews',       label: 'Mock Interviews',      icon: Video },
    { path: '/student/progress',              label: 'Progress Tracker',     icon: TrendingUp },
    { path: '/student/resources',             label: 'Study Resources',      icon: BookOpen },
    { path: '/student/notifications',         label: 'Notifications',        icon: Bell, badge: unreadCount },
  ];

  const adminLinks = [
    { path: '/admin/dashboard',       label: 'Admin Dashboard',     icon: LayoutDashboard },
    { path: '/admin/users',           label: 'Manage Users',        icon: Users },
    { path: '/admin/questions',       label: 'Manage Questions',    icon: HelpCircle },
    { path: '/admin/companies',       label: 'Manage Companies',    icon: Building },
    { path: '/admin/resources',       label: 'Manage Resources',    icon: FolderGit2 },
    { path: '/admin/reports',         label: 'View Reports',        icon: BarChart3 },
    { path: '/admin/mock-interviews', label: 'Mock Interviews',     icon: CalendarCheck },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside
      className="sidebar-nav"
      style={{ width: '256px', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}
    >
      {/* Role Header */}
      <div className="sidebar-header">
        <div className="sidebar-role-badge">
          <div className="role-icon">
            {isAdmin
              ? <ShieldCheck size={17} />
              : <GraduationCap size={17} />}
          </div>
          <div>
            <div className="role-label">
              {isAdmin ? 'Admin Control' : 'Student Portal'}
            </div>
            <div className="role-sub">
              {isAdmin ? 'System Administration' : 'Campus Placement Prep'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav-list">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
            >
              <span className="link-icon">
                <Icon size={17} />
                <span>{link.label}</span>
              </span>
              {link.badge > 0 && (
                <span
                  style={{
                    backgroundColor: '#EF4444',
                    color: '#FFF',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    padding: '0.12rem 0.42rem',
                    borderRadius: '999px',
                    lineHeight: 1.4,
                  }}
                >
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p style={{ fontWeight: '600', color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>
          FutureHire v2.4
        </p>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.68rem', marginTop: '0.1rem' }}>
          © 2026 Placement Portal
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
