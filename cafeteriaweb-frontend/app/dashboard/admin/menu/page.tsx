"use client";

import { useEffect, useState } from "react";
import dashboardApi from "@/lib/dashboardApi";

/* =======================
   TIPOS
======================= */

type Category = {
  id: number;
  name: string;
  description: string;
};

type MenuItem = {
  id: number;
  name: string;
  price: string;
  available: boolean;
  categoryId: number;
  category?: Category;
};

/* =======================
   COMPONENTE BADGE
======================= */

const StatusBadge = ({ available }: { available: boolean }) => {
  return (
    <span
      className={`inline-flex justify-center items-center px-4 py-1 rounded-full text-sm font-semibold
      ${
        available
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {available ? "Disponible" : "Agotado"}
    </span>
  );
};

/* =======================
   PAGE
======================= */

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* =======================
     LOAD DATA
  ======================= */

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        dashboardApi.get("/categories"),
        dashboardApi.get("/menu-service"),
      ]);

      setCategories(categoriesRes.data ?? []);
      setItems(itemsRes.data ?? []);
    } catch (error) {
      console.error("❌ Error cargando menú", error);
      setCategories([]);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Cargando menú…</div>;
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="p-10 space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#7b3f1d]">
          Menú
        </h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl border border-[#c5743a] text-[#c5743a] font-semibold">
            + Categoría
          </button>
          <button className="px-4 py-2 rounded-xl bg-[#c5743a] text-white font-semibold">
            + Producto
          </button>
        </div>
      </div>

      {/* CATEGORÍAS */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryItems = items.filter(
            (item) => item.categoryId === category.id
          );

          return (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
            >
              {/* CATEGORY HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-[#7b3f1d]">
                    {category.name}
                  </h2>
                  <p className="text-sm text-neutral-600">
                    {category.description}
                  </p>
                </div>

                <span className="text-sm text-neutral-500">
                  {categoryItems.length} producto(s)
                </span>
              </div>

              {/* TABLE HEADER */}
              <div className="grid grid-cols-[1fr_120px_140px] gap-4 pb-2 border-b text-sm font-semibold text-[#7b3f1d]">
                <div>Producto</div>
                <div className="text-right">Precio</div>
                <div className="text-center">Estado</div>
              </div>

              {/* PRODUCTS */}
              {categoryItems.length === 0 ? (
                <p className="text-sm text-neutral-500 py-4">
                  No hay productos en esta categoría
                </p>
              ) : (
                categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_120px_140px] gap-4 py-3 border-b items-center"
                  >
                    <div className="font-medium text-neutral-800">
                      {item.name}
                    </div>

                    <div className="text-right font-semibold">
                      ${Number(item.price).toFixed(2)}
                    </div>

                    <div className="flex justify-center">
                      <StatusBadge available={item.available} />
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
