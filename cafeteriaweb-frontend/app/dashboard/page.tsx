"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import MetricCard from "@/components/MetricCard";
import ChartSales from "@/components/ChartSales";
import AdminTabs from "@/components/AdminTabs";
import OrderTable from "@/components/OrderTable";

import dashboardApi from "@/lib/dashboardApi";

/* =======================
   TIPOS
======================= */

type AnalyticsSummary = {
  totalOrders: number;
  totalRevenue: number;
};

export default function AdminDashboard() {
  const router = useRouter();

  /* =======================
     ESTADOS
  ======================= */

  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [dailySales, setDailySales] = useState<any[]>([]);
  const [topItems, setTopItems] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [summary, setSummary] = useState<AnalyticsSummary>({
    totalOrders: 0,
    totalRevenue: 0,
  });

  /* =======================
     AUTH + LOAD
  ======================= */

  useEffect(() => {
    // 🔴 CORRECCIÓN: el login guarda "token", NO "access_token"
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/dashboard/customers");
      return;
    }

    loadCoreData();
    loadAnalytics();
  }, []);

  /* =======================
     1️⃣ CORE DATA
  ======================= */

  const loadCoreData = async () => {
    try {
      const [ordersRes, customersRes] = await Promise.all([
        dashboardApi.get("/orders"),
        dashboardApi.get("/customer-service"),
      ]);

      const customersMap = new Map(
        customersRes.data.map((c: any) => [c.id, c])
      );

      const ordersWithCustomer = ordersRes.data.map((o: any) => ({
        ...o,
        customer: customersMap.get(o.customerId) || null,
      }));

      setOrders(ordersWithCustomer);
      setCustomers(customersRes.data);
    } catch (error) {
      console.error("❌ Error cargando órdenes o clientes", error);
      setOrders([]);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     2️⃣ ANALYTICS
  ======================= */

  const loadAnalytics = async () => {
    try {
      const summaryRes = await dashboardApi.get("/analytics/summary");
      setSummary(summaryRes.data);
    } catch {
      setSummary({ totalOrders: 0, totalRevenue: 0 });
    }

    try {
      const salesRes = await dashboardApi.get("/analytics/daily-sales");
      setDailySales(salesRes.data ?? []);
    } catch {
      setDailySales([]);
    }

    try {
      const topRes = await dashboardApi.get("/analytics/top-items?limit=3");
      setTopItems(topRes.data ?? []);
    } catch {
      setTopItems([]);
    }

    // Menú (solo nombres)
    try {
      const menuRes = await dashboardApi.get("/menu-items");
      setMenuItems(menuRes.data ?? []);
    } catch {
      setMenuItems([]);
    }
  };

  /* =======================
     HELPERS
  ======================= */

  const menuMap = new Map(
    menuItems.map((m: any) => [m.id, m.name])
  );

  const getCustomerName = (c: any) =>
    c?.name ||
    `${c?.firstName ?? ""} ${c?.lastName ?? ""}`.trim() ||
    "—";

  if (loading) {
    return <div className="p-6">Cargando dashboard…</div>;
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="p-10 space-y-10">

      {/* TÍTULO + LOGO */}
      <div className="flex items-center gap-4">
        <Image
          src="/images/assets/logo/logo-urbanroast-2.png"
          alt="Café Urban Roast"
          width={56}
          height={56}
          priority
        />

        <h1 className="text-4xl font-bold text-[#7b3f1d]">
          Dashboard Admin
        </h1>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Órdenes Totales" value={summary.totalOrders} />
        <MetricCard title="Clientes Totales" value={customers.length} />
        <MetricCard
          title="Ingresos Totales"
          value={`$${Number(summary.totalRevenue).toFixed(2)}`}
        />
      </div>

      <ChartSales data={dailySales} />

      <AdminTabs
        tabs={[
          {
            key: "orders",
            label: "Órdenes",
            content: <OrderTable orders={orders} />,
          },
          {
            key: "customers",
            label: "Clientes",
            content: (
              <div className="bg-white p-6 rounded-xl shadow">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Nombre</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-right py-2">Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c: any) => (
                      <tr key={c.id} className="border-b">
                        <td className="py-2">{getCustomerName(c)}</td>
                        <td className="py-2">{c.email}</td>
                        <td className="py-2 text-right">
                          {c.phone ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            key: "analytics",
            label: "Analíticas",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topItems.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border bg-orange-50"
                  >
                    <p className="font-bold text-lg">
                      {menuMap.get(item.menuItemId) ??
                        `Producto #${item.menuItemId}`}
                    </p>
                    <p>Vendidos: {item.quantitySold}</p>
                    <p>
                      Ingresos: $
                      {Number(item.revenue).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
