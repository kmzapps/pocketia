import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#4C1D95] text-white p-6 flex flex-col">

      <h1 className="text-2xl font-bold mb-10">
        PocketIA
      </h1>

      <nav className="space-y-3">

        <Link href="/dashboard" className="block p-3 rounded-lg hover:bg-[#5B21B6]">
          📊 Painel
        </Link>

        <Link href="/expenses" className="block p-3 rounded-lg hover:bg-[#5B21B6]">
          💰 Despesas
        </Link>

        <Link href="/goals" className="block p-3 rounded-lg hover:bg-[#5B21B6]">
          🎯 Objetivos
        </Link>

        <Link href="/assistant" className="block p-3 rounded-lg hover:bg-[#5B21B6]">
          🤖 PocketIA
        </Link>

      </nav>

    </div>
  );
}