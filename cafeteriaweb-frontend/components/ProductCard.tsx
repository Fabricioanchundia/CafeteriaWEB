"use client";

import Image from "next/image";
import { getProductImage } from "@/constants/productImages";
import { useCartStore } from "@/stores/useCartStore";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: {
    name: string;
  };
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  // 👉 ruta de imagen calculada por nombre + categoría
  const imageSrc = getProductImage(product.name, product.category.name);

  return (
    <div className="group rounded-2xl border border-[#c5743a] bg-white shadow-sm hover:shadow-lg transition overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // fallback seguro si algo falla
            (e.currentTarget as HTMLImageElement).src =
              "/images/products/default.png";
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

        {/* PRICE OVER IMAGE */}
        <span className="absolute top-3 right-3 bg-white/90 text-[#7b3f1d] font-bold px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-[#7b3f1d] text-lg">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500">
          {product.description ?? "Producto artesanal premium."}
        </p>

        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: Number(product.price),
              image: imageSrc,
            })
          }
          className="w-full rounded-xl bg-[#c5743a] hover:bg-[#a85b29] text-white py-2 text-sm font-semibold transition"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
