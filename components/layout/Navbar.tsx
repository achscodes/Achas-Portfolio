"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-[#f8f7f4]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          Achás
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-black/70 transition-colors hover:text-black"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-black/5 bg-[#f8f7f4] px-6 py-6 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-black/70 transition-colors hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}