"use client";

import { useAuth } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuth((s) => s.token);

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token]);

  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
