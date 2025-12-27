"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MetricCard from "@/components/MetricCard";
import ChartSales from "@/components/ChartSales";
import AdminTabs from "@/components/AdminTabs";
import OrderTable from "@/components/OrderTable";

import dashboardApi from "@/lib/dashboardApi";

type AnalyticsSummary = {
  totalOrders: number;
  totalRevenue: number;
};

export default function AdminDashboard() {
  const router = useRouter();
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

  useEffect(() => {
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

  const loadCoreData = async () => {
    try {
      const ordersRes = await dashboardApi.get("/orders");
      const customersRes = await dashboardApi.get("/customer-service");

      const customersMap = new Map(
        customersRes.data.map((c: any) => [c.id, c])
      );

      const ordersWithCustomer = ordersRes.data.map((o: any) => ({
        ...o,
        customer: customersMap.get(o.customerId) || null,
      }));

      setOrders(ordersWithCustomer);
      setCustomers(customersRes.data);
    } catch (e) {
      console.error("Error cargando datos", e);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const summaryRes = await dashboardApi.get("/analytics/summary");
      setSummary(summaryRes.data);
    } catch {}

    try {
      const salesRes = await dashboardApi.get("/analytics/daily-sales");
      setDailySales(salesRes.data ?? []);
    } catch {}

    try {
      const topRes = await dashboardApi.get("/analytics/top-items?limit=3");
      setTopItems(topRes.data ?? []);
    } catch {}

    try {
      const menuRes = await dashboardApi.get("/menu-items");
      setMenuItems(menuRes.data ?? []);
    } catch {}
  };

  const menuMap = new Map(menuItems.map((m: any) => [m.id, m.name]));

  if (loading) {
    return <div className="p-6">Cargando dashboard…</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/images/assets/background/background-login-urbanroast.png')",
      }}
    >
      {/* overlay */}
      <div className="min-h-screen bg-[#f8f5f1]/90 p-10 space-y-10">
        <h1 className="text-4xl font-bold text-[#7b3f1d]">
          Dashboard Admin
        </h1>

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
                          <td className="py-2">
                            {c.name ??
                              `${c.firstName ?? ""} ${c.lastName ?? ""}`}
                          </td>
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
                  {topItems.map((item: any) => (
                    <div
                      key={item.menuItemId}
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
    </div>
  );
}
