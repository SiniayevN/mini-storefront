'use client';

import { useEffect, useMemo, useState } from 'react';
import StatusMessage from './StatusMessage';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Controlled filters
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch products once
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

  // Category options
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Apply filters
  const filtered = useMemo(() => {
    return products.filter(p => {
      const catOk   = category === 'All' || p.category === category;
      const priceOk = !maxPrice || p.price <= Number(maxPrice);
      return catOk && priceOk;
    });
  }, [products, category, maxPrice]);

  return (
    <section className="grid gap-6">
      {/* Filters row */}
      <div className="grid md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
          />
          <PriceFilter
            value={maxPrice}
            onChange={setMaxPrice}
          />
        </div>
      </div>

      {/* Status messages */}
      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && filtered.length === 0}
      />

      {/* Product grid */}
      {!loading && !error && filtered.length > 0 && (
        <ProductList products={filtered} />
      )}
    </section>
  );
}
