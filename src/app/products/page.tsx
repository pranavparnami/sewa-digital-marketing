import { products, categories } from "@/lib/products";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Our Products
        </h1>
        <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
          Explore our complete range of sacred fragrances — from traditional
          incense to modern diffusers
        </p>
      </div>

      {categories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category
        );
        return (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-amber-600 rounded-full inline-block" />
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <div
                  key={product.slug}
                  className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-lg hover:border-amber-200 transition-all"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-amber-100/30 to-stone-100 rounded-xl mb-5 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={getProductImage(product.category)}
                      alt={product.name}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity relative z-10">
                      {categoryIcons[product.category]}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.benefits.slice(0, 2).map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-800"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                  {product.ingredients && (
                    <p className="text-xs text-stone-400 mb-4">
                      Ingredients: {product.ingredients}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <a
                      href="https://www.amazon.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
                    >
                      Buy on Amazon
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-medium hover:border-amber-300 hover:text-amber-700 transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
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

function getProductImage(category: string): string {
  const map: Record<string, string> = {
    "Incense Sticks": "/products/incense-sticks.jpg",
    Cones: "/products/cones.jpg",
    "Bambooless Sticks": "/products/bambooless-sticks.jpg",
    Candles: "/products/candle.jpg",
    "Diffuser Oils": "/products/diffuser-oil.jpg",
    "Reed Diffusers": "/products/reed-diffuser.jpg",
    Camphor: "/products/camphor.jpg",
  };
  return map[category] || "/products/incense-sticks.jpg";
}
