import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portalService } from '../../services/portalService';
import {
  Calendar,
  Clock,
  Star,
  ExternalLink
} from 'lucide-react';

const MockInterviews = () => {
  const { mockInterviews, setMockInterviews, showToast } = useAuth();
  const [selectedSlotToBook, setSelectedSlotToBook] = useState(null);
  const [activeFeedbackModal, setActiveFeedbackModal] = useState(null);

  const availableSlots = mockInterviews.filter(m => m.status === 'Available');
  const bookedUpcoming = mockInterviews.filter(m => m.status === 'Booked');
  const completedMocks = mockInterviews.filter(m => m.status === 'Completed');

  const handleConfirmBooking = async () => {
    if (!selectedSlotToBook) return;

    try {
      const booking = await portalService.bookMockSlot(selectedSlotToBook.id);
      setMockInterviews(prev => [...prev.filter(slot => slot.id !== booking.id), booking]);
      showToast(`Mock interview booked with ${booking.mentorName}.`, 'success');
      setSelectedSlotToBook(null);
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Booking failed.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem' }}>Virtual Mock Interviews</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Practice 1-on-1 technical coding & HR interviews with senior tech leads from Google, Amazon & Microsoft
        </p>
      </div>

      {/* Booked / Upcoming Section */}
      {bookedUpcoming.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid var(--primary-600)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.85rem', color: 'var(--primary-600)' }}>
            🎯 Your Booked Upcoming Mock Interview
          </h3>
          {bookedUpcoming.map(slot => (
            <div key={slot.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '0.85rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{slot.type}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Interviewer: <strong>{slot.mentorName}</strong> ({slot.mentorTitle})
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', fontSize: '0.8rem', color: 'var(--primary-600)', fontWeight: '700' }}>
                  <span><Calendar size={14} style={{ display: 'inline', marginRight: '3px' }} /> {slot.date}</span>
                  <span><Clock size={14} style={{ display: 'inline', marginRight: '3px' }} /> {slot.time}</span>
                </div>
              </div>

              {slot.meetingLink ? (
                <a
                  href={slot.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Join Video Meeting <ExternalLink size={14} />
                </a>
              ) : (
                <span className="badge badge-medium">Meeting details pending</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Available Slots */}
      <div>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Available Interview Slots</h2>
        <div className="grid-3">
          {availableSlots.length === 0 ? (
            <div className="card" style={{ colSpan: 3, textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              No open slots available right now. Check back soon for new schedules!
            </div>
          ) : (
            availableSlots.map(slot => (
              <div key={slot.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>{slot.type}</span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{slot.mentorName}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{slot.mentorTitle}</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', backgroundColor: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} style={{ color: 'var(--primary-600)' }} /> {slot.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={14} style={{ color: 'var(--purple-600)' }} /> {slot.time}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSlotToBook(slot)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  Book Interview Slot
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Interviews & Detailed Feedback */}
      <div>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Completed Interviews & Mentor Feedback</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {completedMocks.map(slot => (
            <div key={slot.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h4 style={{ fontSize: '1.1rem' }}>{slot.type}</h4>
                  <span className="badge badge-easy">Completed</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Interviewer: {slot.mentorName} ({slot.mentorTitle}) • Date: {slot.date}
                </div>
              </div>

              {slot.feedback && (
                <button
                  onClick={() => setActiveFeedbackModal(slot)}
                  className="btn btn-secondary btn-sm"
                >
                  View Mentor Feedback ({slot.feedback.rating} ★)
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {selectedSlotToBook && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Confirm Mock Interview Booking</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Are you sure you want to book this 1-on-1 mock interview session?
            </p>

            <div style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div><strong>Mentor:</strong> {selectedSlotToBook.mentorName} ({selectedSlotToBook.mentorTitle})</div>
              <div><strong>Type:</strong> {selectedSlotToBook.type}</div>
              <div><strong>Date:</strong> {selectedSlotToBook.date}</div>
              <div><strong>Time:</strong> {selectedSlotToBook.time}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setSelectedSlotToBook(null)} className="btn btn-secondary btn-sm">Cancel</button>
              <button onClick={handleConfirmBooking} className="btn btn-primary btn-sm">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback View Modal */}
      {activeFeedbackModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '550px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.35rem' }}>Mentor Evaluation Feedback</h3>
              <button onClick={() => setActiveFeedbackModal(null)} className="btn btn-secondary btn-sm">✕ Close</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem', backgroundColor: 'rgba(245, 158, 11, 0.12)', borderRadius: 'var(--radius-md)' }}>
                <Star size={24} style={{ color: 'var(--amber-500)', fill: 'var(--amber-500)' }} />
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1.2rem' }}>{activeFeedbackModal.feedback.rating} / 5.0 Rating</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Evaluated by {activeFeedbackModal.mentorName}</div>
                </div>
              </div>

              <div>
                <h4 style={{ color: 'var(--emerald-500)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>Key Strengths</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>{activeFeedbackModal.feedback.strengths}</p>
              </div>

              <div>
                <h4 style={{ color: 'var(--rose-500)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>Areas to Improve</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>{activeFeedbackModal.feedback.areasToImprove}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MockInterviews;
