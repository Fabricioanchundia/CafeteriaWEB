type Props = {
  categories: any[];
  active: number | null;
  onChange: (id: number | null) => void;
};

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            active === cat.id
              ? "bg-[#c5743a] text-white border-[#c5743a]"
              : "bg-white text-[#7b3f1d] border-[#d9b9a0] hover:bg-orange-50"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
