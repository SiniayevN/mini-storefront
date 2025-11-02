'use client';

export default function ProductCard({ product }) {
  const outOfStock = product.stock <= 0;

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 text-xl font-bold">${product.price}</p>
        <p
          className={`mt-1 text-sm ${
            outOfStock ? 'text-red-600' : 'text-emerald-600'
          }`}
        >
          {outOfStock ? 'Out of stock' : `In stock: ${product.stock}`}
        </p>
      </div>
    </div>
  );
}
