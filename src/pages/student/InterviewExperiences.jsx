import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';
import {
  MessageSquareQuote,
  Search,
  PlusCircle,
  Building,
  Calendar,
  CheckCircle2,
  XCircle,
  User,
  Star,
  BookOpen
} from 'lucide-react';

const InterviewExperiences = () => {
  const { experiences, setExperiences, showToast } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('All');
  const [activeExperience, setActiveExperience] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const [newShare, setNewShare] = useState({
    author: 'Senior Student',
    college: 'Engineering Institute',
    company: 'Amazon',
    role: 'SDE Intern / Full-Time',
    verdict: 'Selected',
    packageOffered: '32 LPA',
    date: 'October 2026',
    difficulty: 'Medium',
    content: '',
    tips: ''
  });

  const companiesList = ['All', ...new Set((experiences || []).map(e => e.company || e.companyName).filter(Boolean))];

  const filteredExperiences = (experiences || []).filter(exp => {
    const author = (exp.author || exp.student?.fullName || exp.student?.name || '').toLowerCase();
    const role = (exp.role || exp.roleTitle || '').toLowerCase();
    const content = (exp.content || '').toLowerCase();
    const company = (exp.company || exp.companyName || '').toLowerCase();
    const q = (searchTerm || '').toLowerCase();

    const matchesSearch = !q || author.includes(q) || role.includes(q) || content.includes(q) || company.includes(q);
    const matchesCompany = selectedCompanyFilter === 'All' || (exp.company || exp.companyName) === selectedCompanyFilter;
    return matchesSearch && matchesCompany;
  });

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    if (!newShare.content) {
      showToast('Please enter experience details.', 'error');
      return;
    }

    try {
      const created = await portalService.shareExperience(newShare);
      if (!created) throw new Error('The server did not return the saved experience.');
      setExperiences(prev => [created, ...(prev || [])]);
      setShowShareModal(false);
      showToast('Interview experience published. Thank you for sharing.', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || err.message || 'Could not publish experience.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Campus Interview Experiences</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Real interview round breakdowns, questions, and tips shared by senior students
          </p>
        </div>

        <button onClick={() => setShowShareModal(true)} className="btn btn-primary">
          <PlusCircle size={18} /> Share Your Experience
        </button>
      </div>

      {/* Search & Filter */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by student name, role, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <select
          value={selectedCompanyFilter}
          onChange={(e) => setSelectedCompanyFilter(e.target.value)}
          className="form-select"
          style={{ width: '180px' }}
        >
          {companiesList.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredExperiences.map((exp) => (
          <div key={exp.id} className="card card-hover">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{exp.company || exp.companyName || 'Tech Company'}</h3>
                  <span className={`badge ${(exp.verdict || 'Selected') === 'Selected' ? 'badge-easy' : 'badge-hard'}`}>
                    {exp.verdict || 'Selected'}
                  </span>
                  <span className={`badge badge-${(exp.difficulty || 'Medium').toLowerCase()}`}>
                    {exp.difficulty || 'Medium'}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Role: {exp.role || exp.roleTitle || 'Software Engineer'} • Package: <strong style={{ color: 'var(--emerald-500)' }}>{exp.packageOffered || 'N/A'}</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                <div>Shared by <strong>{exp.author || 'Senior Student'}</strong> ({exp.college || 'Engineering College'})</div>
                <div><Calendar size={12} style={{ display: 'inline', marginRight: '3px' }} /> {exp.date || 'Recent'}</div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {(exp.content || '').length > 220 ? `${exp.content.substring(0, 220)}...` : (exp.content || 'Great placement experience.')}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-600)', fontWeight: '600' }}>
                💡 Tip: {exp.tips || 'Consistent practice is key!'}
              </div>
              <button onClick={() => setActiveExperience(exp)} className="btn btn-secondary btn-sm">
                Read Full Experience <BookOpen size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Full Detail Modal */}
      {activeExperience && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '750px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-purple">{activeExperience.company}</span>
                <h2 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{activeExperience.role} Interview Experience</h2>
              </div>
              <button onClick={() => setActiveExperience(null)} className="btn btn-secondary btn-sm">✕ Close</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <div style={{ backgroundColor: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Author:</strong> {activeExperience.author} ({activeExperience.college}) | <strong>Verdict:</strong> {activeExperience.verdict} ({activeExperience.packageOffered})
              </div>

              <div>
                <h4 style={{ color: 'var(--primary-600)', marginBottom: '0.35rem' }}>Detailed Interview Process</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{activeExperience.content}</p>
              </div>

              <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: 'var(--primary-600)' }}>Advice & Preparation Strategy:</strong>
                <p style={{ marginTop: '0.25rem' }}>{activeExperience.tips}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Experience Modal */}
      {showShareModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Share Your Campus Interview Experience</h3>
            <form onSubmit={handleShareSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon, Infosys"
                    value={newShare.company}
                    onChange={(e) => setNewShare({ ...newShare, company: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SDE-1, Analyst"
                    value={newShare.role}
                    onChange={(e) => setNewShare({ ...newShare, role: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Verdict</label>
                  <select
                    value={newShare.verdict}
                    onChange={(e) => setNewShare({ ...newShare, verdict: e.target.value })}
                    className="form-select"
                  >
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Waitlisted">Waitlisted</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Package Offered</label>
                  <input
                    type="text"
                    placeholder="e.g. 18 LPA"
                    value={newShare.packageOffered}
                    onChange={(e) => setNewShare({ ...newShare, packageOffered: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Interview Rounds & Details</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your OA test, technical rounds, questions asked, system design..."
                  value={newShare.content}
                  onChange={(e) => setNewShare({ ...newShare, content: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Preparation Tips</label>
                <input
                  type="text"
                  placeholder="e.g. Focus on DP and STAR method for HR"
                  value={newShare.tips}
                  onChange={(e) => setNewShare({ ...newShare, tips: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowShareModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Publish Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default InterviewExperiences;
