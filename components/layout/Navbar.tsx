import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#f8f7f4]/80 backdrop-blur-md border-b border-black/10">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo Link */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/assets/ChasLogoBlack.png"
            alt="chas.arw logo"
            width={52}
            height={52}
            className="object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-black">
            chas.arw
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] font-medium text-black/70">
          <Link href="/portfolio" className="hover:text-black transition">Gallery</Link>
          <Link href="/contact" className="hover:text-black transition">Contact</Link>
        </nav>

      </div>
    </header>
  );
}