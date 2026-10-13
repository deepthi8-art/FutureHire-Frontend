import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';
import {
  FileText,
  UploadCloud,
  CheckCircle,
  Trash2,
  Download,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileCheck
} from 'lucide-react';

const ResumeManagement = () => {
  const { resumeData, setResumeData, showToast } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        showToast('Please upload a PDF file only.', 'error');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        showToast('The PDF must be 20 MB or smaller.', 'error');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast('Select a PDF file first.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const uploaded = await portalService.uploadResume(selectedFile);
      if (!uploaded) throw new Error('The server did not return the uploaded resume.');
      setResumeData(uploaded);
      setSelectedFile(null);
      showToast('Resume uploaded successfully. ATS scoring is not configured.', 'success');
    } catch (err) {
      console.error('Resume upload error:', err);
      const msg = err.response?.data?.message || err.message || 'Upload failed';
      showToast(`Upload error: ${msg}`, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await portalService.deleteResume();
      setResumeData(null);
      showToast('Resume removed.', 'info');
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Resume deletion failed.', 'error');
    }
  };

  const handleDownloadResume = async (e) => {
    e.preventDefault();
    try {
      const blob = await portalService.downloadResumeBlob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resumeData?.fileName || 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast(`Downloaded ${resumeData?.fileName}`, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || err.message || 'Resume download failed.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>Resume Management & ATS Optimization</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Upload your engineering resume in PDF format for automated ATS score analysis and campus drive readiness
        </p>
      </div>

      <div className="grid-2">
        
        {/* Upload Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UploadCloud size={22} style={{ color: 'var(--primary-600)' }} /> Upload New PDF Resume
          </h3>

          <form onSubmit={handleUploadSubmit}>
            <div
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 1rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-input)',
                cursor: 'pointer',
                marginBottom: '1.25rem',
                transition: 'var(--transition)'
              }}
            >
              <input
                type="file"
                accept=".pdf"
                id="resumeUploadInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="resumeUploadInput" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FileText size={42} style={{ color: 'var(--primary-600)', marginBottom: '0.75rem' }} />
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                  {selectedFile ? selectedFile.name : 'Click to select PDF or drag & drop'}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Supported format: PDF (maximum 20 MB)
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              {isUploading ? 'Uploading PDF...' : 'Upload Resume'}
            </button>
          </form>
        </div>

        {/* Uploaded Status & ATS Feedback Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCheck size={22} style={{ color: 'var(--emerald-500)' }} /> Active Uploaded Resume
          </h3>

          {resumeData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* File Info Box */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <FileText size={32} style={{ color: 'var(--primary-600)' }} />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.925rem' }}>{resumeData.fileName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Uploaded: {resumeData.uploadedAt} • Size: {resumeData.fileSize}
                    </div>
                  </div>
                </div>

                <span className="badge badge-easy">
                  {resumeData.status}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Automated ATS analysis is not configured.</p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={handleDownloadResume}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  <Download size={16} /> Download Resume
                </button>
                <button
                  onClick={handleDeleteResume}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <AlertCircle size={36} style={{ marginBottom: '0.5rem', opacity: 0.6 }} />
              <p>No resume uploaded yet. Upload your PDF to scan ATS score.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default ResumeManagement;
