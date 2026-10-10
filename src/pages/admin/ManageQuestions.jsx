import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';
import {
  PlusCircle,
  Trash2,
  Search
} from 'lucide-react';

const ManageQuestions = () => {
  const { codingProblems, setCodingProblems, showToast } = useAuth();
  
  const [activeTab, setActiveTab] = useState('coding'); // 'coding' | 'aptitude'
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [questionForm, setQuestionForm] = useState({
    title: '',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: '',
    sampleInput: '',
    sampleOutput: ''
  });

  const handleAddProblemSubmit = async (e) => {
    e.preventDefault();
    if (!questionForm.title || !questionForm.description) {
      showToast('Please fill title and description.', 'error');
      return;
    }

    const newProblem = {
      id: `CP-${Date.now()}`,
      title: questionForm.title,
      difficulty: questionForm.difficulty,
      category: questionForm.category,
      solved: false,
      acceptanceRate: '85.0%',
      description: questionForm.description,
      sampleInput: questionForm.sampleInput || 'nums = [1,2,3]',
      sampleOutput: questionForm.sampleOutput || '6',
      starterCode: {
        javascript: `function solution() {\n  // Code here\n}`,
        python: `def solution():\n    pass`
      }
    };

    try {
      const savedProblem = await portalService.createAdminCodingProblem(newProblem);
      setCodingProblems(prev => [savedProblem, ...prev]);
      showToast(`Question "${questionForm.title}" added to Question Bank.`, 'success');
      setShowAddModal(false);
      setQuestionForm({ title: '', difficulty: 'Easy', category: 'Arrays & Hashing', description: '', sampleInput: '', sampleOutput: '' });
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Could not add question.', 'error');
    }
  };

  const handleDeleteProblem = async (id, title) => {
    if (window.confirm(`Delete question "${title}"?`)) {
      try {
        await portalService.deleteAdminCodingProblem(id);
        setCodingProblems(prev => prev.filter(p => p.id !== id));
        showToast('Question deleted.', 'info');
      } catch (error) {
        showToast(error.response?.data?.message || error.message || 'Could not delete question.', 'error');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Manage Question Repository</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Add, update, or remove coding and aptitude test problems
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <PlusCircle size={18} /> Add New Question
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-input)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
          <button
            onClick={() => setActiveTab('coding')}
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.85rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'coding' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'coding' ? 'var(--primary-600)' : 'var(--text-muted)'
            }}
          >
            Coding Problems ({codingProblems.length})
          </button>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      {/* Questions Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Question Title</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Difficulty</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Acceptance</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {codingProblems.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
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
                      onClick={() => handleDeleteProblem(p.id, p.title)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Add New Coding Question</h3>
            <form onSubmit={handleAddProblemSubmit}>
              <div className="form-group">
                <label className="form-label">Question Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reverse Linked List"
                  value={questionForm.title}
                  onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select
                    value={questionForm.difficulty}
                    onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value })}
                    className="form-select"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    value={questionForm.category}
                    onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Problem Description</label>
                <textarea
                  rows="4"
                  required
                  value={questionForm.description}
                  onChange={(e) => setQuestionForm({ ...questionForm, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Problem</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageQuestions;
