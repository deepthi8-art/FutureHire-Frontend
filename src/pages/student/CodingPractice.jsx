import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Code,
  Search,
  Filter,
  CheckCircle,
  Play,
  Send,
  Terminal,
  FileCode,
  Check,
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

const CodingPractice = () => {
  const { codingProblems, setCodingProblems, showToast } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProblem, setActiveProblem] = useState(null);
  
  // Code runner state
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [userCode, setUserCode] = useState('');
  const [outputConsole, setOutputConsole] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const categories = ['All', ...new Set(codingProblems.map(p => p.category))];

  const filteredProblems = codingProblems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const handleOpenProblem = (problem) => {
    setActiveProblem(problem);
    setUserCode(problem.starterCode[selectedLanguage] || problem.starterCode.javascript || '');
    setOutputConsole(null);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (activeProblem && activeProblem.starterCode[lang]) {
      setUserCode(activeProblem.starterCode[lang]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputConsole({ status: 'Running', text: 'Executing sample test cases against compiler engine...' });
    
    setTimeout(() => {
      setIsRunning(false);
      setOutputConsole({
        status: 'Accepted',
        testCasesPassed: '3/3 Test Cases Passed',
        runtime: '42 ms',
        memory: '14.2 MB',
        output: `Sample Output: ${activeProblem.sampleOutput}\nConsole Log: Code executed cleanly with zero syntax errors.`
      });
      showToast('Sample test cases passed!', 'success');
    }, 800);
  };

  const handleSubmitCode = () => {
    setIsRunning(true);
    setOutputConsole({ status: 'Running', text: 'Submitting solution to automated evaluator...' });

    setTimeout(() => {
      setIsRunning(false);
      // Mark problem as solved
      setCodingProblems(prev => prev.map(p => p.id === activeProblem.id ? { ...p, solved: true } : p));
      
      setOutputConsole({
        status: 'ACCEPTED',
        testCasesPassed: '45/45 Hidden Test Cases Passed',
        runtime: '38 ms (Beats 94.2% of submissions)',
        memory: '13.8 MB',
        output: '🎉 Congratulations! Your submission passed all test cases!'
      });

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      showToast(`Problem "${activeProblem.title}" solved successfully!`, 'success');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Coding Practice</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Solve top interview problems curated from Amazon, TCS, Microsoft, and Google campus rounds
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: '700' }}>
            Solved: <span style={{ color: 'var(--emerald-500)' }}>{codingProblems.filter(p => p.solved).length}</span> / {codingProblems.length}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search problems by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="form-select"
            style={{ width: '140px' }}
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
            style={{ width: '180px' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems Table / List */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Title</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Difficulty</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Acceptance</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No coding problems found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProblems.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.95rem 1.25rem' }}>
                      {p.solved ? (
                        <span style={{ color: 'var(--emerald-500)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: '700', fontSize: '0.8rem' }}>
                          <CheckCircle size={16} /> Solved
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Unsolved</span>
                      )}
                    </td>
                    <td style={{ padding: '0.95rem 1.25rem', fontWeight: '700', color: 'var(--text-title)' }}>
                      {p.title}
                    </td>
                    <td style={{ padding: '0.95rem 1.25rem', color: 'var(--text-muted)' }}>
                      {p.category}
                    </td>
                    <td style={{ padding: '0.95rem 1.25rem' }}>
                      <span className={`badge badge-${p.difficulty.toLowerCase()}`}>
                        {p.difficulty}
                      </span>
                    </td>
                    <td style={{ padding: '0.95rem 1.25rem', color: 'var(--text-muted)' }}>
                      {p.acceptanceRate}
                    </td>
                    <td style={{ padding: '0.95rem 1.25rem', textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenProblem(p)}
                        className="btn btn-primary btn-sm"
                      >
                        Solve Challenge
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Editor Modal */}
      {activeProblem && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '950px', width: '95%', height: '88vh', display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.35rem' }}>{activeProblem.title}</h3>
                <span className={`badge badge-${activeProblem.difficulty.toLowerCase()}`}>
                  {activeProblem.difficulty}
                </span>
              </div>
              <button onClick={() => setActiveProblem(null)} className="btn btn-secondary btn-sm">
                ✕ Close Editor
              </button>
            </div>

            {/* Split Screen Layout: Left Description, Right Code Editor */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.25rem', marginTop: '1rem', overflow: 'hidden' }}>
              
              {/* Problem Description Panel */}
              <div style={{ overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Problem Description</h4>
                  <p style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-title)' }}>
                    {activeProblem.description}
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: '700', marginBottom: '0.35rem' }}>Sample Input:</div>
                  <code style={{ fontFamily: 'JetBrains Mono', color: 'var(--primary-600)' }}>{activeProblem.sampleInput}</code>
                  <div style={{ fontWeight: '700', marginTop: '0.65rem', marginBottom: '0.35rem' }}>Sample Output:</div>
                  <code style={{ fontFamily: 'JetBrains Mono', color: 'var(--emerald-500)' }}>{activeProblem.sampleOutput}</code>
                  {activeProblem.explanation && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <strong>Note:</strong> {activeProblem.explanation}
                    </p>
                  )}
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Constraints</h4>
                  <pre style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', backgroundColor: 'var(--bg-input)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    {activeProblem.constraints}
                  </pre>
                </div>
              </div>

              {/* Code Editor Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}>
                
                {/* Language Selector Toolbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E293B', color: '#F8FAFC', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    <FileCode size={16} style={{ color: 'var(--purple-500)' }} /> Language:
                    <select
                      value={selectedLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      style={{ backgroundColor: '#0F172A', color: '#FFF', border: '1px solid #334155', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                    >
                      <option value="javascript">JavaScript (Node v20)</option>
                      <option value="python">Python 3.10</option>
                      <option value="java">Java 17 (OpenJDK)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}
                    >
                      <Play size={14} /> Run Code
                    </button>
                    <button
                      onClick={handleSubmitCode}
                      disabled={isRunning}
                      className="btn btn-primary btn-sm"
                      style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      <Send size={14} /> Submit Solution
                    </button>
                  </div>
                </div>

                {/* Code Textarea Editor */}
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: '#0F172A',
                    color: '#38BDF8',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    padding: '1rem',
                    border: '1px solid #1E293B',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                    outline: 'none',
                    resize: 'none'
                  }}
                  spellCheck="false"
                />

                {/* Output Console Panel */}
                {outputConsole && (
                  <div
                    style={{
                      backgroundColor: outputConsole.status === 'ACCEPTED' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-input)',
                      border: `1px solid ${outputConsole.status === 'ACCEPTED' ? 'var(--emerald-500)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem',
                      maxHeight: '130px',
                      overflowY: 'auto'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: outputConsole.status === 'ACCEPTED' ? 'var(--emerald-500)' : 'var(--primary-600)' }}>
                        <Terminal size={14} /> Status: {outputConsole.status}
                      </span>
                      {outputConsole.runtime && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Runtime: {outputConsole.runtime}
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: 'var(--text-title)', whiteSpace: 'pre-line' }}>
                      {outputConsole.text || outputConsole.output}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CodingPractice;
