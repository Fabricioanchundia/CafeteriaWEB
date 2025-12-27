"use client";

import React, { useMemo, useState } from "react";

/* =======================
   TIPOS
======================= */

type OrderItem = {
  productName?: string;
  quantity?: number;
  price?: number;
};

type Order = {
  id?: number | string;
  createdAt?: string;
  customerName?: string;
  customer?: {
    name?: string;
    firstName?: string;
    lastName?: string;
  };
  status?: "pending" | "completed" | "cancelled";
  total?: number;
  items?: OrderItem[];
};

/* =======================
   COMPONENTE
======================= */

export default function OrderTable({ orders = [] }: { orders?: Order[] }) {
  /* =======================
     ESTADOS
  ======================= */

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  /* =======================
     HELPERS
  ======================= */

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("es-EC", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const money = (v?: number) =>
    Number(v ?? 0).toLocaleString("es-EC", {
      style: "currency",
      currency: "USD",
    });

  const getCustomerName = (o: Order) =>
    o.customerName ||
    o.customer?.name ||
    `${o.customer?.firstName ?? ""} ${o.customer?.lastName ?? ""}`.trim() ||
    "—";

  /* =======================
     ESTADO → COLOR
  ======================= */

  const statusClass = (s?: Order["status"]) => {
    switch (s) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /* =======================
     PAGINACIÓN REAL
  ======================= */

  const totalPages = Math.ceil(orders.length / pageSize);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [orders, page]);

  if (orders.length === 0) {
    return <p className="text-gray-400 text-sm">No hay órdenes.</p>;
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <>
      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="border-b text-[#7b3f1d]">
            <tr>
              <th className="py-3 text-left">ID</th>
              <th className="py-3 text-left">Cliente</th>
              <th className="py-3 text-left hidden md:table-cell">
                Fecha
              </th>
              <th className="py-3 text-left">Pedido</th>
              <th className="py-3 text-right">Total / Estado</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((o) => (
              <tr
                key={o.id}
                onClick={() => setSelectedRow(o.id ?? null)}
                className={`border-b transition cursor-pointer
                  hover:bg-orange-50
                  ${selectedRow === o.id ? "bg-orange-100" : ""}
                `}
              >
                <td className="py-4 font-semibold text-[#7b3f1d]">
                  #{o.id}
                </td>

                <td className="py-4">{getCustomerName(o)}</td>

                <td className="py-4 text-gray-700 hidden md:table-cell">
                  {formatDate(o.createdAt)}
                </td>

                <td className="py-4">
                  {o.items?.length ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(o);
                      }}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600"
                    >
                      Ver pedido ({o.items.length})
                    </button>
                  ) : (
                    "—"
                  )}
                </td>

                {/* TOTAL + ESTADO */}
                <td className="py-4 pr-6">
                  <div className="flex justify-end items-center gap-3">
                    <span className="font-bold text-gray-900">
                      {money(o.total)}
                    </span>

                    <select
                      value={o.status}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border ${statusClass(
                        o.status
                      )}`}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        o.status = e.target.value as Order["status"];
                      }}
                    >
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded-lg bg-neutral-200 disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="px-3 py-1 text-sm font-semibold">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded-lg bg-neutral-200 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* MODAL DETALLE */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Pedido #{selectedOrder.id}
            </h3>

            <div className="space-y-2">
              {selectedOrder.items?.map((it, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b pb-1"
                >
                  <span>
                    {it.productName} x{it.quantity}
                  </span>
                  <span className="font-semibold">
                    {money(
                      (it.price ?? 0) * (it.quantity ?? 1)
                    )}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
