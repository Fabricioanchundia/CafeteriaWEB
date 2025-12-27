"use client";

import { useEffect, useState } from "react";
import dashboardApi from "@/lib/dashboardApi";

export default function AdminClientsPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await dashboardApi.get("/customer-service");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error cargando clientes", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  if (loading) return <div className="p-10">Cargando clientes…</div>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold text-[#7b3f1d]">Clientes</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Nombre</th>
              <th className="text-left py-2">Email</th>
              <th className="text-right py-2">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="py-2">
                  {c.name ||
                    `${c.firstName ?? ""} ${c.lastName ?? ""}`}
                </td>
                <td className="py-2">{c.email}</td>
                <td className="py-2 text-right">{c.phone ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
