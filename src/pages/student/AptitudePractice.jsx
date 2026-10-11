
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain, Clock, CheckCircle, HelpCircle, ArrowRight,
  ArrowLeft, Check, X, RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';

export default function AptitudePractice() {
  const { aptitudeQuizzes, showToast } = useAuth();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);

  useEffect(() => {
    if (!activeQuiz || isSubmitted || timeLeft <= 0) return undefined;

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

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${((currentQIndex + 1) / questions.length) * 100}%`
          }}
        />
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
        </div>
      </div>
    </div>
  );
}
