import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Granite Vault | Immersive Luxury Stone Gallery",
  description: "Experience the sanctuary of natural stone. A scroll-triggered virtual corridor flythrough showcasing book-matched polished granite slabs set in a luxury villa showroom.",
  keywords: ["Granite Slabs", "Cosmic Black", "Patagonia Granite", "Blue Bahia", "Luxury Countertops", "Marble and Stone Showroom"],
  authors: [{ name: "The Granite Vault Design Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#060608] text-[#f3f4f6]">
        {children}
      </body>
    </html>
  );
}

