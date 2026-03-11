"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Settings() {

  const [balance, setBalance] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    const { data } = await supabase
      .from("profile")
      .select("balance, monthly_budget")
      .limit(1);

    if (data && data.length > 0) {
      setBalance(data[0].balance || "");
      setBudget(data[0].monthly_budget || "");
    }

  }

  async function saveProfile() {

    const { data } = await supabase
      .from("profile")
      .select("*")
      .limit(1);

    if (data && data.length > 0) {

      await supabase
        .from("profile")
        .update({
          balance: Number(balance),
          monthly_budget: Number(budget)
        })
        .eq("id", data[0].id);

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
            className="border p-3 rounded-lg w-full text-gray-900"
          />
        </div>

        <button
          onClick={saveProfile}
          className="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800"
        >
          Guardar
        </button>

      </div>

    </div>
  );
}
