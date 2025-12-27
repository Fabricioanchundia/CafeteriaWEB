"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminSidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-orange-100 text-orange-600 font-semibold"
        : "text-neutral-700 hover:bg-orange-50"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-[#f8f4f1] border-r px-4 py-6 space-y-6">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 px-2">
        <Image
          src="/images/assets/logo/logo-urbanroast-2.png"
          alt="Urban Roast"
          width={36}
          height={36}
        />
        <span className="font-bold text-lg text-[#7b3f1d]">
          Urban Roast
        </span>
      </div>

      {/* NAV */}
      <nav className="space-y-2">
        <Link href="/dashboard/admin" className={linkClass("/dashboard/admin")}>
          Dashboard
        </Link>

        <Link
          href="/dashboard/admin/orders"
          className={linkClass("/dashboard/admin/orders")}
        >
          Órdenes
        </Link>

        <Link
          href="/dashboard/admin/menu"
          className={linkClass("/dashboard/admin/menu")}
        >
          Menú
        </Link>

        <Link
          href="/dashboard/admin/customers"
          className={linkClass("/dashboard/admin/customers")}
        >
          Clientes
        </Link>

        <Link
          href="/dashboard/admin/analytics"
          className={linkClass("/dashboard/admin/analytics")}
        >
          Analíticas
        </Link>
      </nav>
    </aside>
  );
}
