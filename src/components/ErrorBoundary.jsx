import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FutureHire UI caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#0F172A',
          color: '#F8FAFC'
        }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#F87171' }}>
            Something went wrong rendering this page
          </h2>
          <p style={{ maxWidth: '500px', marginBottom: '1.5rem', color: '#94A3B8', fontSize: '0.9rem' }}>
            {this.state.error?.message || 'An unexpected runtime error occurred.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => {
                localStorage.removeItem('futurehire_token');
                localStorage.removeItem('futurehire_user');
                window.location.href = '/login';
              }}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: '#20A69A',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Clear Session & Relogin
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: 'transparent',
                color: '#FFF',
                border: '1px solid #475569',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
