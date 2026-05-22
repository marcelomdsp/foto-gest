import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon: Icon,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium';
  
  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}