
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
}

export function StatsCard({ title, value, icon: Icon, bgColor, textColor }: StatsCardProps) {
  return (
    <div className={`${bgColor} text-white p-6 rounded-xl shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${textColor} text-sm`}>{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon size={32} className="opacity-80" />
      </div>
    </div>
  );
}