"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Target, Bot } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white p-6 flex flex-col">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">
        PocketIA
      </h1>

      {/* Menu */}
      <nav className="space-y-3">

        <MenuItem
          href="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Visão Geral"
          active={pathname === "/dashboard"}
        />

        <MenuItem
          href="/expenses"
          icon={<Wallet size={18} />}
          label="Despesas"
          active={pathname === "/expenses"}
        />

        <MenuItem
          href="/goals"
          icon={<Target size={18} />}
          label="Objetivos"
          active={pathname === "/goals"}
        />

        <MenuItem
          href="/assistant"
          icon={<Bot size={18} />}
          label="Assistente IA"
          active={pathname === "/assistant"}
        />

      </nav>

    </aside>
  );
}

function MenuItem({ href, icon, label, active }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition ${
        active ? "bg-purple-600" : "hover:bg-purple-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}