import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Code,
  Brain,
  Video,
  CheckCircle,
  Clock,
  Target,
  Trophy,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { progressChartData } from '../../data/mockData';

const ProgressTracker = () => {
  const { codingProblems, aptitudeQuizzes, mockInterviews, quizResults, resumeData } = useAuth();

  const totalCoding = (codingProblems || []).length || 1;
  const solvedCount = (codingProblems || []).filter(p => p.solved).length;
  const pendingCount = totalCoding - solvedCount;

  const avgAptitude = quizResults && quizResults.length > 0
    ? Math.round(quizResults.reduce((acc, q) => acc + (q.percentage || 0), 0) / quizResults.length)
    : 85;

  const completedMocksCount = (mockInterviews || []).filter(m => (m.status || '').toLowerCase() === 'completed').length;
  const bookedMocksCount = (mockInterviews || []).filter(m => (m.status || '').toLowerCase() === 'booked').length;

  const codingWeight = (solvedCount / totalCoding) * 35;
  const aptitudeWeight = (avgAptitude / 100) * 30;
  const resumeWeight = resumeData ? 20 : 5;
  const mockWeight = Math.min(15, (completedMocksCount + bookedMocksCount) * 5 + 5);
  const readinessScore = Math.min(100, Math.max(20, Math.round(codingWeight + aptitudeWeight + resumeWeight + mockWeight)));

  const tierQualification = readinessScore >= 80 ? 'Tier-1 Qualified' : (readinessScore >= 60 ? 'Tier-2 Qualified' : 'OA Preparation Active');

  const checklistItems = [
    { id: 1, text: 'Complete Profile & Target Companies', done: true },
    { id: 2, text: 'Solve First Algorithm Problem', done: solvedCount > 0 },
    { id: 3, text: 'Score 75%+ on Aptitude Quizzes', done: (quizResults || []).some(q => (q.percentage || 0) >= 75) || avgAptitude >= 75 },
    { id: 4, text: 'Upload & Scan Resume for ATS Score', done: !!resumeData },
    { id: 5, text: 'Book or Complete Virtual Mock Interview', done: (completedMocksCount + bookedMocksCount) > 0 },
    { id: 6, text: 'Attain Placement Readiness Score > 75%', done: readinessScore >= 75 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>Placement Readiness & Progress Tracker</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Detailed visual analytics, weekly problem solving velocity, and placement milestone checklist
        </p>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid-4">
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>OVERALL READINESS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-600)', margin: '0.2rem 0' }}>{readinessScore}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald-500)', fontWeight: '600' }}>{tierQualification}</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>CODING STATUS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--purple-600)', margin: '0.2rem 0' }}>
            {solvedCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {totalCoding}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pendingCount} Pending</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>AVG APTITUDE SCORE</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--cyan-600)', margin: '0.2rem 0' }}>{avgAptitude}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across Quant, Logical & Verbal</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>MOCK RATING</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--amber-500)', margin: '0.2rem 0' }}>{completedMocksCount > 0 ? '4.8 ★' : (bookedMocksCount > 0 ? 'Upcoming' : 'Ready')}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{completedMocksCount} Completed • {bookedMocksCount} Booked</div>
        </div>
      </div>

      {/* Recharts Bar & Line Charts */}
      <div className="grid-2">
        
        {/* Chart 1: Monthly Problem Solved */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Monthly Problem Solved Growth</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressChartData}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="codingSolved" fill="#6366F1" radius={[6, 6, 0, 0]} name="Coding Solved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Aptitude Score Trend */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Aptitude Test Score Accuracy (%)</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressChartData}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="aptitudeScore" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} name="Accuracy %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Milestone Checklist */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Placement Preparation Milestone Checklist</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {checklistItems.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: item.done ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-input)',
                border: `1px solid ${item.done ? 'var(--emerald-500)' : 'var(--border-color)'}`
              }}
            >
              {item.done ? (
                <CheckCircle size={20} style={{ color: 'var(--emerald-500)' }} />
              ) : (
                <Clock size={20} style={{ color: 'var(--amber-500)' }} />
              )}
              <span style={{ fontWeight: item.done ? '700' : '500', fontSize: '0.9rem', textDecoration: item.done ? 'none' : 'none' }}>
                {item.text}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: '700', color: item.done ? 'var(--emerald-500)' : 'var(--amber-500)' }}>
                {item.done ? 'COMPLETED' : 'IN PROGRESS'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProgressTracker;
