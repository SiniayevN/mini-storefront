'use client';

export default function PriceFilter({ value, onChange }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">Max Price</span>
      <input
        type="number"
        min="0"
        placeholder="e.g., 300"
        className="w-full rounded-lg border px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
