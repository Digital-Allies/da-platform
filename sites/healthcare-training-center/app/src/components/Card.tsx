import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ elevated = false, className = '', ...props }, ref) => {
    const classes = ['card', elevated && 'card--elevated', className].filter(Boolean).join(' ');
    return <div ref={ref} className={classes} {...props} />;
  }
);

Card.displayName = 'Card';
