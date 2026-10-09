import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Bell,
  CheckCircle,
  Clock,
  Sparkles,
  Calendar,
  AlertCircle,
  CheckCheck
} from 'lucide-react';

const Notifications = () => {
  const { notifications, setNotifications, markNotificationAsRead, showToast } = useAuth();

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Announcements & Notifications</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Stay updated with campus placement drives, contest announcements, and interview reminders
          </p>
        </div>

        <button onClick={handleMarkAllRead} className="btn btn-secondary btn-sm">
          <CheckCheck size={16} /> Mark All as Read
        </button>
      </div>

      {/* Notifications Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {notifications.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
            <Bell size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
            <p>No notifications available.</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className="card"
              style={{
                backgroundColor: n.read ? 'var(--bg-card)' : 'rgba(79, 70, 229, 0.06)',
                borderLeft: `4px solid ${n.type === 'placement' ? 'var(--primary-600)' : n.type === 'challenge' ? 'var(--purple-600)' : 'var(--amber-500)'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-title)' }}>
                    {n.title}
                  </span>
                  {!n.read && (
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>NEW</span>
                  )}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', marginBottom: '0.35rem' }}>
                  {n.message}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={12} /> {n.time}
                </div>
              </div>

              {!n.read && (
                <button
                  onClick={() => markNotificationAsRead(n.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Notifications;
