import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`loader ${size} ${className}`} role="status" aria-label="Загрузка">
      <div className="loader-spinner"></div>
    </div>
  );
};
