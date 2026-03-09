export default function Dashboard() {
  return (
    <main className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-900">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Saldo atual</p>
          <h2 className="text-2xl font-bold text-green-500">
            1 245€
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Despesas este mês</p>
          <h2 className="text-2xl font-bold">
            520€
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Objetivo poupança</p>
          <h2 className="text-2xl font-bold">
            300€
          </h2>
        </div>

      </div>

    </main>
  );
}