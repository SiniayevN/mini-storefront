'use client';
import { useEffect, useState } from 'react';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) setProducts(data);
      } catch (e) {
        if (!ignore) setError(e.message || 'Failed to load products');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <section className="rounded-lg border bg-white p-4">
      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && products.length === 0}
      />

      {!loading && !error && products.length > 0 && (
        <p className="text-sm text-gray-700">
          Loaded {products.length} products successfully!
        </p>
      )}
    </section>
  );
}
