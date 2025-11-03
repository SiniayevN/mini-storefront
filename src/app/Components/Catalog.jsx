'use client';

import { useEffect, useMemo, useState } from 'react';
import StatusMessage from './StatusMessage';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';

export default function Catalog() {
  // data loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // filters (controlled)
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');

  // cart: { [id]: { product, qty } }
  const [cart, setCart] = useState({});

  // fetch once
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

  // categories
  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  // apply filters
  const filtered = useMemo(() => {
    return products.filter(p => {
      const catOk = category === 'All' || p.category === category;
      const priceOk = !maxPrice || p.price <= Number(maxPrice);
      return catOk && priceOk;
    });
  }, [products, category, maxPrice]);

  // cart handlers
  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const item = prev[product.id];
      return {
        ...prev,
        [product.id]: { product, qty: item ? item.qty + 1 : 1 }
      };
    });
  };

  const decrement = (id) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;
      const nextQty = item.qty - 1;
      const { [id]: _, ...rest } = prev;
      return nextQty > 0 ? { ...prev, [id]: { ...item, qty: nextQty } } : rest;
    });
  };

  const resetCart = () => setCart({});

  // totals
  const items = Object.values(cart);
  const itemCount = items.reduce((s, it) => s + it.qty, 0);
  const total = items.reduce((s, it) => s + it.qty * it.product.price, 0);

  return (
    <section className="grid gap-6">
      {/* Filters + Cart */}
      <div className="grid md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          <CategoryFilter categories={categories} value={category} onChange={setCategory} />
          <PriceFilter value={maxPrice} onChange={setMaxPrice} />
        </div>
        <CartSummary
          itemCount={itemCount}
          total={total}
          cart={cart}
          onDecrement={decrement}
          onReset={resetCart}
        />
      </div>

      {/* Status */}
      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && filtered.length === 0}
      />

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <ProductList products={filtered} onAdd={addToCart} />
      )}
    </section>
  );
}
