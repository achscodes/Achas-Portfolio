import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achás Studio | Photography & Creative Portfolio",
  description: "Professional digital portfolio and client inquiry platform.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-white text-black antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}