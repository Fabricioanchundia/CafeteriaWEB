"use client";

import { X, User, Calendar, DollarSign } from "lucide-react";

type OrderModalProps = Readonly<{
  order: any;
  onClose: () => void;
}>;

export default function OrderModal({ order, onClose }: OrderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#7b3f1d]">
            Detalle de Orden #{order.id}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-3 text-sm text-[#4a3728]">
          <p className="flex items-center gap-2">
            <User size={16} /> {order.customerName}
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} /> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="flex items-center gap-2 font-semibold">
            <DollarSign size={16} /> ${order.total}
          </p>
        </div>

        <hr className="my-4" />

        <div className="space-y-2">
          {order.items.map((it: any) => (
            <div
              key={it.id}
              className="flex justify-between rounded-lg bg-[#faf4ee] px-4 py-2"
            >
              <span>{it.name}</span>
              <span>x{it.quantity}</span>
              <span>${it.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
