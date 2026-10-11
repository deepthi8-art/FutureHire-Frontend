
import React, { useEffect, useState } from 'react';
import { Activity, Award, BookOpen, RefreshCw, TrendingUp } from 'lucide-react';
import { portalService } from '../../services/portalService';

export default function ProgressTracker() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProgress = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await portalService.getProgress();
      setProgress(data);
    } catch (err) {
      setError(err.message || 'Unable to load your progress.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading your progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Progress Tracker</h1>
        <p role="alert">{error}</p>
        <button type="button" onClick={loadProgress}>
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  const quizAttempts = progress?.quizAttempts ?? progress?.totalQuizAttempts ?? 0;
  const averageScore = progress?.averageScore ?? 0;
  const completedInterviews =
    progress?.completedInterviews ?? progress?.interviewsCompleted ?? 0;
  const resumeAnalyses =
    progress?.resumeAnalyses ?? progress?.totalResumeAnalyses ?? 0;
  const activities = progress?.activities ?? progress?.recentActivities ?? [];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Progress Tracker</h1>
        <p>Review your learning activity and interview preparation progress.</p>
        <button type="button" onClick={loadProgress}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="stats-grid">
        <article className="card">
          <BookOpen size={24} />
          <h2>Quiz Attempts</h2>
          <p className="stat-value">{quizAttempts}</p>
        </article>

        <article className="card">
          <Award size={24} />
          <h2>Average Quiz Score</h2>
          <p className="stat-value">{Number(averageScore).toFixed(1)}%</p>
        </article>

        <article className="card">
          <Activity size={24} />
          <h2>Interviews Completed</h2>
          <p className="stat-value">{completedInterviews}</p>
        </article>

        <article className="card">
          <TrendingUp size={24} />
          <h2>Resume Analyses</h2>
          <p className="stat-value">{resumeAnalyses}</p>
        </article>
      </div>

      <section className="card">
        <h2>Recent Activity</h2>

        {activities.length === 0 ? (
          <p>No activity recorded yet. Complete a quiz or practice interview to get started.</p>
        ) : (
          <ul className="activity-list">
            {activities.map((activity, index) => (
              <li key={activity.id ?? `${activity.type}-${index}`}>
                <strong>
                  {activity.title || activity.type || 'Learning activity'}
                </strong>
                <p>
                  {activity.description ||
                    activity.message ||
                    'Activity recorded'}
                </p>
                {activity.date && (
                  <time>
                    {new Date(activity.date).toLocaleDateString()}
                  </time>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
