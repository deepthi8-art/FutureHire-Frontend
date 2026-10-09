import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Brain,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  X
} from 'lucide-react';

const AptitudePractice = () => {
  const { aptitudeQuizzes, showToast } = useAuth();

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  useEffect(() => {
    let timer;
    if (activeQuiz && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeQuiz, isSubmitted, timeLeft]);

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
    setTimeLeft(quiz.durationMinutes * 60);
    showToast(`Started "${quiz.title}". Good luck!`, 'info');
  };

  const handleOptionSelect = (qId, optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    setIsSubmitted(true);

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / activeQuiz.questions.length) * 100);
    setScoreResult({
      correct: correctCount,
      total: activeQuiz.questions.length,
      percentage
    });

    if (percentage >= 70) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }

    showToast(`Quiz Submitted! You scored ${correctCount}/${activeQuiz.questions.length} (${percentage}%)`, 'success');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>Aptitude Practice & Speed Tests</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Timed quizzes covering Quantitative Aptitude, Logical Reasoning, and Verbal Ability
        </p>
      </div>

      {/* Quiz List Mode */}
      {!activeQuiz && (
        <div className="grid-3">
          {aptitudeQuizzes.map((quiz) => (
            <div key={quiz.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
                  {quiz.category}
                </span>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{quiz.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <HelpCircle size={15} /> {quiz.questions.length} Questions
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={15} /> {quiz.durationMinutes} Mins
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleStartQuiz(quiz)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.65rem' }}
              >
                Start Timed Quiz <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Quiz Active Mode */}
      {activeQuiz && (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          
          {/* Quiz Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            <div>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{activeQuiz.category}</span>
              <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>{activeQuiz.title}</h3>
            </div>

            {!isSubmitted && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: timeLeft < 60 ? 'rgba(244, 63, 94, 0.15)' : 'var(--bg-input)',
                  color: timeLeft < 60 ? 'var(--rose-500)' : 'var(--text-title)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: '800',
                  fontSize: '0.95rem'
                }}
              >
                <Clock size={18} /> {formatTime(timeLeft)}
              </div>
            )}
          </div>

          {/* Quiz Score Header if submitted */}
          {isSubmitted && scoreResult && (
            <div
              style={{
                backgroundColor: scoreResult.percentage >= 70 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                border: `1px solid ${scoreResult.percentage >= 70 ? 'var(--emerald-500)' : 'var(--amber-500)'}`,
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}
            >
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
                Score: {scoreResult.correct} / {scoreResult.total} ({scoreResult.percentage}%)
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {scoreResult.percentage >= 70
                  ? '🌟 Excellent performance! Ready for top placement aptitude rounds.'
                  : 'Keep practicing! Review the detailed explanations below.'}
              </p>
            </div>
          )}

          {/* Question Navigation & Question Box */}
          {activeQuiz.questions.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Question {currentQIndex + 1} of {activeQuiz.questions.length}</span>
                <span>Category: {activeQuiz.category}</span>
              </div>

              {/* Question Text */}
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                {activeQuiz.questions[currentQIndex].question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {activeQuiz.questions[currentQIndex].options.map((opt, optIdx) => {
                  const q = activeQuiz.questions[currentQIndex];
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;

                  let optBg = 'var(--bg-input)';
                  let border = '1px solid var(--border-color)';
                  let color = 'var(--text-title)';

                  if (isSelected) {
                    optBg = 'rgba(79, 70, 229, 0.15)';
                    border = '1px solid var(--primary-600)';
                  }

                  if (isSubmitted) {
                    if (isCorrect) {
                      optBg = 'rgba(16, 185, 129, 0.2)';
                      border = '1px solid var(--emerald-500)';
                    } else if (isSelected && !isCorrect) {
                      optBg = 'rgba(244, 63, 94, 0.2)';
                      border = '1px solid var(--rose-500)';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(q.id, optIdx)}
                      style={{
                        padding: '0.85rem 1.1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: optBg,
                        border,
                        color,
                        textAlign: 'left',
                        fontSize: '0.925rem',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: isSubmitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'var(--transition)'
                      }}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrect && <Check size={18} style={{ color: 'var(--emerald-500)' }} />}
                      {isSubmitted && isSelected && !isCorrect && <X size={18} style={{ color: 'var(--rose-500)' }} />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section if submitted */}
              {isSubmitted && (
                <div style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                  <strong style={{ color: 'var(--primary-600)' }}>Explanation:</strong>
                  <p style={{ marginTop: '0.25rem', color: 'var(--text-body)' }}>
                    {activeQuiz.questions[currentQIndex].explanation}
                  </p>
                </div>
              )}

              {/* Next / Previous Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="btn btn-secondary btn-sm"
                >
                  <ArrowLeft size={16} /> Previous
                </button>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {currentQIndex < activeQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="btn btn-secondary btn-sm"
                    >
                      Next Question <ArrowRight size={16} />
                    </button>
                  ) : !isSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="btn btn-primary btn-sm"
                    >
                      Submit Quiz Now
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveQuiz(null)}
                      className="btn btn-outline btn-sm"
                    >
                      Back to Quizzes List
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AptitudePractice;
