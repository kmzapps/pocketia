"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Settings() {

  const [balance, setBalance] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    const { data, error } = await supabase
      .from("profile")
      .select("balance, monthly_budget")
      .eq("id", 1)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setBalance(String(data.balance || ""));
      setBudget(String(data.monthly_budget || ""));
    }

  }

  async function saveProfile() {

    setLoading(true);

    const { error } = await supabase
      .from("profile")
      .update({
        balance: Number(balance),
        monthly_budget: Number(budget)
      })
      .eq("id", 1);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Erro ao guardar.");
    } else {
      alert("Configurações guardadas!");
    }

  }

  return (
    <div className="space-y-8 max-w-md">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Configurações
        </h1>

        <p className="text-gray-500">
          Define o teu saldo inicial e orçamento mensal
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow border space-y-4">

        <div>
          <label className="text-sm text-gray-600">
            Saldo inicial
          </label>

          <input
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Ex: 1500"
            className="border p-3 rounded-lg w-full text-gray-900"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Orçamento mensal
          </label>

          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Ex: 500"
            className="border p-3 rounded-lg w-full text-gray-900"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={loading}
          className="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800"
        >
          {loading ? "A guardar..." : "Guardar"}
        </button>

      </div>

    </div>
  );
}
