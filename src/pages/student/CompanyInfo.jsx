import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Search,
  CheckCircle,
  MapPin,
  DollarSign,
  Briefcase,
  HelpCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const CompanyInfo = () => {
  const { companies } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCompany, setActiveCompany] = useState(null);

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>Company Preparation & Insights</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Explore CTC packages, eligibility criteria, hiring workflow, and real interview questions
        </p>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search company (e.g. Amazon, TCS, Microsoft)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid-3">
        {filteredCompanies.map((comp) => (
          <div key={comp.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img
                  src={comp.logo}
                  alt={comp.name}
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>{comp.name}</h3>
                  <span className="badge badge-purple" style={{ fontSize: '0.68rem', marginTop: '0.2rem' }}>
                    {comp.tier}
                  </span>
                </div>
              </div>

              {/* CTC & Location */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--emerald-500)', fontWeight: '700' }}>
                  <DollarSign size={16} /> Package: {comp.ctc}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} /> Locations: {comp.location}
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {comp.description}
              </p>

              {/* Skills badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                {comp.skillsRequired.slice(0, 3).map((skill, idx) => (
                  <span key={idx} style={{ fontSize: '0.72rem', backgroundColor: 'var(--bg-input)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveCompany(comp)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              View Recruitment Process <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Detailed Company Modal */}
      {activeCompany && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '800px' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={activeCompany.logo}
                  alt={activeCompany.name}
                  style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <h2 style={{ fontSize: '1.5rem' }}>{activeCompany.name}</h2>
                  <div style={{ fontSize: '0.85rem', color: 'var(--emerald-500)', fontWeight: '700' }}>
                    CTC: {activeCompany.ctc}
                  </div>
                </div>
              </div>
              <button onClick={() => setActiveCompany(null)} className="btn btn-secondary btn-sm">
                ✕ Close
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Eligibility Criteria */}
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>
                  Eligibility Criteria
                </h4>
                <div className="grid-2" style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                  <div><strong>Min CGPA:</strong> {activeCompany.eligibility.minCgpa}</div>
                  <div><strong>10th / 12th:</strong> {activeCompany.eligibility.tenthTwelveth}</div>
                  <div><strong>Branches:</strong> {activeCompany.eligibility.allowedBranches.join(', ')}</div>
                  <div><strong>Max Backlogs:</strong> {activeCompany.eligibility.maxBacklogs}</div>
                </div>
              </div>

              {/* Selection Process Rounds */}
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--purple-600)', marginBottom: '0.75rem' }}>
                  Selection Workflow Rounds
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {activeCompany.selectionProcess.map((round) => (
                    <div
                      key={round.round}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--purple-50)', color: 'var(--purple-600)', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                        R{round.round}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{round.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{round.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--cyan-600)', marginBottom: '0.75rem' }}>
                  Top Interview Questions Asked
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {activeCompany.interviewQuestions.map((q, idx) => (
                    <div key={idx} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-title)' }}>Q{idx + 1}: {q.q}</div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.72rem' }}>
                        <span className={`badge badge-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                        <span style={{ color: 'var(--text-muted)' }}>Topic: {q.topic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CompanyInfo;
