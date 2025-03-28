import React from 'react';
import './Button.css';

export interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  className = ''
}) => {
  const buttonClassName = `button ${className}`.trim();

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export { Button };
