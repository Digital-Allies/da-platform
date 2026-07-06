import React from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  size = 'md',
  color = 'var(--color-teal)',
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`progress progress--${size}`}>
      {label && <label className="progress__label">{label}</label>}
      <div className="progress__bar">
        <div className="progress__fill" style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>
      <span className="progress__text">
        {value} / {max}
      </span>
    </div>
  );
};
