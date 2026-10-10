import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';
import {
  Search,
  Trash2,
  Eye
} from 'lucide-react';

const ManageUsers = () => {
  const { adminUsers, setAdminUsers, showToast } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [selectedStudentView, setSelectedStudentView] = useState(null);

  const departments = ['All', 'CSE', 'ECE', 'IT', 'MECH', 'CIVIL'];

  const usersList = Array.isArray(adminUsers) ? adminUsers : [];

  const filteredUsers = usersList.filter(u => {
    const userName = (u?.name || u?.fullName || '').toLowerCase();
    const userEmail = (u?.email || '').toLowerCase();
    const matchesSearch = userName.includes(searchTerm.toLowerCase()) ||
                          userEmail.includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'All' || (u?.department || 'CSE') === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const handleDeleteUser = async (student) => {
    const id = student.id;
    const name = student.name || student.fullName || 'User';
    if (window.confirm(`Are you sure you want to delete student "${name}"?`)) {
      try {
        await portalService.deleteAdminUser(student.rawId);
        setAdminUsers(prev => (prev || []).filter(u => u.id !== id));
        showToast(`Student ${name} deleted.`, 'info');
      } catch (error) {
        showToast(error.response?.data?.message || error.message || 'Could not delete student.', 'error');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Manage Registered Students</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            View, search, edit, and add student placement profiles
          </p>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search student by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="form-select"
          style={{ width: '180px' }}
        >
          {departments.map(d => (
            <option key={d} value={d}>Dept: {d}</option>
          ))}
        </select>
      </div>

      {/* Student Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Student ID</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Name & Email</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Dept & Year</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>CGPA</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.95rem 1.25rem', fontWeight: '700', color: 'var(--purple-600)' }}>
                    {u.id}
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-title)' }}>{u.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem', color: 'var(--text-body)' }}>
                    {u.department} ({u.year})
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem', fontWeight: '700', color: 'var(--primary-600)' }}>
                    {u.cgpa}
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem' }}>
                    <span className={`badge ${u.status === 'Active' ? 'badge-easy' : 'badge-hard'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => setSelectedStudentView(u)} className="btn btn-secondary btn-sm" title="View Profile">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => handleDeleteUser(u)} className="btn btn-danger btn-sm" title="Delete Student">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student View Modal */}
      {selectedStudentView && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '450px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Student Placement Card</h3>
              <button onClick={() => setSelectedStudentView(null)} className="btn btn-secondary btn-sm">✕ Close</button>
            </div>
            <div style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
              <div><strong>Name:</strong> {selectedStudentView.name}</div>
              <div><strong>ID:</strong> {selectedStudentView.id}</div>
              <div><strong>Email:</strong> {selectedStudentView.email}</div>
              <div><strong>Department:</strong> {selectedStudentView.department} ({selectedStudentView.year})</div>
              <div><strong>CGPA:</strong> {selectedStudentView.cgpa} / 10.0</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageUsers;
