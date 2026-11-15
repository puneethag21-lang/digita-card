import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#FFC107]/10 border border-[#FFC107]/30 flex items-center justify-center text-[#FFC107] font-bold text-2xl mb-4">
        404
      </div>
      <h1 className="text-xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-400 text-sm max-w-xs mb-6">
        The page or resource you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-[#FFC107] text-black font-semibold text-sm hover:bg-[#FFD54F] transition-colors"
      >
        Back to Digital Card
      </Link>
    </div>
  );
}
