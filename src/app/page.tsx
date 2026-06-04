import { categories } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-amber-700 font-medium tracking-wide mb-3 text-sm uppercase">
              Toxin-Free · Charcoal-Free · Women-Made
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight">
              Luxury Fragrance,
              <br />
              <span className="text-amber-700">Cleanly Crafted</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-stone-600 leading-relaxed max-w-xl">
              Charcoal-free luxury incense made with high-quality natural botanicals.
              Crafted by women artisans — 50% more fragrance, less smoke, and 100%
              plastic-free. Phthalate-free, toxin-free, and uncompromisingly premium.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors text-base"
              >
                Explore Products
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-amber-700 text-amber-700 font-medium hover:bg-amber-50 transition-colors text-base"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-amber-100/60 to-transparent" />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              Our Collections
            </h2>
            <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
              Luxury fragrances crafted from nature — designed for the modern,
              conscious home
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products#${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="group p-6 rounded-2xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-700 text-xl">
                    {categoryIcons[category]}
                  </span>
                </div>
                <h3 className="font-semibold text-stone-800 group-hover:text-amber-800 transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              What Makes SEWA Different
            </h2>
            <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
              More than incense — it's luxury that respects you and the planet
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {usps.map((usp) => (
              <div
                key={usp.title}
                className="p-8 rounded-2xl bg-white border border-stone-100 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <span className="text-amber-700 text-lg">{usp.icon}</span>
                </div>
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  {usp.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {usp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Us Everywhere
          </h2>
          <p className="text-amber-100 text-lg max-w-xl mx-auto mb-10">
            SEWA luxury fragrances are available across all major platforms
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {platforms.map((p) => (
              <span
                key={p}
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur text-white border border-white/20 font-medium text-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Burn Luxury. Breathe Responsibility.
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto mb-8">
            Experience the SEWA difference — charcoal-free, toxin-free, and
            crafted by women who care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 rounded-full bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors"
            >
              Explore Products
            </Link>
            <a
              href="https://www.amazon.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full border border-stone-300 text-stone-700 font-medium hover:border-amber-700 hover:text-amber-700 transition-colors"
            >
              Shop on Amazon
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const categoryIcons: Record<string, string> = {
  "Incense Sticks": "🪔",
  Cones: "🔺",
  "Bambooless Sticks": "🌿",
  Candles: "🕯️",
  "Diffuser Oils": "💧",
  "Reed Diffusers": "🏺",
  Camphor: "✨",
};

const usps = [
  {
    icon: "🌸",
    title: "Charcoal-Free & Clean",
    description:
      "No charcoal, no synthetic binders — just pure, safe burning. High-quality natural botanicals for the cleanest incense experience.",
  },
  {
    icon: "✨",
    title: "50% More Fragrance",
    description:
      "Curated with premium essential oils for enhanced fragrance diffusion. Less smoke, more aroma — the luxury difference you can feel.",
  },
  {
    icon: "👩‍🎨",
    title: "Women Empowerment",
    description:
      "Every SEWA product is handcrafted by women artisans, creating meaningful employment and fostering financial independence.",
  },
  {
    icon: "🌍",
    title: "100% Plastic-Free",
    description:
      "Our packaging contains zero plastic. From the box to the wrapping — designed for sustainability without compromising elegance.",
  },
  {
    icon: "🛡️",
    title: "Phthalate-Free & Toxin-Free",
    description:
      "No phthalates, no harmful chemicals, no toxins. Safe for your family, your pets, and your indoor air quality.",
  },
  {
    icon: "🇮🇳",
    title: "Premium Indian Craftsmanship",
    description:
      "Luxury fragrances rooted in India's rich aromatic heritage. Premium materials, modern innovation, uncompromising quality.",
  },
];

const platforms = [
  "Amazon",
  "Blinkit",
  "Ajio",
  "Zepto",
  "Reliance Retail",
  "Flipkart",
  "Meesho",
];
