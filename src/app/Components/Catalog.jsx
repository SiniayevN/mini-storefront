'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  // data + ui state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // filters
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');

  // cart: { [productId]: qty }
  const [cart, setCart] = useState({});

  // fetch products from API route
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // category list for the dropdown (includes "All")
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set).sort()];
  }, [products]);

  // helper: qty currently in cart
  const qtyInCart = (id) => cart[id] ?? 0;

  // cart actions (respect stock limits)
  const addToCart = (product) => {
    setCart((prev) => {
      const current = prev[product.id] ?? 0;
      if (current >= product.stock) return prev; // don’t exceed stock
      return { ...prev, [product.id]: current + 1 };
    });
  };

  const decrement = (productId) => {
    setCart((prev) => {
      const current = prev[productId] ?? 0;
      if (current <= 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: current - 1 };
    });
  };

  const resetCart = () => setCart({});

  // filter products by category and max price
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const byCat = category === 'All' || p.category === category;
      const byPrice = !maxPrice || p.price <= Number(maxPrice);
      return byCat && byPrice;
    });
  }, [products, category, maxPrice]);

  // product map for CartSummary: id -> { name, price }
  const productMap = useMemo(
    () =>
      Object.fromEntries(
        products.map((p) => [p.id, { name: p.name, price: p.price }])
      ),
    [products]
  );

  const isEmpty = !loading && !error && filtered.length === 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      {/* LEFT: filters + product list */}
      <div>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <CategoryFilter
            value={category}
            onChange={setCategory}
            categories={categories}
          />
          <PriceFilter value={maxPrice} onChange={setMaxPrice} />
        </div>

        <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

        <ProductList
          products={filtered.map((p) => ({
            ...p,
            // show remaining stock after items already in cart
            remaining: p.stock - qtyInCart(p.id),
          }))}
          onAdd={addToCart}
        />
      </div>

      {/* RIGHT: cart */}
      <CartSummary
        cart={cart}
        onDecrement={decrement}
        onReset={resetCart}
        productMap={productMap}
      />
    </div>
  );
}
