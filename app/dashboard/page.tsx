"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ExpensesChart from "@/components/ExpensesChart";

export default function Dashboard() {

  const [chartData, setChartData] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    loadExpenses();
    loadProfile();
    loadMonthlyExpenses();
  }, []);

  async function loadProfile() {

    const { data, error } = await supabase
      .from("profile")
      .select("balance, monthly_budget");

    if (error) {
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      setBalance(Number(data[0].balance) || 0);
      setBudget(Number(data[0].monthly_budget) || 0);
    }

  }

  async function loadMonthlyExpenses() {

    const start = new Date();
    start.setDate(1);

    const { data, error } = await supabase
      .from("expenses")
      .select("amount, created_at")
      .gte("created_at", start.toISOString());

    if (error) {
      console.error(error);
      return;
    }

    const total =
      data?.reduce((sum: number, e: any) => sum + Number(e.amount), 0) || 0;

    setMonthlySpent(total);

  }

  async function loadExpenses() {

    const { data, error } = await supabase
      .from("expenses")
      .select("amount, category");

    if (error) {
      console.error(error);
      return;
    }

    const categories: any = {};

    data?.forEach((e) => {

      const cat = e.category || "Outros";

      if (!categories[cat]) {
        categories[cat] = 0;
      }

      categories[cat] += Number(e.amount);

    });

    const formatted = Object.keys(categories).map((key) => ({
      name: key,
      value: categories[key]
    }));

    setChartData(formatted);
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Visão Geral
        </h1>
        <p className="text-gray-500">
          Resumo da tua atividade financeira
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <Card
          title="Saldo atual"
          value={`${balance}€`}
          color="text-green-600"
        />

        <Card
          title="Despesas este mês"
          value={`${monthlySpent}€`}
        />

        <Card
          title="Orçamento restante"
          value={`${budget - monthlySpent}€`}
        />

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-white p-6 rounded-2xl shadow border">

          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Despesas por categoria
          </h3>

          {chartData.length === 0 ? (
            <p className="text-gray-400">
              Ainda não existem despesas
            </p>
          ) : (
            <ExpensesChart data={chartData} />
          )}

        </div>

        <div className="bg-white p-6 rounded-2xl shadow border">

          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Assistente IA
          </h3>

          <p className="text-gray-500 text-sm">
            Pergunta algo como:
          </p>

          <ul className="text-sm mt-3 space-y-1 text-gray-600">
            <li>Quanto gastei este mês?</li>
            <li>Onde gasto mais dinheiro?</li>
            <li>Como posso poupar mais?</li>
          </ul>

        </div>

      </div>

    </div>
  );
}

function Card({ title, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-2 ${color || "text-gray-900"}`}>
        {value}
      </h2>

    </div>
  );
}