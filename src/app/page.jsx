import Catalog from "./Components/Catalog";

export default function Page() {
  return (
    <main className="min-h-dvh bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-sky-700">
          Mini-Storefront
        </h1>

        <Catalog />
      </div>
    </main>
  );
}
