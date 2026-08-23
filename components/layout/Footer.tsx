import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f8f7f4] py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-black/60">
        
        <div className="flex items-center gap-4">
          <Image
            src="/assets/ChasLogoBlack.png"
            alt="chas.arw logo"
            width={44}
            height={44}
            className="object-contain opacity-90"
          />
          <p className="uppercase tracking-[0.2em] font-medium text-black">
            chas.arw © {new Date().getFullYear()} Studio Portfolio.
          </p>
        </div>

        {/* <div className="flex items-center gap-6 uppercase tracking-[0.2em]">
          <Link href="/admin" className="hover:text-black transition">Admin Portal</Link>
        </div> */}

      </div>
    </footer>
  );
}