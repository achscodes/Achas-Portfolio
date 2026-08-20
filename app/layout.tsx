import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achás Portfolio",
  description:
    "A curated photography portfolio showcasing selected work, projects, and visual stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}