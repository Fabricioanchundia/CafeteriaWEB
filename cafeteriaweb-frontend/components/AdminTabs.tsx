"use client";

import { useState } from "react";

export default function AdminTabs({
  tabs,
}: {
  readonly tabs: readonly {
    readonly key: string;
    readonly label: string;
    readonly content: React.ReactNode;
  }[];
}) {
  const [active, setActive] = useState(tabs[0].key);

  return (
    <div>
      {/* Cabecera Tabs */}
      <div className="flex gap-4 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              active === t.key
                ? "bg-[#c5743a] text-white shadow-md"
                : "bg-neutral-200 text-neutral-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="mt-4">
        {tabs.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}
