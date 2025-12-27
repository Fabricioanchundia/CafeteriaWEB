"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = Readonly<{
  data: readonly any[];
}>;

export default function ChartSales({ data }: Props) {
  // Normalizar datos (por si vienen distintos del backend)
  const normalized = Array.isArray(data)
    ? data.map((d) => {
        const rawDate = d.date ?? d.day ?? d.label ?? "";
        const total = Number(d.total ?? d.revenue ?? 0);

        const label = rawDate
          ? new Date(rawDate).toLocaleDateString("es-EC", {
              day: "2-digit",
              month: "short",
            })
          : "—";

        return { label, total };
      })
    : [];

  if (normalized.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">No hay datos de ventas.</p>
      </div>
    );
  }

  const isSinglePoint = normalized.length === 1;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#7b3f1d]">Ventas por día</h2>
        <span className="text-xs text-gray-500">
          Fuente: /analytics/daily-sales
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {isSinglePoint ? (
          <BarChart data={normalized}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="total"
              fill="#FF7A00"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        ) : (
          <LineChart data={normalized}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#FF7A00"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
