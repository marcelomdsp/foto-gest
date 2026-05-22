import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  className?: string;
}

export function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  className = '' 
}: InputProps) {
  return (
    <div className="relative flex-1">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      />
    </div>
  );
}