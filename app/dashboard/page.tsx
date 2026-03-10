export default function Dashboard() {
  return (
    <main>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Painel
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-600">Saldo atual</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            1 245€
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-600">Despesas este mês</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            520€
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-600">Objetivo poupança</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            300€
          </h2>
        </div>

      </div>

      <div className="mt-10 bg-white p-6 rounded-2xl shadow border">

        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Atividade recente
        </h3>

        <div className="space-y-2 text-gray-700">

          <div className="flex justify-between">
            <span>Almoço</span>
            <span className="font-bold">12€</span>
          </div>

          <div className="flex justify-between">
            <span>Gasolina</span>
            <span className="font-bold">40€</span>
          </div>

          <div className="flex justify-between">
            <span>Netflix</span>
            <span className="font-bold">9,99€</span>
          </div>

        </div>

      </div>

    </main>
  );
}