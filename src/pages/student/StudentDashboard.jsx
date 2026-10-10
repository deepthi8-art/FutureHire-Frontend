import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import {
  Code,
  Brain,
  Video,
  Trophy,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const StudentDashboard = () => {
  const { user, codingProblems, codingProgress, quizResults, mockInterviews } = useAuth();

  const solvedCount = codingProgress?.solvedCount || 0;
  const upcomingMocks = mockInterviews.filter(m => m.status === 'Available' || m.status === 'Booked');
  const completedMocks = mockInterviews.filter(m => m.status === 'Completed');
  const quizAverage = quizResults.length
    ? Math.round(quizResults.reduce((sum, result) => sum + result.percentage, 0) / quizResults.length)
    : null;
  const ratedMocks = completedMocks.filter(mock => mock.feedback?.rating != null);
  const averageRating = ratedMocks.length
    ? (ratedMocks.reduce((sum, mock) => sum + mock.feedback.rating, 0) / ratedMocks.length).toFixed(1)
    : null;
  const activityData = [
    { name: 'Accepted solutions', count: solvedCount },
    { name: 'Quiz results', count: quizResults.length },
    { name: 'Completed mocks', count: completedMocks.length }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-600) 100%)',
          color: '#FFF',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> Student Portal
          </div>
          <h1 style={{ fontSize: '2rem', color: '#FFF', marginBottom: '0.5rem' }}>
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Your preparation activity and interview bookings are synced to your account.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/student/coding-practice" className="btn btn-secondary btn-sm" style={{ color: 'var(--primary-700)', fontWeight: '700' }}>
              Practice Coding <ArrowRight size={16} />
            </Link>
            <Link to="/student/mock-interviews" className="btn btn-outline btn-sm" style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.6)' }}>
              Book Mock Interview
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4">
        <StatCard
          title="Accepted Solutions"
          value={`${solvedCount} / ${codingProgress?.totalProblems ?? codingProblems.length}`}
          icon={Code}
          color="primary"
          description="Automated code evaluation is not enabled"
        />
        <StatCard
          title="Aptitude Score"
          value={quizAverage == null ? '—' : `${quizAverage}%`}
          icon={Brain}
          color="purple"
          description={`Average across ${quizResults.length} submitted quizzes`}
        />
        <StatCard
          title="Mock Interviews"
          value={`${completedMocks.length} Done`}
          icon={Video}
          color="cyan"
          description={averageRating ? `${averageRating}/5 average mentor rating` : 'No rated interviews yet'}
        />
        <StatCard
          title="Readiness Score"
          value="—"
          icon={Trophy}
          color="emerald"
          description="Composite readiness scoring is not configured"
        />
      </div>

      {/* Main Grid: Chart & Upcoming */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        
        {/* Progress Recharts */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Recorded Preparation Activity</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current saved results and bookings</p>
            </div>
            <Link to="/student/progress" className="btn btn-outline btn-sm">
              Full Analytics
            </Link>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCoding" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#20A69A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#20A69A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#20A69A" strokeWidth={3} fillOpacity={1} fill="url(#colorCoding)" name="Saved records" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Mock Interviews */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Upcoming Mocks</h3>
            <Link to="/student/mock-interviews" style={{ fontSize: '0.78rem', color: 'var(--primary-600)', fontWeight: '700' }}>
              View All
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
            {upcomingMocks.slice(0, 2).map((m) => (
              <div
                key={m.id}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-title)' }}>
                  {m.type}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {m.mentorName} ({m.mentorTitle})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--primary-600)', fontWeight: '600' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={13} /> {m.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} /> {m.time}
                  </span>
                </div>
              </div>
            ))}

            <Link
              to="/student/mock-interviews"
              className="btn btn-primary btn-sm"
              style={{ marginTop: 'auto', textAlign: 'center', justifyContent: 'center' }}
            >
              + Book New Interview Slot
            </Link>
          </div>
        </div>

      </div>

      {/* Quick Access Modules Bar */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Preparation Shortcuts</h3>
        <div className="grid-4">
          <Link to="/student/coding-practice" className="card card-hover" style={{ textDecoration: 'none', padding: '1rem' }}>
            <Code size={22} style={{ color: 'var(--primary-600)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Coding Practice</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Solve DSA problems</div>
          </Link>
          <Link to="/student/aptitude-practice" className="card card-hover" style={{ textDecoration: 'none', padding: '1rem' }}>
            <Brain size={22} style={{ color: 'var(--teal-600)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Aptitude Tests</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Timed quizzes</div>
          </Link>
          <Link to="/student/company-info" className="card card-hover" style={{ textDecoration: 'none', padding: '1rem' }}>
            <Trophy size={22} style={{ color: 'var(--amber-500)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Company Info</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Criteria & questions</div>
          </Link>
          <Link to="/student/resume" className="card card-hover" style={{ textDecoration: 'none', padding: '1rem' }}>
            <BookOpen size={22} style={{ color: 'var(--cyan-600)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Resume Scan</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ATS Score & feedback</div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
