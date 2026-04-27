"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { oswald } from "@/components/fixture/fixtureStripShared";

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

function HeaderLogo({ forDarkMenu, onClick }: { forDarkMenu?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex shrink-0 items-center outline-offset-4 transition-[opacity,transform] duration-200 hover:opacity-[0.92] active:scale-[0.98]"
      aria-label="Flying Dutchmen home"
    >
      <Image
        src="/brand/logo-transparent.png"
        alt=""
        width={48}
        height={48}
        className={[
          "h-12 w-12 object-contain",
          forDarkMenu ? "brightness-0 invert" : "mr-4 sm:mr-6"
        ].join(" ")}
        priority
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="relative z-40 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 sm:py-3.5">
        <HeaderLogo />
        <nav className="hidden md:block" aria-label="Primary">
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
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#113278]/25 text-2xl leading-none text-[#113278] transition hover:border-[#113278]/45 hover:bg-[#113278]/[0.06] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-overlay"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
      <div className="h-[3px] w-full bg-[#113278]" aria-hidden />

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              id="mobile-nav-overlay"
              className="fixed inset-0 z-[100] flex flex-col bg-[#050A19] p-6 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <HeaderLogo forDarkMenu onClick={() => setOpen(false)} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 text-2xl leading-none text-white/90 transition hover:border-white/30 hover:bg-white/10"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <nav
                className={`${oswald.className} mt-12 flex flex-col gap-6 sm:mt-16 sm:gap-8`}
                aria-label="Primary mobile"
              >
                {navItems.map((item) => {
                  const active = pathActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={[
                        "text-2xl font-semibold uppercase tracking-tight transition-colors sm:text-3xl",
                        active ? "text-white" : "text-white/65 hover:text-white"
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>,
            document.body
          )
        : null}
    </header>
  );
}
