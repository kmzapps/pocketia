"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Expenses() {

  const [input, setInput] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);

  async function addExpense() {

    const match = input.match(/(\d+)\s*€?\s*(.*)/);

    if (!match) return;

    const amount = Number(match[1]);
    const description = match[2] || "Despesa";

    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          amount: amount,
          description: description
        }
      ])
      .select();

    if (error) {
      console.error("Erro ao guardar:", error);
      return;
    }

    setExpenses([...expenses, data[0]]);
    setInput("");
  }

  return (
    <main>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Despesas
      </h1>

      <div className="card max-w-md">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: 12€ almoço"
          className="border p-3 rounded-lg w-full text-gray-900"
        />

        <button
          onClick={addExpense}
          className="mt-4 w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800"
        >
          Adicionar
        </button>

      </div>

      <div className="mt-8 max-w-md">

        {expenses.map((e, i) => (
          <div
            key={i}
            className="card mb-2 flex justify-between text-gray-900"
          >
            <span>{e.description}</span>
            <span className="font-bold">{e.amount}€</span>
          </div>
        ))}

      </div>

    </main>
  );
}