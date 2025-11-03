'use client';

export default function CartSummary({
  cart = {},
  onDecrement,
  onReset,
  // backward-compatible: accept either productMap or priceMap
  productMap = {},
  priceMap = {},
}) {
  const entries = Object.entries(cart); // [ [id, qty], ... ]

  const total = entries.reduce((sum, [id, qty]) => {
    const price = productMap[id]?.price ?? priceMap[id] ?? 0;
    return sum + price * qty;
  }, 0);

  const itemCount = entries.reduce((sum, [, qty]) => sum + qty, 0);

  return (
    <aside className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Cart</h2>
      <p className="text-sm text-gray-600 mb-2">Items: {itemCount}</p>
      <p className="text-sm text-gray-600 mb-4">Total: ${total.toFixed(2)}</p>

      {entries.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {entries.map(([id, qty]) => {
            const name = productMap[id]?.name ?? id;
            const price = productMap[id]?.price ?? priceMap[id] ?? 0;
            return (
              <li key={id} className="flex items-center justify-between text-sm">
                <div className="truncate">
                  <span className="font-medium">{name}</span>
                  <span className="text-gray-500"> — ${price} × {qty}</span>
                </div>
                <button
                  onClick={() => onDecrement(id)}
                  className="rounded-md border px-2 py-1 text-xs"
                >
                  −1
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Your cart is empty.</p>
      )}

      <button
        onClick={onReset}
        className="w-full rounded-md border px-3 py-2 text-sm"
      >
        Reset cart
      </button>
    </aside>
  );
}
