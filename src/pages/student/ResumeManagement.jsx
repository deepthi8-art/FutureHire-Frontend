
import React, { useState, useEffect } from 'react';
import { portalService } from '../../services/portalService';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  UploadCloud,
  CheckCircle,
  Trash2,
  Download,
  AlertCircle,
  FileCheck
} from 'lucide-react';

const ResumeManagement = () => {
  const { resumeData, setResumeData, showToast } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    portalService.getResumeDetails()
      .then((resume) => {
        if (active) setResumeData(resume);
      })
      .catch((error) => {
        if (active) {
          showToast(
            error?.message || 'Could not load your saved resume.',
            'error'
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [setResumeData, showToast]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      showToast('Please select a PDF file.', 'error');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('The PDF must be smaller than 5 MB.', 'error');
      event.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      showToast('Please select a PDF first.', 'error');
      return;
    }

    setIsUploading(true);

    try {
      const resume = await portalService.uploadResume(selectedFile);
      setResumeData(resume);
      setSelectedFile(null);
      event.target.reset();
      showToast('Resume uploaded and analyzed successfully.', 'success');
    } catch (error) {
      showToast(
        error?.response?.data?.message ||
        error.message ||
        'Resume upload failed.',
        'error'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const blob = await portalService.downloadResume();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = resumeData?.fileName || 'resume.pdf';

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      showToast(
        error?.response?.data?.message || 'Could not download the resume.',
        'error'
      );
    }
  };

  const handleDeleteResume = async () => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    setIsDeleting(true);

    try {
      await portalService.deleteResume();
      setResumeData(null);
      showToast('Resume deleted successfully.', 'success');
    } catch (error) {
      showToast(
        error?.response?.data?.message || 'Could not delete the resume.',
        'error'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const score = Number(resumeData?.atsScore ?? 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>
          Resume Management & ATS Analysis
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Upload your resume to review its analysis and track improvements.
        </p>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2>
            <UploadCloud size={22} /> Upload Resume
          </h2>

          <form onSubmit={handleUploadSubmit}>
            <div
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 1rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-input)',
                marginBottom: '1rem'
              }}
            >
              <input
                id="resumeUploadInput"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                disabled={isUploading}
              />

              {selectedFile && (
                <p>
                  Selected: <strong>{selectedFile.name}</strong>
                </p>
              )}

              <p style={{ color: 'var(--text-muted)' }}>
                PDF only, maximum 5 MB.
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading || !selectedFile}
              style={{ width: '100%' }}
            >
              {isUploading ? 'Uploading and analyzing...' : 'Upload & Analyze'}
            </button>
          </form>
        </section>

        <section className="card">
          <h2>
            <FileCheck size={22} /> Your Saved Resume
          </h2>

          {isLoading ? (
            <p>Loading your resume...</p>
          ) : resumeData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <FileText size={28} />
                <p>
                  <strong>{resumeData.fileName || 'Resume.pdf'}</strong>
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                  Status: {resumeData.status || 'Uploaded'}
                </p>
                {resumeData.uploadedAt && (
                  <p>
                    Uploaded: {new Date(resumeData.uploadedAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(79, 70, 229, 0.08)'
                }}
              >
                <h3>Resume analysis score</h3>
                <p style={{ fontSize: '2rem', fontWeight: 800 }}>
                  {Number.isFinite(score) ? `${score}%` : 'Not available'}
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                  This score is an estimate based on the analysis returned by
                  the server, not a guarantee of an employer's ATS result.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleDownloadResume}
                >
                  <Download size={16} /> Download
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={isDeleting}
                  onClick={handleDeleteResume}
                >
                  <Trash2 size={16} />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <AlertCircle size={36} />
              <p>No resume has been uploaded yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ResumeManagement;
