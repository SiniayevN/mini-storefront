'use client';

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">Category</span>
      <select
        className="w-full rounded-lg border px-3 py-2 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}
