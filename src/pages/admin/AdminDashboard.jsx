import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import {
  Users,
  Building,
  HelpCircle,
  Video,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { portalService } from '../../services/portalService';

const COLORS = ['#123B3A', '#20A69A', '#0D9488', '#10B981', '#F59E0B'];

const AdminDashboard = () => {
  const { adminUsers, codingProblems, companies, mockInterviews } = useAuth();
  const [departmentDistribution, setDepartmentDistribution] = useState([]);

  useEffect(() => {
    portalService.getAdminOverviewReports().then(report => {
      if (Array.isArray(report?.departmentDistribution)) {
        setDepartmentDistribution(report.departmentDistribution);
      }
    });
  }, []);

  const inventoryData = [
    { name: 'Companies', value: companies.length },
    { name: 'Coding problems', value: codingProblems.length },
    { name: 'Interview slots', value: mockInterviews.length }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Admin Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-600) 100%)',
          color: '#FFF',
          padding: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem', width: 'fit-content' }}>
          <ShieldCheck size={16} /> Placement Administration Console
        </div>
        <h1 style={{ fontSize: '2rem', color: '#FFF', marginBottom: '0.5rem' }}>
          Placement Cell Admin Portal
        </h1>
        <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
          Manage registered students, question bank repositories, company placement drives, and mock interview slots.
        </p>
      </div>

      {/* Admin Metrics */}
      <div className="grid-4">
        <StatCard
          title="Registered Students"
          value={(adminUsers?.length || 0).toString()}
          icon={Users}
          color="teal"
          description="Student accounts"
        />
        <StatCard
          title="Question Bank"
          value={(codingProblems?.length || 0).toString()}
          icon={HelpCircle}
          color="cyan"
          description="DSA & Aptitude"
        />
        <StatCard
          title="Partner Companies"
          value={(companies?.length || 0).toString()}
          icon={Building}
          color="teal"
          description="Active Campus Recruiter"
        />
        <StatCard
          title="Mock Interviews"
          value={(mockInterviews?.length || 0).toString()}
          icon={Video}
          color="emerald"
          description="Total Scheduled Slots"
        />
      </div>

      {/* Admin Recharts Analytics */}
      <div className="grid-2">
        
        {/* Department Distribution Bar Chart */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Student Distribution by Department</h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentDistribution} layout="vertical">
                <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} width={130} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="students" fill="#20A69A" radius={[0, 6, 6, 0]} name="Students Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Test Performance Pie Chart */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Portal Inventory</h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Admin Quick Action Shortcuts */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Admin Control Actions</h3>
        <div className="grid-4">
          <Link to="/admin/users" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <Users size={18} /> Manage Registered Users
          </Link>
          <Link to="/admin/questions" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <HelpCircle size={18} /> Add / Edit Questions
          </Link>
          <Link to="/admin/companies" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <Building size={18} /> Add Company Drives
          </Link>
          <Link to="/admin/mock-interviews" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <Video size={18} /> Schedule Mock Slots
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
