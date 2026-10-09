import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart3,
  Download,
  Users,
  Trophy,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { progressChartData, departmentDistributionData } from '../../data/mockData';

const ViewReports = () => {
  const { showToast } = useAuth();

  const handleExportCSV = () => {
    showToast('Exporting Placement Analytics Report (CSV)...', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Placement Analytics & Reports</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            System-wide statistics on student preparation velocity, test pass rates, and mock interview completion
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-primary">
          <Download size={18} /> Export Full Report (.CSV)
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid-4">
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL STUDENTS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--purple-600)', margin: '0.2rem 0' }}>1,380</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald-500)' }}>+14% vs last batch</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL CODING SUBMISSIONS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-600)', margin: '0.2rem 0' }}>42,500+</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>92% Pass Rate</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>APTITUDE TESTS TAKEN</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--cyan-600)', margin: '0.2rem 0' }}>18,200</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg 82% Score</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>PLACEMENT SHORTLISTS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--emerald-500)', margin: '0.2rem 0' }}>890</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald-500)' }}>Active Candidates</div>
        </div>
      </div>

      {/* Visual Recharts Graphs */}
      <div className="grid-2">
        
        {/* Graph 1 */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Batch Coding Velocity Trend</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressChartData}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="codingSolved" stroke="#4F46E5" fill="rgba(79, 70, 229, 0.2)" strokeWidth={3} name="Submissions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2 */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Department Performance Comparison</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentDistributionData}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="students" fill="#7C3AED" radius={[6, 6, 0, 0]} name="Participating Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ViewReports;
