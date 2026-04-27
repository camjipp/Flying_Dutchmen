import Image from "next/image";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="logo-globe-stage flex flex-col items-center gap-6">
        <Image
          src="/brand/logo-transparent.png"
          alt="Flying Dutchmen loading logo"
          width={120}
          height={120}
          className="logo-globe-spin h-[120px] w-[120px] object-contain"
          priority
        />
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Loading stable data</p>
      </div>
    </main>
  );
}
