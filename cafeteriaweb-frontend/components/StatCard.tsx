"use client";

export default function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-5 flex items-center gap-4">
      <div className="text-[#c5743a] bg-orange-100 p-3 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-neutral-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold text-[#7b3f1d]">{value}</p>
      </div>
    </div>
  );
}
