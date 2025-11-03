export default function ProductCard({ product, onAdd }) {
  const outOfStock = (product.remaining ?? product.stock) <= 0;

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-700">{product.category}</p>
        <p className="mt-2 text-xl font-semibold text-gray-900">${product.price}</p>

        <p
          className={`mt-1 text-base ${
            outOfStock ? 'text-rose-600' : 'text-emerald-600'
          }`}
        >
          {outOfStock
            ? 'Out of stock'
            : `In stock: ${product.remaining ?? product.stock}`}
        </p>
      </div>

      <button
        onClick={onAdd}
        disabled={outOfStock}
        className={`mt-4 inline-flex justify-center rounded-lg px-4 py-2 text-sm font-medium border ${
          outOfStock
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600'
        }`}
      >
        Add to cart
      </button>
    </div>
  );
}
