'use client';

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) return <p className="text-sm text-gray-600">Loading products…</p>;
  if (error)   return <p className="text-sm text-red-600">Error: {error}</p>;
  if (isEmpty) return <p className="text-sm text-gray-600">No products found.</p>;
  return null;
}
