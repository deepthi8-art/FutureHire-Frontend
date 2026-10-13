import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';
import {
  CalendarCheck,
  PlusCircle,
  Clock,
  User,
  Video,
  CheckCircle,
  Edit,
  MessageSquare
} from 'lucide-react';

const ManageMockInterviews = () => {
  const { mockInterviews, setMockInterviews, showToast } = useAuth();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [activeFeedbackModal, setActiveFeedbackModal] = useState(null);

  const slotsList = Array.isArray(mockInterviews) ? mockInterviews : [];

  const [scheduleForm, setScheduleForm] = useState({
    mentorName: 'Ananya Deshmukh',
    mentorTitle: 'Senior Tech Lead at Amazon',
    date: '2026-10-15',
    time: '05:00 PM - 06:00 PM',
    type: 'Technical (DSA & Coding)'
  });

  const [feedbackForm, setFeedbackForm] = useState({
    rating: 4.8,
    strengths: 'Clear logic explanation, clean code structure.',
    areasToImprove: 'Practice time complexity edge case analysis.'
  });

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    const newSlot = {
      id: `MI-${Date.now()}`,
      mentorName: scheduleForm.mentorName,
      mentorTitle: scheduleForm.mentorTitle,
      date: scheduleForm.date,
      time: scheduleForm.time,
      type: scheduleForm.type,
      status: 'Available',
      meetingLink: ''
    };

    try {
      const savedSlot = await portalService.createAdminMockSlot(newSlot);
      setMockInterviews(prev => [savedSlot, ...(prev || [])]);
      showToast('New mock interview slot scheduled.', 'success');
      setShowScheduleModal(false);
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Could not schedule slot.', 'error');
    }
  };

  const handleSaveFeedback = async (e) => {
    e.preventDefault();
    if (!activeFeedbackModal) return;

    if (!activeFeedbackModal.bookingId) {
      showToast('Feedback is available after a student books this slot.', 'error');
      return;
    }

    const feedback = {
      rating: Number(feedbackForm.rating),
      strengths: feedbackForm.strengths,
      areasToImprove: feedbackForm.areasToImprove
    };
    try {
      await portalService.submitAdminMockFeedback(activeFeedbackModal.bookingId, feedback);
      setMockInterviews(prev => (prev || []).map(slot => slot.id === activeFeedbackModal.id
        ? { ...slot, status: 'Completed', feedback }
        : slot));
      showToast('Interview feedback submitted.', 'success');
      setActiveFeedbackModal(null);
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Could not submit feedback.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Manage Mock Interviews & Mentors</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Schedule interview slots, assign mentors, monitor bookings, and submit student performance feedback
          </p>
        </div>

        <button onClick={() => setShowScheduleModal(true)} className="btn btn-primary">
          <PlusCircle size={18} /> Schedule New Slot
        </button>
      </div>

      {/* Slots Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Interviewer</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Type</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Date & Time</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slotsList.map(slot => (
                <tr key={slot.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.95rem 1.25rem' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-title)' }}>{slot.mentorName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{slot.mentorTitle}</div>
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem', color: 'var(--primary-600)', fontWeight: '600' }}>
                    {slot.type}
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem', fontSize: '0.85rem' }}>
                    {slot.date} ({slot.time})
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem' }}>
                    <span className={`badge ${slot.status === 'Completed' ? 'badge-easy' : slot.status === 'Booked' ? 'badge-medium' : 'badge-purple'}`}>
                      {slot.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem', textAlign: 'right' }}>
                    <button
                      disabled={!slot.bookingId}
                      onClick={() => {
                        setActiveFeedbackModal(slot);
                        if (slot.feedback) {
                          setFeedbackForm({
                            rating: slot.feedback.rating,
                            strengths: slot.feedback.strengths,
                            areasToImprove: slot.feedback.areasToImprove
                          });
                        }
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      <MessageSquare size={14} /> {slot.feedback ? 'Edit Feedback' : 'Enter Feedback'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Slot Modal */}
      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Schedule Mock Interview Slot</h3>
            <form onSubmit={handleScheduleSubmit}>
              <div className="form-group">
                <label className="form-label">Mentor Name</label>
                <input
                  type="text"
                  required
                  value={scheduleForm.mentorName}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, mentorName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mentor Title / Company</label>
                <input
                  type="text"
                  required
                  value={scheduleForm.mentorTitle}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, mentorTitle: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    required
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time Window</label>
                  <input
                    type="text"
                    required
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Interview Type</label>
                <select
                  value={scheduleForm.type}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
                  className="form-select"
                >
                  <option value="Technical (DSA & Coding)">Technical (DSA & Coding)</option>
                  <option value="System Design & HR">System Design & HR</option>
                  <option value="Behavioral & Mock HR">Behavioral & Mock HR</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setShowScheduleModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Publish Slot</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enter Feedback Modal */}
      {activeFeedbackModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>
              Student Evaluation Feedback for {activeFeedbackModal.mentorName}
            </h3>
            <form onSubmit={handleSaveFeedback}>
              <div className="form-group">
                <label className="form-label">Overall Rating (1.0 to 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  required
                  value={feedbackForm.rating}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Strengths Observed</label>
                <textarea
                  rows="3"
                  required
                  value={feedbackForm.strengths}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, strengths: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Areas Needed to Improve</label>
                <textarea
                  rows="3"
                  required
                  value={feedbackForm.areasToImprove}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, areasToImprove: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setActiveFeedbackModal(null)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Feedback</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageMockInterviews;
