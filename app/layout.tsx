import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achás Portfolio | Photography & Studio",
  description: "A curated collection of photographs exploring people, events, sports, streets, and moments worth remembering.",
  openGraph: {
    title: "Achás Portfolio | Photography",
    description: "Moments, captured with intention. Explore the photography portfolio of chas.snaps.",
    url: "https://yourdomain.com",
    siteName: "Achás Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achás Portfolio | Photography",
    description: "Moments, captured with intention.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-[#f8f7f4] text-black antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}