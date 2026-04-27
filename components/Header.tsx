"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/horses", label: "Horses" },
  { href: "/results", label: "Results" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

function pathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 sm:py-3.5">
        <Link
          href="/"
          className="group flex shrink-0 items-center outline-offset-4 transition-[opacity,transform] duration-200 hover:opacity-[0.92] active:scale-[0.98]"
          aria-label="Flying Dutchmen home"
        >
          <Image
            src="/brand/logo-transparent.png"
            alt=""
            width={48}
            height={48}
            className="mr-4 h-12 w-12 object-contain sm:mr-6"
            priority
          />
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 sm:gap-x-8 md:gap-x-10">
            {navItems.map((item) => {
              const active = pathActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "inline-block border-b-2 pb-1 text-[14px] font-medium tracking-tight transition-colors duration-200",
                      active
                        ? "border-[#113278] font-semibold text-[#113278]"
                        : "border-transparent text-[#3d4e6e] hover:border-[#113278]/35 hover:text-[#113278]"
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="h-[3px] w-full bg-[#113278]" aria-hidden />
    </header>
  );
}
