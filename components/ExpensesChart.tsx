"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#7C3AED",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#3B82F6"
];

export default function ExpensesChart({ data }: any) {
  return (
    <div className="w-full h-64">

      <ResponsiveContainer>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
          >

            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}