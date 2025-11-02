import Catalog from "./Components/Catalog";

export default function Page() {
  return (
    <main className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Mini-Storefront</h1>
        <Catalog />
      </div>
    </main>
  );
}
