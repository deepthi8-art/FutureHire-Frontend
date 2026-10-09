import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary', description }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'purple':
      case 'teal':
        return { bg: 'rgba(32, 166, 154, 0.12)', text: 'var(--teal-700)' };
      case 'cyan':
        return { bg: 'rgba(18, 59, 58, 0.10)', text: 'var(--teal-800)' };
      case 'emerald':
        return { bg: 'rgba(16, 185, 129, 0.12)', text: 'var(--emerald-500)' };
      case 'amber':
        return { bg: 'rgba(245, 158, 11, 0.12)', text: 'var(--amber-500)' };
      default:
        return { bg: 'rgba(32, 166, 154, 0.12)', text: 'var(--teal-700)' };
    }
  };

  const style = getColorStyles();

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: style.bg,
              color: style.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-title)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {trend && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: trend === 'up' ? 'var(--emerald-500)' : 'var(--rose-500)'
            }}
          >
            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trendValue}
          </span>
        )}
      </div>

      {description && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {description}
        </span>
      )}
    </div>
  );
};

export default StatCard;
