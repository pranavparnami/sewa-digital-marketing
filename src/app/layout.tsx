import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEWA | Luxury Incense — Charcoal-Free, Women-Made, Plastic-Free",
  description:
    "SEWA luxury incense: charcoal-free, phthalate-free, toxin-free. 50% more fragrance, less smoke, handcrafted by women artisans with 100% plastic-free packaging.",
  keywords: [
    "SEWA",
    "luxury incense",
    "charcoal-free incense",
    "toxin-free incense",
    "phthalate-free incense",
    "women-made incense",
    "plastic-free packaging",
    "incense sticks",
    "cones",
    "candles",
    "diffuser oils",
    "reed diffusers",
    "camphor",
    "more fragrance less smoke",
    "sustainable fragrance",
    "eco-friendly incense",
    "clean burning incense",
    "Indian luxury brand",
  ],
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/quiz", label: "Find Your Scent" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/blog", label: "Blog" },
  { href: "/agent", label: "Agent" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-2xl font-bold tracking-widest text-amber-800"
            >
              SEWA
            </Link>
            <nav className="flex items-center gap-6 sm:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
              >
                Instagram
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-stone-900 text-stone-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-widest">
                SEWA
              </h3>
              <p className="text-sm leading-relaxed">
                Sacred fragrances for your space. Premium incense, candles,
                diffusers, and more — crafted to elevate every moment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/products" className="hover:text-white transition">
                  Products
                </Link>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
                <a
                  href="https://www.amazon.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Amazon Store
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Find Us On</h4>
              <div className="flex flex-col gap-2 text-sm">
                <span>Amazon</span>
                <span>Blinkit</span>
                <span>Zepto</span>
                <span>Ajio</span>
                <span>Reliance</span>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-stone-700 text-center text-xs text-stone-500">
            &copy; {new Date().getFullYear()} SEWA. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
