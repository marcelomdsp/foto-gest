'use client';
import { Bell } from 'lucide-react';
import { useSidebarStore } from '../lib/store/sidebarStore';


interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { toggle } = useSidebarStore();
  return (
    <div className=" fixed w-full bg-white shadow-sm p-4 flex items-center justify-between top-0 z-10">
      <button className="md:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors"
        onClick={toggle}
      >
        <span className="sr-only">Abrir menu</span>
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      
      <div className="flex items-center gap-4">
        {/* Notificações */}
        <button className="relative hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <Bell size={24} className="text-gray-600" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-purple-700 transition-colors">
          F
        </div>
      </div>
    </div>
  );
}