import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-extrabold text-violet-500 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Página no encontrada</h1>
        <p className="text-slate-500 mb-8">La página que buscas no existe o ha sido movida.</p>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-xl bg-violet-500 px-6 text-sm font-semibold text-white hover:bg-violet-600 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
