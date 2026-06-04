import { categories } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* HERO — tighter copy, social proof, email capture */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                ⚡ Available on Blinkit & Zepto — 10-min delivery
              </span>
            </div>
            <p className="text-amber-700 font-medium tracking-wide mb-3 text-sm uppercase">
              Toxin-Free · Charcoal-Free · Women-Made
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight">
              Fragrance That
              <br />
              <span className="text-amber-700">Doesn&apos;t Hide Toxins</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-stone-600 leading-relaxed max-w-xl">
              50% more fragrance. 100% less charcoal, phthalates, and plastic.
              Handcrafted by women artisans — for the home that refuses to
              compromise.
            </p>

            {/* Social proof line */}
            <div className="mt-6 flex items-center gap-4 text-sm text-stone-500">
              <span className="flex items-center gap-1">
                <span className="text-amber-500">★★★★★</span> 4.9
              </span>
              <span className="w-px h-4 bg-stone-300" />
              <span>Trusted by 2,000+ conscious homes</span>
              <span className="w-px h-4 bg-stone-300" />
              <span>🇮🇳 Made in India</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-amber-700 text-white font-semibold hover:bg-amber-800 transition-colors text-base shadow-lg shadow-amber-700/20"
              >
                Shop Clean Fragrance
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-amber-700 text-amber-700 font-semibold hover:bg-amber-50 transition-colors text-base"
              >
                Find Your Scent →
              </Link>
            </div>

            {/* Email capture */}
            <div className="mt-8 p-4 bg-white/80 backdrop-blur rounded-2xl border border-amber-200 max-w-md">
              <p className="text-sm font-semibold text-stone-900 mb-2">
                Get ₹100 off your first order
              </p>
              <form className="flex gap-2" action="#">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-full border border-stone-200 text-sm focus:outline-none focus:border-amber-400 bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-amber-700 text-white text-sm font-semibold hover:bg-amber-800 transition-colors whitespace-nowrap"
                >
                  Get ₹100 Off
                </button>
              </form>
              <p className="text-xs text-stone-400 mt-1.5">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-amber-100/60 to-transparent" />
        </div>
      </section>

      {/* TRUST BAR — certifications + press mentions */}
      <section className="py-8 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-xs sm:text-sm text-stone-500">
                <span className="text-amber-700 font-bold">{badge.icon}</span>
                <span className="font-medium text-stone-600">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES — upgraded with descriptions and visual cards */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              Explore Our Collections
            </h2>
            <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
              Every product charcoal-free, toxin-free, and handcrafted by women
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryCards.map((card) => (
              <Link
                key={card.name}
                href={`/products#${card.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative overflow-hidden rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all"
              >
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-100/50 to-stone-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  {categoryImages[card.name] ? (
                    <Image
                      src={categoryImages[card.name]}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <span className="text-5xl absolute inset-0 flex items-center justify-center">
                      {categoryIcons[card.name]}
                    </span>
                  )}
                </div>
                <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform">
                  {categoryIcons[card.name]}
                </span>
              </div>
                <div className="p-4">
                  <h3 className="font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {card.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* USPs — unchanged, already solid */}
      <section className="py-16 sm:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              What Makes SEWA Different
            </h2>
            <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
              More than incense — it&apos;s luxury that respects you and the planet
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {usps.map((usp) => (
              <div
                key={usp.title}
                className="p-8 rounded-2xl bg-white border border-stone-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
                  <span className="text-amber-700 text-xl">{usp.icon}</span>
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

      {/* SOCIAL PROOF — reviews / testimonials */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Loved by Conscious Homes
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto mb-10">
            What our customers say about switching to clean fragrance
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-100 text-left"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">{review.name}</p>
                  <p className="text-xs text-stone-400">{review.bought}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS — unchanged, solid */}
      <section className="py-16 sm:py-24 bg-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Us Everywhere
          </h2>
          <p className="text-amber-100 text-lg max-w-xl mx-auto mb-10">
            Available on all major platforms — from 10-minute delivery to
            scheduled gifting
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

      {/* FINAL CTA — improved */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium mb-4 inline-block">
            Ready to switch?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Burn Luxury. Breathe Responsibility.
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto mb-8">
            Your first step toward a toxin-free home. Charcoal-free,
            women-made, 100% plastic-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-amber-700 text-white font-semibold hover:bg-amber-800 transition-colors shadow-lg shadow-amber-700/20"
            >
              Explore Products
            </Link>
            <Link
              href="/subscribe"
              className="px-8 py-3.5 rounded-full border-2 border-stone-300 text-stone-700 font-semibold hover:border-amber-700 hover:text-amber-700 transition-colors"
            >
              Subscribe & Save 20%
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Extracted data

const categoryIcons: Record<string, string> = {
  "Incense Sticks": "🪔", Cones: "🔺", "Bambooless Sticks": "🌿",
  Candles: "🕯️", "Diffuser Oils": "💧", "Reed Diffusers": "🏺", Camphor: "✨",
};

const categoryImages: Record<string, string> = {
  "Incense Sticks": "/products/incense-sticks.jpg",
  Cones: "/products/cones.jpg",
  "Bambooless Sticks": "/products/bambooless-sticks.jpg",
  Candles: "/products/candle.jpg",
  "Diffuser Oils": "/products/diffuser-oil.jpg",
  "Reed Diffusers": "/products/reed-diffuser.jpg",
  Camphor: "/products/camphor.jpg",
};

const categoryCards = [
  { name: "Incense Sticks", desc: "Classic charcoal-free sticks. 45-min burn. Sandalwood, Nag Champa & more." },
  { name: "Cones", desc: "Backflow-compatible. Mesmerising waterfall effect. Rose, Lavender & more." },
  { name: "Bambooless Sticks", desc: "Zero bamboo, zero charcoal, zero waste. Pure botanicals only." },
  { name: "Candles", desc: "100% soy wax. 40+ hours burn. Vanilla, Rose & seasonal blends." },
  { name: "Diffuser Oils", desc: "100% pure essential oils. Eucalyptus, Lavender & more." },
  { name: "Reed Diffusers", desc: "Flame-free 24/7 fragrance. 6-8 weeks. Elegant home decor." },
  { name: "Camphor", desc: "Pure food-grade kapoor for pooja & aarti. Plastic-free pack." },
];

const trustBadges = [
  { icon: "🛡️", label: "Charcoal-Free" },
  { icon: "✅", label: "Phthalate-Free" },
  { icon: "🌿", label: "Toxin-Free" },
  { icon: "♻️", label: "100% Plastic-Free" },
  { icon: "👩‍🎨", label: "Women-Made" },
  { icon: "🇮🇳", label: "Made in India" },
];

const reviews = [
  {
    name: "Priya S.",
    bought: "Bought Sandalwood Incense Sticks",
    text: "Finally — incense that doesn't make me cough. The fragrance is so much richer and cleaner than anything I've used before. My meditation space has never felt this good.",
  },
  {
    name: "Rahul M.",
    bought: "Bought Vanilla Soy Candle",
    text: "Ordered at 9 PM on Blinkit, arrived in 8 minutes. The candle burns clean, the vanilla is subtle not artificial, and the glass jar is now my pen holder. Genius.",
  },
  {
    name: "Ananya K.",
    bought: "Bought Jasmine Reed Diffuser",
    text: "Gifted this to my mother for her pooja room. She called me crying — not just about the fragrance, but about the women who made it. This brand has soul.",
  },
];

const usps = [
  { icon: "🌸", title: "Charcoal-Free & Clean", description: "No charcoal, no synthetic binders — just pure, safe burning. High-quality natural botanicals for the cleanest incense experience." },
  { icon: "✨", title: "50% More Fragrance", description: "Curated with premium essential oils for enhanced fragrance diffusion. Less smoke, more aroma — the luxury difference you can feel." },
  { icon: "👩‍🎨", title: "Women Empowerment", description: "Every SEWA product is handcrafted by women artisans, creating meaningful employment and fostering financial independence." },
  { icon: "🌍", title: "100% Plastic-Free", description: "Our packaging contains zero plastic. From the box to the wrapping — designed for sustainability without compromising elegance." },
  { icon: "🛡️", title: "Phthalate-Free & Toxin-Free", description: "No phthalates, no harmful chemicals, no toxins. Safe for your family, your pets, and your indoor air quality." },
  { icon: "🇮🇳", title: "Premium Indian Craftsmanship", description: "Luxury fragrances rooted in India's rich aromatic heritage. Premium materials, modern innovation, uncompromising quality." },
];

const platforms = ["Amazon", "Blinkit", "Ajio", "Zepto", "Reliance Retail", "Flipkart", "Meesho"];
