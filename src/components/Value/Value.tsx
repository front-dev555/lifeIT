import React, { useMemo } from 'react';
import { useQuaxSelector } from '../../quax/useQuaxStore';
import { Loader } from '../Loader/Loader';
import './Value.css';

interface ValueProps {
  className?: string;
}

export const Value: React.FC<ValueProps> = ({ className = '' }) => {
  const { value, loading } = useQuaxSelector((state) => ({
    value: state.value,
    loading: state.loading
  }));

  const valueClassName = useMemo(() =>
    `value ${loading ? 'loading' : ''} ${className}`.trim(),
    [loading, className]
  );

  return (

    <div className={valueClassName}>
      {loading ? (
        <Loader size="medium" />
      ) : (
        <span className="value-text">{value}</span>
      )}
    </div>
  );
};
