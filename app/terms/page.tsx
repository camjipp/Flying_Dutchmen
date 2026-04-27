import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Terms of use</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Formal terms for this site are being finalized. For questions or document requests, contact the stable office.
      </p>
      <Link href="/contact" className="mt-8 inline-block text-sm font-semibold text-[#113278] transition hover:text-[#1a448f]">
        Contact →
      </Link>
    </main>
  );
}
