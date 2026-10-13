
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  Clock,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';

const AptitudePractice = () => {
  const { aptitudeQuizzes, showToast, setQuizResults } = useAuth();

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  const handleStartQuiz = async (quiz) => {
    try {
      const questions = await portalService.getQuizQuestions(quiz.rawId || quiz.id);
      if (!questions?.length) throw new Error('This quiz has no questions yet.');
      setActiveQuiz({ ...quiz, questions });
      setCurrentQIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setScoreResult(null);
      setTimeLeft((quiz.durationMinutes || 15) * 60);
      showToast(`Started "${quiz.title}". Good luck!`, 'info');
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Could not load this quiz.', 'error');
    }
  };

  const handleOptionSelect = (qId, optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const handleSubmitQuiz = useCallback(async () => {
    if (!activeQuiz || isSubmitted || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await portalService.submitQuiz(activeQuiz.rawId || activeQuiz.id, selectedAnswers);
      const percentage = Number(result.percentage);
      setScoreResult({ correct: result.score, total: result.totalQuestions, percentage });
      setIsSubmitted(true);
      setQuizResults(prev => [result, ...(prev || [])]);
      if (percentage >= 70) confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      showToast(`Quiz submitted. Score: ${result.score}/${result.totalQuestions} (${percentage}%).`, 'success');
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Quiz submission failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [activeQuiz, isSubmitted, isSubmitting, selectedAnswers, setQuizResults, showToast]);

  useEffect(() => {
    if (!activeQuiz || isSubmitted || timeLeft <= 0) return undefined;
    const timer = setTimeout(() => {
      if (timeLeft === 1) {
        setTimeLeft(0);
        handleSubmitQuiz();
      } else {
        setTimeLeft(current => current - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeQuiz, handleSubmitQuiz, isSubmitted, timeLeft]);

    const timer = setTimeout(() => {
      setTimeLeft(value => value - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeQuiz, isSubmitted, timeLeft]);

  useEffect(() => {
    if (
      activeQuiz &&
      !isSubmitted &&
      timeLeft === 0 &&
      questions.length > 0
    ) {
      submitQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, activeQuiz, isSubmitted, questions.length]);

  const startQuiz = async (quiz) => {
    setLoading(true);

    try {
      const loaded = await portalService.getQuizQuestions(quiz.id);

      if (!Array.isArray(loaded) || loaded.length === 0) {
        throw new Error('This quiz has no questions yet.');
      }

      setQuestions(loaded);
      setActiveQuiz(quiz);
      setCurrentQIndex(0);
      setAnswers({});
      setIsSubmitted(false);
      setResult(null);
      submitting.current = false;
      setTimeLeft((quiz.durationMinutes || 25) * 60);

      showToast(
        `Started "${quiz.title}" with ${loaded.length} questions.`,
        'success'
      );
    } catch (error) {
      showToast(error.message || 'Unable to load quiz questions.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionId, answer) => {
    if (isSubmitted) return;

    setAnswers(previous => ({
      ...previous,
      [questionId]: answer
    }));
  };

  const submitQuiz = async () => {
    if (submitting.current || !activeQuiz || questions.length === 0) {
      return;
    }

    submitting.current = true;
    setLoading(true);

    try {
      const payload = {
        quizId: activeQuiz.id,
        answers: questions.map(question => ({
          questionId: question.id,
          selectedAnswer:
            answers[question.id] ??
            answers[String(question.id)] ??
            null
        }))
      };

      const savedResult = await portalService.submitQuiz(payload);

      setResult(savedResult);
      setIsSubmitted(true);

      if (savedResult?.passed || Number(savedResult?.score) >= 70) {
        confetti();
      }

      showToast('Quiz submitted successfully!', 'success');
    } catch (error) {
      submitting.current = false;
      showToast(
        error.message || 'Could not submit the quiz. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setActiveQuiz(null);
    setQuestions([]);
    setCurrentQIndex(0);
    setAnswers({});
    setTimeLeft(0);
    setIsSubmitted(false);
    setResult(null);
    submitting.current = false;
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  if (!activeQuiz) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Aptitude Practice</h1>
          <p>Practice your skills and track your quiz performance.</p>
        </div>

        {aptitudeQuizzes?.length ? (
          <div className="quiz-grid">
            {aptitudeQuizzes.map(quiz => (
              <article className="card quiz-card" key={quiz.id}>
                <Brain size={28} />
                <h2>{quiz.title || quiz.name || 'Aptitude Quiz'}</h2>
                <p>{quiz.description || 'Test your aptitude skills.'}</p>
                <p>
                  <Clock size={16} />{' '}
                  {quiz.durationMinutes || 25} minutes
                </p>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => startQuiz(quiz)}
                >
                  {loading ? 'Loading...' : 'Start Quiz'}
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="card">
            <HelpCircle size={28} />
            <p>No quizzes are available right now.</p>
            <p>Please try again later.</p>
          </div>
        )}
      </div>
    );
  }

  if (isSubmitted) {
    const score = Number(result?.score ?? result?.percentage ?? 0);

    return (
      <div className="page-container">
        <div className="card quiz-result">
          <CheckCircle size={48} />
          <h1>Quiz Completed!</h1>
          <h2>{activeQuiz.title || activeQuiz.name}</h2>

          <p>
            Your score:{' '}
            <strong>{score}%</strong>
          </p>

          <p>
            Correct answers:{' '}
            {result?.correctAnswers ?? result?.correctCount ?? '—'}
          </p>

          <p>
            Questions attempted:{' '}
            {Object.keys(answers).length} of {questions.length}
          </p>

          <button type="button" onClick={restartQuiz}>
            <RotateCcw size={16} /> Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQIndex];
  const options = question?.options || question?.choices || [];
  const questionId = question?.id;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{activeQuiz.title || activeQuiz.name}</h1>
        <p>
          Question {currentQIndex + 1} of {questions.length}
        </p>
        <p>
          <Clock size={18} /> {formatTime(timeLeft)}
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
                    <HelpCircle size={15} /> {quiz.questions?.length || 20} Questions
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={15} /> {quiz.durationMinutes || 20} Mins
                  </span>
                </div>
              </div>

      <div className="card question-card">
        <h2>
          {question?.questionText ||
            question?.question ||
            question?.text ||
            'Question unavailable'}
        </h2>

        <div className="answer-options">
          {options.map((option, index) => {
            const value =
              typeof option === 'object'
                ? option.value ?? option.text ?? option.label
                : option;

            const label =
              typeof option === 'object'
                ? option.text ?? option.label ?? option.value
                : option;

            const selected = answers[questionId] === value;

            return (
              <button
                type="button"
                key={option.id ?? `${questionId}-${index}`}
                className={selected ? 'answer-option selected' : 'answer-option'}
                onClick={() => selectAnswer(questionId, value)}
                disabled={loading}
              >
                <span>{String.fromCharCode(65 + index)}.</span>
                <span>{label}</span>
                {selected && <Check size={18} />}
              </button>
            );
          })}
        </div>

        <div className="quiz-navigation">
          <button
            type="button"
            disabled={currentQIndex === 0 || loading}
            onClick={() => setCurrentQIndex(index => index - 1)}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          {currentQIndex < questions.length - 1 ? (
            <button
              type="button"
              disabled={loading}
              onClick={() => setCurrentQIndex(index => index + 1)}
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={submitQuiz}
            >
              {loading ? 'Submitting...' : 'Submit Quiz'}
              <CheckCircle size={16} />
            </button>
          )}

          {/* Question Navigation & Question Box */}
          {activeQuiz.questions && activeQuiz.questions.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Question {currentQIndex + 1} of {activeQuiz.questions.length}</span>
                <span>Category: {activeQuiz.category}</span>
              </div>

              {/* Question Text */}
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                {activeQuiz.questions[currentQIndex]?.question || activeQuiz.questions[currentQIndex]?.questionText}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {(activeQuiz.questions[currentQIndex]?.options || []).map((opt, optIdx) => {
                  const q = activeQuiz.questions[currentQIndex];
                  const isSelected = selectedAnswers[q.id] === optIdx;

                  let optBg = 'var(--bg-input)';
                  let border = '1px solid var(--border-color)';
                  let color = 'var(--text-title)';

                  if (isSelected) {
                    optBg = 'rgba(79, 70, 229, 0.15)';
                    border = '1px solid var(--primary-600)';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(q.id, optIdx)}
                      disabled={isSubmitted || isSubmitting}
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
                    </button>
                  );
                })}
              </div>

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
                      disabled={isSubmitting}
                      className="btn btn-primary btn-sm"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Quiz Now'}
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
      </div>
    </div>
  );
}
