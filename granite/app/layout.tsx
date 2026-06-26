import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Granite Vault — Premium Architectural Granite",
  description:
    "Explore luxury granite in a virtual villa walkthrough. Book-matched slabs of Cosmic Black, Alaska White, Titanium Grey, Patagonia and more — sourced directly from quarries in Brazil, India & Norway.",
  keywords: [
    "Granite Slabs",
    "Luxury Granite",
    "Cosmic Black",
    "Alaska White",
    "Patagonia Granite",
    "Blue Bahia",
    "Emerald Pearl",
    "Granite Countertops",
    "Architectural Stone",
    "Interior Design",
  ],
  authors: [{ name: "The Granite Vault" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#faf9f6] text-[#1a1814] antialiased">
        {children}
      </body>
    </html>
  );
}
