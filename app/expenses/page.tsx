"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type Expense = {
  id?: number;
  amount: number;
  description: string;
  created_at?: string;
};

function parseExpenseInput(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d+(?:[.,]\d{1,2})?)\s*€?\s*(.*)$/);

  if (!match) return null;

  const amount = Number(match[1].replace(",", "."));
  if (Number.isNaN(amount) || amount <= 0) return null;

  return {
    amount,
    description: match[2]?.trim() || "Despesa",
  };
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export default function Expenses() {
  const [input, setInput] = useState("");
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
        setErrorMessage("Não foi possível carregar despesas.");
      } else {
        setExpenses((data ?? []) as Expense[]);
      }

      setLoading(false);
    }

    loadExpenses();
  }, [supabaseError]);

  async function addExpense() {
    setErrorMessage(null);

    if (supabaseError) {
      setErrorMessage(supabaseError);
      return;
    }

    const parsed = parseExpenseInput(input);
    if (!parsed) {
      setErrorMessage("Formato inválido. Usa algo como: 12,50€ almoço");
      return;
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("expenses")
      .insert([{ amount: parsed.amount, description: parsed.description }])
      .select();

    if (error) {
      setErrorMessage("Erro ao guardar despesa.");
      return;
    }

    if (data?.[0]) setExpenses((current) => [data[0] as Expense, ...current]);
    setInput("");
  }

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Despesas</h1>

      <div className="card max-w-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: 12,50€ almoço"
          className="border p-3 rounded-lg w-full text-gray-900"
        />

        <button
          onClick={addExpense}
          className="mt-4 w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800"
        >
          Adicionar
        </button>

        {errorMessage && <p className="mt-3 text-sm text-red-600">{errorMessage}</p>}
      </div>

      <div className="mt-8 max-w-md">
        {loading && <p className="text-gray-600">A carregar despesas...</p>}

        {!loading && expenses.length === 0 && (
          <p className="text-gray-600">Ainda não tens despesas registadas.</p>
        )}

        {expenses.map((expense, index) => (
          <div
            key={expense.id ?? `${expense.description}-${index}`}
            className="card mb-2 flex justify-between text-gray-900"
          >
            <span>{expense.description}</span>
            <span className="font-bold">{formatEuro(expense.amount)}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
