import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';
import {
  PlusCircle,
  Trash2
} from 'lucide-react';

const ManageResources = () => {
  const { resources, setResources, showToast } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const [resForm, setResForm] = useState({
    title: '',
    category: 'Data Structures',
    format: 'PDF',
    size: '12.0 MB',
    author: 'Placement Cell',
    fileUrl: ''
  });

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!resForm.title) {
      showToast('Please enter resource title.', 'error');
      return;
    }

    const newRes = {
      id: `RES-${Date.now()}`,
      title: resForm.title,
      category: resForm.category,
      format: resForm.format,
      size: resForm.size,
      downloads: 0,
      author: resForm.author,
      fileUrl: resForm.fileUrl
    };

    try {
      const savedResource = await portalService.createAdminResource(newRes);
      setResources(prev => [savedResource, ...prev]);
      showToast(`Resource "${resForm.title}" added.`, 'success');
      setShowAddModal(false);
      setResForm({ title: '', category: 'Data Structures', format: 'PDF', size: '12.0 MB', author: 'Placement Cell', fileUrl: '' });
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Could not add resource.', 'error');
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await portalService.deleteAdminResource(id);
      setResources(prev => prev.filter(r => r.id !== id));
      showToast('Study resource deleted.', 'info');
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Could not delete resource.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Manage Study Resources</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Upload, update, and organize downloadable PDFs, cheat sheets, and guides
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <PlusCircle size={18} /> Upload New Material
        </button>
      </div>

      {/* Grid */}
      <div className="grid-3">
        {resources.map(res => (
          <div key={res.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>{res.category}</span>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{res.title}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Format: {res.format} • Size: {res.size} • Downloads: {res.downloads}
              </div>
            </div>

            <button onClick={() => handleDeleteResource(res.id)} className="btn btn-danger btn-sm" style={{ width: '100%' }}>
              <Trash2 size={15} /> Remove Resource
            </button>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Add Study Resource Link</h3>
            <form onSubmit={handleAddResource}>
              <div className="form-group">
                <label className="form-label">Material Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Operating System Concepts"
                  value={resForm.title}
                  onChange={(e) => setResForm({ ...resForm, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={resForm.category}
                  onChange={(e) => setResForm({ ...resForm, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Data Structures">Data Structures</option>
                  <option value="DBMS">DBMS</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Computer Networks">Computer Networks</option>
                  <option value="Aptitude">Aptitude</option>
                  <option value="HR Interview">HR Interview</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Hosted File URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={resForm.fileUrl}
                  onChange={(e) => setResForm({ ...resForm, fileUrl: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Resource</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageResources;
