"use client";

export default function Card({ title, value, icon }: any) {
  return (
    <div className="bg-white border border-orange-100 shadow-sm rounded-2xl p-5 flex items-center gap-4">
      <div className="p-3 bg-orange-100 text-[#a85b29] rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-neutral-500">{title}</p>
        <p className="text-2xl font-semibold text-[#7b3f1d]">{value}</p>
      </div>
    </div>
  );
}
