import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Tag,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const StudyResources = () => {
  const { resources, showToast } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Programming',
    'Aptitude',
    'Data Structures',
    'Algorithms',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'HR Interview'
  ];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || res.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (res) => {
    showToast(`Downloading "${res.title}" (${res.size})...`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>Placement Study Resources & Cheat Sheets</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Download handcrafted PDF notes, formula sheets, SQL query guides, and HR interview answers
        </p>
      </div>

      {/* Filter & Search */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search resources by title or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select"
          style={{ width: '220px' }}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid-3">
        {filteredResources.map((res) => (
          <div key={res.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-purple">{res.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {res.format} • {res.size}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                {res.title}
              </h3>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                By <strong>{res.author}</strong> • {res.downloads.toLocaleString()} downloads
              </div>
            </div>

            <button
              onClick={() => handleDownload(res)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              <Download size={16} /> Download Guide PDF
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudyResources;
