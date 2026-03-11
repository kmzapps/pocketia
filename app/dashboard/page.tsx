"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type Expense = {
  id?: number;
  amount: number;
  description: string;
  created_at?: string;
};

const TARGET_SAVINGS = 300;
const STARTING_BALANCE = 1245;

function isCurrentMonth(dateValue?: string) {
  if (!dateValue) return false;

  const date = new Date(dateValue);
  const now = new Date();

  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabaseError = useMemo(() => {
    try {
      getSupabaseClient();
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : "Supabase não configurado.";
    }
  }, []);

  useEffect(() => {
    async function loadExpenses() {
      if (supabaseError) {
        setErrorMessage(supabaseError);
        setLoading(false);
        return;
      }

      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage("Não foi possível carregar o dashboard.");
      } else {
        setExpenses((data ?? []) as Expense[]);
      }

      setLoading(false);
    }

    loadExpenses();
  }, [supabaseError]);

  const monthlyExpenses = useMemo(() => {
    const withDates = expenses.filter((item) => item.created_at);

    if (withDates.length === 0) {
      return expenses.reduce((total, item) => total + item.amount, 0);
    }

    return expenses
      .filter((item) => isCurrentMonth(item.created_at))
      .reduce((total, item) => total + item.amount, 0);
  }, [expenses]);

  const balance = STARTING_BALANCE - monthlyExpenses;
  const recentExpenses = expenses.slice(0, 3);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Painel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-600">Saldo atual</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{formatEuro(balance)}</h2>
        </div>

        <div className="card">
          <p className="text-gray-600">Despesas este mês</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{formatEuro(monthlyExpenses)}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-600">Objetivo poupança</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{formatEuro(TARGET_SAVINGS)}</h2>
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-2xl shadow border">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Atividade recente</h3>

        {loading && <p className="text-gray-600">A carregar atividade...</p>}
        {!loading && errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {!loading && !errorMessage && recentExpenses.length === 0 && (
          <p className="text-gray-600">Sem atividade recente.</p>
        )}

        <div className="space-y-2 text-gray-700">
          {recentExpenses.map((expense, index) => (
            <div
              key={expense.id ?? `${expense.description}-${index}`}
              className="flex justify-between"
            >
              <span>{expense.description}</span>
              <span className="font-bold">{formatEuro(expense.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
