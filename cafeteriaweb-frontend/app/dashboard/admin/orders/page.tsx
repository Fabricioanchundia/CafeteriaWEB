"use client";

import { useEffect, useState } from "react";
import OrderTable from "@/components/OrderTable";
import dashboardApi from "@/lib/dashboardApi";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrdersWithCustomers = async () => {
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
      } catch (error) {
        console.error("Error cargando órdenes:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrdersWithCustomers();
  }, []);

  if (loading) {
    return <div className="p-10">Cargando órdenes…</div>;
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold text-[#7b3f1d]">
        Órdenes
      </h1>

      <OrderTable orders={orders} />
    </div>
  );
}
