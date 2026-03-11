export default function Home() {
  return (
    <div className="space-y-8">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Visão Geral
        </h1>
        <p className="text-gray-500">
          O teu assistente financeiro inteligente
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-3 gap-6">

        <Card title="Saldo total" value="€7,538" />

        <Card title="Despesas este mês" value="€2,450" />

        <Card title="Orçamento restante" value="€1,049" />

      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Despesas por categoria
          </h3>

          <div className="h-48 flex items-center justify-center text-gray-400">
            gráfico aqui
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Assistente IA
          </h3>

          <p className="text-gray-500 text-sm">
            Pergunta algo como:
          </p>

          <ul className="text-sm mt-2 space-y-1 text-gray-600">
            <li>Quanto gastei este mês?</li>
            <li>Onde gasto mais dinheiro?</li>
            <li>Posso poupar mais?</li>
          </ul>
        </div>

      </div>

      {/* Transações */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold mb-4">
          Transações recentes
        </h3>

        <div className="text-gray-400 text-sm">
          Ainda sem transações
        </div>

      </div>

    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}