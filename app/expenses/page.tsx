"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

function detectCategory(description: string) {

  const text = description.toLowerCase();

  if (text.includes("gasolina")) return "Transporte";
  if (text.includes("uber")) return "Transporte";

  if (text.includes("almoço")) return "Alimentação";
  if (text.includes("jantar")) return "Alimentação";

  if (text.includes("netflix")) return "Lazer";
  if (text.includes("cinema")) return "Lazer";

  return "Outros";
}

export default function Expenses() {

  const [input, setInput] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);

  async function addExpense() {

    if (!input.trim()) return;

    const parts = input.trim().split(" ");

    const amount = parseFloat(
      parts[0]
        .replace("€", "")
        .replace(",", ".")
    );

    const description = parts.slice(1).join(" ") || "Despesa";

    const category = detectCategory(description);

    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          amount: amount,
          description: description,
          category: category
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
    <div className="space-y-8">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Despesas
        </h1>
        <p className="text-gray-500">
          Regista e acompanha os teus gastos
        </p>
      </div>

      {/* adicionar despesa */}
      <div className="bg-white p-6 rounded-2xl shadow border max-w-md">

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
          Adicionar despesa
        </button>

      </div>

      {/* lista */}
      <div className="bg-white p-6 rounded-2xl shadow border max-w-md">

        <h3 className="font-semibold mb-4 text-gray-900">
          Últimas despesas
        </h3>

        {expenses.length === 0 && (
          <p className="text-gray-400 text-sm">
            Ainda não tens despesas registadas
          </p>
        )}

        <div className="space-y-2">

          {expenses.map((e, i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-2 text-gray-900"
            >
              <span>{e.description}</span>

              <span className="font-bold">
                {e.amount}€
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}