import type { ReactNode } from 'react';

import SidebarAdmin from '@/components/SidebarAdmin';

type AdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <main className="flex-1 p-6 bg-[#f8f5f1]">
        {children}
      </main>
    </div>
  );
}
