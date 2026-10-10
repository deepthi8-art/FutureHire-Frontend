import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  CheckCircle,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line
} from 'recharts';
const ProgressTracker = () => {
  const { codingProblems, codingProgress, quizResults, mockInterviews, resumeData } = useAuth();

  const solvedCount = codingProgress?.solvedCount || 0;
  const totalProblems = codingProgress?.totalProblems ?? codingProblems.length;
  const averageQuizScore = quizResults.length
    ? Math.round(quizResults.reduce((sum, result) => sum + result.percentage, 0) / quizResults.length)
    : null;
  const completedMocks = mockInterviews.filter(mock => mock.status === 'Completed');
  const ratedMocks = completedMocks.filter(mock => mock.feedback?.rating != null);
  const averageRating = ratedMocks.length
    ? (ratedMocks.reduce((sum, mock) => sum + mock.feedback.rating, 0) / ratedMocks.length).toFixed(1)
    : null;
  const activityData = [
    { name: 'Accepted solutions', value: solvedCount },
    { name: 'Quiz results', value: quizResults.length },
    { name: 'Completed mocks', value: completedMocks.length }
  ];
  const quizScoreData = quizResults.map((result, index) => ({
    name: result.quiz?.title || `Quiz ${index + 1}`,
    percentage: result.percentage
  }));

  const checklistItems = [
    { id: 1, text: 'Upload a resume', done: !!resumeData },
    { id: 2, text: 'Submit an aptitude quiz', done: quizResults.length > 0 },
    { id: 3, text: 'Book a mock interview', done: mockInterviews.some(mock => ['Booked', 'Completed'].includes(mock.status)) },
    { id: 4, text: 'Complete a rated mock interview', done: ratedMocks.length > 0 },
    { id: 5, text: 'Solve 100+ coding problems', done: solvedCount >= 100 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>Placement Readiness & Progress Tracker</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Progress based on saved activity and server-returned results
        </p>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid-4">
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>OVERALL READINESS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-600)', margin: '0.2rem 0' }}>—</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Scoring not configured</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>CODING STATUS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--purple-600)', margin: '0.2rem 0' }}>
            {solvedCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {totalProblems}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Accepted solutions</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>AVG APTITUDE SCORE</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--cyan-600)', margin: '0.2rem 0' }}>{averageQuizScore == null ? '—' : `${averageQuizScore}%`}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average across {quizResults.length} results</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>MOCK RATING</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--amber-500)', margin: '0.2rem 0' }}>{averageRating ? `${averageRating} / 5` : '—'}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Based on {ratedMocks.length} mentor ratings</div>
        </div>
      </div>

      {/* Recharts Bar & Line Charts */}
      <div className="grid-2">
        
        {/* Chart 1: Saved activity */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Recorded Preparation Activity</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#0F766E" radius={[6, 6, 0, 0]} name="Records" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Persisted quiz scores */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Submitted Quiz Scores</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quizScoreData}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="percentage" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} name="Score %" />
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
