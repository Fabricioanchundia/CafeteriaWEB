"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dashboardApi from "@/lib/dashboardApi";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";

export default function CustomerHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "customer") {
      router.replace("/dashboard/admin");
      return;
    }

    loadMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMenu = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        dashboardApi.get("/categories"),
        dashboardApi.get("/menu-service"),
      ]);

      const cats = Array.isArray(catRes.data) ? catRes.data : [];
      const prods = Array.isArray(prodRes.data) ? prodRes.data : [];

      setCategories(cats);
      setProducts(prods);

      if (cats.length > 0) setActiveCategory(cats[0].id);
    } catch (err) {
      console.error("❌ Error cargando menú:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    activeCategory == null
      ? products
      : products.filter((p) => p.categoryId === activeCategory);

  if (loading) {
    return (
      <div className="p-10 text-[#7b3f1d] text-center">
        Cargando cafetería… ☕
      </div>
    );
  }

  return (
    <div className="px-6 py-10 space-y-20 relative">
      {/* 🛒 CARRITO (SIEMPRE VISIBLE) */}
      <CartDrawer />

      {/* HERO */}
      <section className="max-w-6xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#7b3f1d]">
          Café Urban Roast ☕
        </h1>
        <p className="text-neutral-600 text-lg">
          Disfruta nuestros cafés y postres artesanales
        </p>
      </section>

      {/* 🎥 VIDEO DEMO */}
      <section className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-[#e7d9cf]">
          <video
            src="/videos/urban-roast-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[420px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
            <h2 className="text-white text-3xl font-bold">
              Vive la experiencia Urban Roast
            </h2>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-[#7b3f1d] mb-4">
          Categorías
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeCategory === cat.id
                  ? "bg-[#c5743a] text-white border-[#c5743a]"
                  : "bg-white text-[#7b3f1d] border-[#c5743a] hover:bg-[#f5e6dc]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-[#7b3f1d] mb-6">
          Productos
        </h2>

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">
            No hay productos en esta categoría.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => {
              const categoryName =
                categories.find((c) => c.id === p.categoryId)?.name ?? "";

              return (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    category: {
                      name: categoryName,
                    },
                  }}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
