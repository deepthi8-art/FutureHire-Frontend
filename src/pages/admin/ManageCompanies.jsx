import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Building,
  PlusCircle,
  Edit,
  Trash2,
  DollarSign,
  MapPin,
  CheckCircle,
  Search
} from 'lucide-react';

const ManageCompanies = () => {
  const { companies, setCompanies, showToast } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [companyForm, setCompanyForm] = useState({
    name: '',
    tier: 'Product / Dream',
    ctc: '₹12 - 20 LPA',
    location: 'Bangalore / Hyderabad',
    description: '',
    minCgpa: '7.0 / 10.0',
    skills: 'DSA, System Design, Java'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!companyForm.name) {
      showToast('Please enter company name.', 'error');
      return;
    }

    const newCompany = {
      id: `COMP-${Date.now()}`,
      name: companyForm.name,
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80',
      tier: companyForm.tier,
      ctc: companyForm.ctc,
      location: companyForm.location,
      description: companyForm.description || 'Top IT Recruiter for Campus Placements.',
      eligibility: {
        minCgpa: companyForm.minCgpa,
        tenthTwelveth: '60% throughout',
        allowedBranches: ['CSE', 'IT', 'ECE'],
        maxBacklogs: 0
      },
      skillsRequired: companyForm.skills.split(',').map(s => s.trim()),
      selectionProcess: [
        { round: 1, name: 'Online Assessment', details: 'Aptitude + Coding Test' },
        { round: 2, name: 'Technical Round', details: 'DSA & Project Discussion' }
      ],
      interviewQuestions: [
        { q: 'Explain OOPs fundamentals.', difficulty: 'Easy', topic: 'Core Tech' }
      ]
    };

    setCompanies([newCompany, ...companies]);
    showToast(`Company ${companyForm.name} added!`, 'success');
    setShowAddModal(false);
    setCompanyForm({ name: '', tier: 'Product / Dream', ctc: '₹12 - 20 LPA', location: 'Bangalore / Hyderabad', description: '', minCgpa: '7.0 / 10.0', skills: 'DSA, System Design, Java' });
  };

  const handleDeleteCompany = (id, name) => {
    if (window.confirm(`Delete company ${name}?`)) {
      setCompanies(prev => prev.filter(c => c.id !== id));
      showToast(`Company ${name} removed.`, 'info');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Manage Partner Companies</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Configure corporate recruitment profiles, packages, and eligibility criteria
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <PlusCircle size={18} /> Add New Company
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid-3">
        {companies.map(comp => (
          <div key={comp.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                <img src={comp.logo} alt={comp.name} style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>{comp.name}</h3>
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{comp.tier}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--emerald-500)', fontWeight: '700', marginBottom: '0.5rem' }}>
                CTC: {comp.ctc}
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {comp.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleDeleteCompany(comp.id, comp.name)} className="btn btn-danger btn-sm" style={{ width: '100%' }}>
                <Trash2 size={15} /> Delete Company
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '540px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Add New Recruitment Partner</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google India"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">CTC Package</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹25 LPA"
                    value={companyForm.ctc}
                    onChange={(e) => setCompanyForm({ ...companyForm, ctc: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tier</label>
                  <select
                    value={companyForm.tier}
                    onChange={(e) => setCompanyForm({ ...companyForm, tier: e.target.value })}
                    className="form-select"
                  >
                    <option value="Super Dream">Super Dream</option>
                    <option value="Product / Dream">Product / Dream</option>
                    <option value="Mass / Digital">Mass / Digital</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Required Tech Stack Skills (comma separated)</label>
                <input
                  type="text"
                  value={companyForm.skills}
                  onChange={(e) => setCompanyForm({ ...companyForm, skills: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Company</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageCompanies;
