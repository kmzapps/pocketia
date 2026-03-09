import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        PocketIA
      </h1>

      <nav className="space-y-4">

        <Link href="/dashboard" className="block hover:text-green-400">
          📊 Dashboard
        </Link>

        <Link href="/expenses" className="block hover:text-green-400">
          💰 Despesas
        </Link>

        <Link href="/goals" className="block hover:text-green-400">
          🎯 Objetivos
        </Link>

        <Link href="/assistant" className="block hover:text-green-400">
          🤖 PocketIA
        </Link>

      </nav>
    </div>
  );
}