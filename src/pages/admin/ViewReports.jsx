import React, { useEffect, useState } from 'react';
import { portalService } from '../../services/portalService';
import {
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
const ViewReports = () => {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    portalService.getAdminOverviewReports()
      .then(data => {
        if (isCurrent) setReport(data);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => { isCurrent = false; };
  }, []);

  const handleExportCSV = () => {
    if (!report) return;
    const rows = [
      ['Metric', 'Value'],
      ['Registered students', report.totalRegisteredStudents],
      ['Coding problems', report.totalCodingProblems],
      ['Coding submissions', report.totalCodingSubmissions],
      ['Aptitude quizzes', report.totalAptitudeQuizzes],
      ['Companies', report.totalCompanies],
      ['Mock interview slots', report.totalMockSlots],
      ...report.departmentDistribution.map(department => [
        `Students in ${department.name}`,
        department.students
      ])
    ];
    const csv = rows.map(row => row
      .map(value => `"${String(value ?? '').replace(/"/g, '""')}"`)
      .join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'futurehire-placement-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const number = value => isLoading ? '...' : Number(value || 0).toLocaleString();
  const activityData = report ? [
    { name: 'Students', value: report.totalRegisteredStudents },
    { name: 'Coding submissions', value: report.totalCodingSubmissions },
    { name: 'Quizzes', value: report.totalAptitudeQuizzes },
    { name: 'Mock slots', value: report.totalMockSlots }
  ] : [];

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

        <button onClick={handleExportCSV} disabled={!report} className="btn btn-primary">
          <Download size={18} /> Export Full Report (.CSV)
        </button>
      </div>

      {!isLoading && !report && (
        <div className="card" role="alert">Reports could not be loaded from the backend.</div>
      )}

      {/* Analytics Summary */}
      <div className="grid-4">
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL STUDENTS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--purple-600)', margin: '0.2rem 0' }}>{number(report?.totalRegisteredStudents)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered student accounts</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL CODING SUBMISSIONS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-600)', margin: '0.2rem 0' }}>{number(report?.totalCodingSubmissions)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saved submissions, not evaluated</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>APTITUDE TESTS TAKEN</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--cyan-600)', margin: '0.2rem 0' }}>{number(report?.totalAptitudeQuizzes)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available quizzes</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>PLACEMENT SHORTLISTS</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--emerald-500)', margin: '0.2rem 0' }}>{number(report?.totalMockSlots)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interview slots</div>
        </div>
      </div>

      {/* Visual Recharts Graphs */}
      <div className="grid-2">
        
        {/* Graph 1 */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Portal Activity</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="value" stroke="#0F766E" fill="rgba(15, 118, 110, 0.2)" strokeWidth={3} name="Records" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2 */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Students by Department</h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report?.departmentDistribution || []}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="students" fill="#0F766E" radius={[6, 6, 0, 0]} name="Registered students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ViewReports;
