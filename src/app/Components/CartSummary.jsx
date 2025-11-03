'use client';

export default function CartSummary({ itemCount, total, cart, onDecrement, onReset }) {
  const entries = Object.values(cart); // [{ product, qty }, ...]

  return (
    <aside className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Cart</h2>
      <p className="text-sm text-gray-600 mb-2">Items: {itemCount}</p>
      <p className="text-sm text-gray-600 mb-4">Total: ${total.toFixed(2)}</p>

      {entries.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {entries.map(({ product, qty }) => (
            <li key={product.id} className="flex items-center justify-between text-sm">
              <span>{product.name} × {qty}</span>
              <button
                onClick={() => onDecrement(product.id)}
                className="rounded-md border px-2 py-1 hover:bg-gray-50"
                title="Remove one"
              >
                −
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 mb-4">Your cart is empty.</p>
      )}

      <button
        onClick={onReset}
        disabled={entries.length === 0}
        className={`w-full rounded-lg px-3 py-2 text-sm font-medium border
          ${entries.length === 0
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-sky-600 text-white hover:bg-sky-700 border-sky-600'}`}
      >
        Reset cart
      </button>
    </aside>
  );
}
