import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
  showValue?: boolean;
}

export function ProgressBar({ 
  label, 
  value, 
  maxValue, 
  color = 'bg-purple-600',
  showValue = true 
}: ProgressBarProps) {
  const percentage = (value / maxValue) * 100;
  
  const formatarValor = (val: number): string => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        {showValue && <span className="font-bold text-gray-800">{formatarValor(value)}</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}