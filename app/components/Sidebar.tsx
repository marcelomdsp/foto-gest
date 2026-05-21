"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  ChevronLeft,
} from "lucide-react";
import { MenuItemType } from "../types";
import { useSidebarStore } from "../lib/store/sidebarStore";

const menuItems: MenuItemType[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/" },
  { id: "clientes", label: "Clientes", icon: Users, href: "/clientes" },
  {
    id: "agendamentos",
    label: "Agendamentos",
    icon: Calendar,
    href: "/agendamentos",
  },
  {
    id: "pagamentos",
    label: "Pagamentos",
    icon: DollarSign,
    href: "/pagamentos",
  },
  {
    id: "relatorios",
    label: "Relatórios",
    icon: BarChart3,
    href: "/relatorios",
  },
];

export default function Sidebar() {
  const { isOpen, toggle, close } = useSidebarStore();
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed h-full flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden w-50 h-full  text-white transition-all duration-800 bg-linear-to-b from-purple-600 to-purple-800 z-20`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera size={28} />
            <span className="font-bold text-xl">FotoGest</span>
          </div>
          <button
            onClick={close}
            className=" ml-3 bg-white text-purple-600 rounded-full p-1 hover:bg-blend-darken transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Toggle Button */}

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-white text-purple-600" : "hover:bg-purple-700"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500">
          <p className="text-xs text-purple-200 text-center">© 2026 FotoGest</p>
        </div>
      </div>

      {/* Desktop Sidebar */}

      <div
        className={`hidden md:flex flex-col w-70  text-white transition-all duration-300 bg-linear-to-b from-purple-600 to-purple-800`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera size={28} />
            <span className="font-bold text-xl">FotoGest</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-white text-purple-600" : "hover:bg-purple-700"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500">
          <p className="text-xs text-purple-200 text-center">© 2026 FotoGest</p>
        </div>
      </div>
    </>
  );
}
