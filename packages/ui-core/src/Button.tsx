// Shared UI Button component
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => (
  <button {...props} style={{ padding: '8px 16px', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none' }}>
    {label}
  </button>
); 