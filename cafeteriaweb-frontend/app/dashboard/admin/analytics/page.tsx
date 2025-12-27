"use client";

import { useEffect, useMemo, useState } from "react";
import { dashboardApi } from "@/lib/dashboardApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

/* =======================
   TIPOS
======================= */

type Summary = {
  totalOrders: number;
  totalRevenue: number;
};

type DailySale = {
  date?: string;
  day?: string;
  label?: string;
  total?: number;
  revenue?: number;
};

type TopItem = {
  menuItemId: number;
  productName?: string;
  quantitySold: number;
  revenue: number;
};

type Period = "day" | "month" | "year";

type TopBadgeProps = {
  text: string;
};

const TopBadge = ({ text }: TopBadgeProps) => (
  <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#7A3E0E] border border-orange-200">
    {text}
  </span>
);

/* =======================
   PAGE
======================= */

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("day");

  const [summary, setSummary] = useState<Summary>({
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [dailySalesRaw, setDailySalesRaw] = useState<DailySale[]>([]);
  const [topItems, setTopItems] = useState<TopItem[]>([]);

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const [summaryRes, dailyRes, topRes] = await Promise.all([
        dashboardApi.get("/analytics/summary"),
        dashboardApi.get("/analytics/daily-sales"),
        dashboardApi.get("/analytics/top-items?limit=5"),
      ]);

      setSummary(summaryRes.data);
      setDailySalesRaw(Array.isArray(dailyRes.data) ? dailyRes.data : []);
      setTopItems(Array.isArray(topRes.data) ? topRes.data : []);
    } catch (err) {
      console.error("❌ Error cargando analytics:", err);
      setSummary({ totalOrders: 0, totalRevenue: 0 });
      setDailySalesRaw([]);
      setTopItems([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     NORMALIZAR DAILY SALES
  ======================= */

  const normalizedDaily = useMemo(() => {
    return dailySalesRaw.map((x) => {
      const rawDate = x.date ?? x.day ?? x.label ?? "";
      const total = Number(x.total ?? x.revenue ?? 0);

      const label = rawDate
        ? new Date(rawDate).toLocaleDateString("es-EC", {
            day: "2-digit",
            month: "short",
          })
        : "—";

      return { label, total };
    });
  }, [dailySalesRaw]);

  /* =======================
     AGRUPACIÓN POR PERÍODO
  ======================= */

  const chartData = useMemo(() => {
    if (period === "day") return normalizedDaily;

    const map = new Map<string, number>();

    for (const row of normalizedDaily) {
      const key = row.label;
      map.set(key, (map.get(key) ?? 0) + row.total);
    }

    return Array.from(map.entries()).map(([label, total]) => ({
      label,
      total,
    }));
  }, [normalizedDaily, period]);

  /* =======================
     COMPONENTES UI
  ======================= */

  /* =======================
     RENDER
  ======================= */

  if (loading) {
    return <div className="p-6">Cargando analíticas…</div>;
  }

  const isSinglePoint = chartData.length === 1;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#7A3E0E]">Analíticas</h1>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="rounded-lg border px-4 py-2 text-sm bg-white"
        >
          <option value="day">Por día</option>
          <option value="month">Por mes</option>
          <option value="year">Por año</option>
        </select>
      </div>

      {/* RESUMEN + TOP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold text-[#7A3E0E] mb-3">Resumen</h2>
          <div className="space-y-2 text-sm">
            <p>
              Órdenes totales:{" "}
              <span className="font-bold">{summary.totalOrders}</span>
            </p>
            <p>
              Ingresos totales:{" "}
              <span className="font-bold text-green-700">
                ${Number(summary.totalRevenue).toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold text-[#7A3E0E] mb-3">Top productos</h2>

          {topItems.length === 0 ? (
            <p className="text-sm text-gray-500">Sin datos.</p>
          ) : (
            <div className="space-y-3">
              {topItems.map((it) => (
                <div
                  key={it.menuItemId}
                  className="flex items-center justify-between"
                >
                  <TopBadge
                    text={it.productName ?? `Producto #${it.menuItemId}`}
                  />
                  <div className="text-right text-sm">
                    <div>
                      Vendidos: <b>{it.quantitySold}</b>
                    </div>
                    <div className="text-green-700">
                      ${Number(it.revenue).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GRÁFICA */}
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#7A3E0E]">
            Ventas ({period})
          </h2>
          <span className="text-xs text-gray-500">
            Fuente: /analytics/daily-sales
          </span>
        </div>

        {chartData.length === 0 ? (
          <p className="text-sm text-gray-500">No hay datos suficientes.</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            {isSinglePoint ? (
              <BarChart data={chartData}>
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
              <LineChart data={chartData}>
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
        )}
      </div>
    </div>
  );
}
