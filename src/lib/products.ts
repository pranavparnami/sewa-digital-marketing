export interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  ingredients?: string;
  usage?: string;
  benefits: string[];
  image: string;
}

export const brandUSPs = {
  charcoalFree: "Charcoal-free — clean, toxin-free burning with no harmful chemicals",
  luxuryFragrance: "Premium essential oils deliver 50% more fragrance diffusion with less smoke",
  womenMade: "Handcrafted by women artisans, creating employment and fostering independence",
  ecoPackaging: "100% plastic-free packaging — committed to zero-waste sustainability",
  phthalateFree: "100% phthalate-free and toxin-free — safe for you and your family",
  qualityMaterials: "Made with high-quality natural botanicals and premium ingredients",
};

export const products: Product[] = [
  {
    slug: "sandalwood-incense-sticks",
    name: "Sandalwood Incense Sticks",
    category: "Incense Sticks",
    description:
      "Luxury charcoal-free incense sticks infused with pure sandalwood essential oils. Burns clean with 50% more fragrance diffusion and minimal smoke — a warm, woody aroma that transforms any space into a sanctuary. Phthalate-free, toxin-free, and made with high-quality natural botanicals.",
    ingredients:
      "Natural botanical base, pure sandalwood essential oil, aromatic plant extracts, natural binding agents",
    usage: "Light the tip, let it glow, blow out the flame, and place in a holder. Clean burn with minimal ash. Burn time: ~45 minutes per stick.",
    benefits: [
      "Charcoal-free — clean and safe for indoor use",
      "50% more fragrance diffusion for lasting aroma",
      "Low smoke — ideal for health-conscious homes",
      "Handcrafted by women artisans",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/incense-sticks.jpg",
  },
  {
    slug: "rose-incense-cones",
    name: "Rose Incense Cones",
    category: "Cones",
    description:
      "Exquisite charcoal-free incense cones infused with pure rose extracts. Backflow-compatible for a mesmerising waterfall effect. Delivers 50% more floral fragrance with significantly less smoke — luxury you can see and smell.",
    ingredients: "Natural botanical base, natural gum binders, pure rose essential oil, plant extracts",
    usage: "Place on a cone holder, light the tip, blow out gently. Backflow compatible. Clean burn with minimal residue.",
    benefits: [
      "Charcoal-free, zero harmful chemicals",
      "Luxury rose fragrance with enhanced diffusion",
      "Low-smoke backflow experience",
      "Handcrafted by women artisans",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/cones.jpg",
  },
  {
    slug: "lavender-bambooless-sticks",
    name: "Lavender Bambooless Sticks",
    category: "Bambooless Sticks",
    description:
      "Pure botanical incense sticks — no bamboo core, no charcoal, no synthetic binders. Made entirely from high-quality natural botanicals and lavender. Burns clean with 50% more fragrance, almost zero smoke, and zero waste.",
    ingredients: "Natural botanical base, lavender flowers, natural plant-based binders, pure lavender essential oil",
    usage: "Light the end, let it glow, blow out. Produces virtually no ash. Burn time: ~35 minutes.",
    benefits: [
      "No bamboo, no charcoal — pure botanicals only",
      "50% more lavender fragrance diffusion",
      "Near-zero smoke for clean indoor air",
      "Handmade by women artisans",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/bambooless-sticks.jpg",
  },
  {
    slug: "vanilla-soy-candle",
    name: "Vanilla Soy Wax Candle",
    category: "Candles",
    description:
      "Hand-poured luxury soy wax candle infused with pure vanilla. Clean-burning, non-toxic, and long-lasting. Packaged in 100% plastic-free, recyclable glass — because luxury should never cost the earth.",
    ingredients: "100% natural soy wax, pure vanilla essential oil, lead-free cotton wick, recycled glass jar",
    usage: "Trim wick to 5mm before each use. Burn for 2-3 hours at a time. Never leave unattended. Reuse glass jar afterwards.",
    benefits: [
      "Clean burn — no soot, no toxins",
      "40+ hours burn time",
      "100% plastic-free, recyclable packaging",
      "Hand-poured by women artisans",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/candle.jpg",
  },
  {
    slug: "eucalyptus-diffuser-oil",
    name: "Eucalyptus Diffuser Oil",
    category: "Diffuser Oils",
    description:
      "Pure, undiluted eucalyptus essential oil sourced ethically for ultrasonic and reed diffusers. Its crisp, refreshing aroma clears the mind and energises any space. Packaged in plastic-free glass with eco-conscious design.",
    ingredients: "100% pure eucalyptus globulus essential oil (steam-distilled)",
    usage: "Add 5-8 drops to your diffuser with water. Suitable for ultrasonic diffusers, reed diffusers, and oil burners. Keep away from children.",
    benefits: [
      "100% pure, undiluted essential oil",
      "Naturally clears sinuses and refreshes air",
      "Plastic-free glass packaging",
      "Ethically sourced and produced",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/diffuser-oil.jpg",
  },
  {
    slug: "jasmine-reed-diffuser",
    name: "Jasmine Reed Diffuser",
    category: "Reed Diffusers",
    description:
      "A luxury reed diffuser capturing the intoxicating essence of jasmine. Flame-free, continuous fragrance for 6-8 weeks. Housed in elegant, 100% plastic-free packaging — a statement piece for homes that value beauty and responsibility.",
    ingredients: "Premium jasmine fragrance oil, natural rattan reeds, recycled glass bottle",
    usage: "Insert reeds into the bottle. Flip reeds weekly for a fragrance refresh. Lasts 6-8 weeks. Completely flame-free.",
    benefits: [
      "Flame-free 24/7 luxury fragrance",
      "50% more scent diffusion",
      "100% plastic-free, elegant design",
      "Hand-assembled by women artisans",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/reed-diffuser.jpg",
  },
  {
    slug: "pure-kapoor-camphor",
    name: "Pure Kapoor (Camphor)",
    category: "Camphor",
    description:
      "Natural, food-grade kapoor for sacred pooja rituals and aarti. Derived from the camphor laurel tree, it burns bright and clean — a pure flame for pure devotion. Packaged plastic-free in keeping with SEWA's commitment to sustainability.",
    ingredients: "100% natural camphor (Cinnamomum camphora) — no synthetic additives",
    usage: "Place a piece in a camphor holder or diya. Light for aarti or space purification. Can also be placed in wardrobes for natural fragrance and insect protection.",
    benefits: [
      "Pure natural camphor — no synthetics",
      "Clean, residue-free burn",
      "Essential for pooja and aarti rituals",
      "100% plastic-free packaging",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/camphor.jpg",
  },
  {
    slug: "nag-champa-incense-sticks",
    name: "Nag Champa Incense Sticks",
    category: "Incense Sticks",
    description:
      "The iconic Nag Champa reimagined as a charcoal-free luxury experience. Infused with champaka and sandalwood essential oils on a high-quality natural botanical base. Burns with 50% more fragrance, less smoke, and the unmistakable depth of a classic.",
    ingredients: "Natural botanical base, champaka flower extract, sandalwood essential oil, natural plant binders",
    usage: "Light the tip, let it glow, blow out the flame, and place in a holder. Clean burn with minimal ash. Burn time: ~45 minutes per stick.",
    benefits: [
      "Charcoal-free luxury Nag Champa",
      "50% more fragrance diffusion",
      "Low smoke — healthier indoor burning",
      "Crafted by empowered women artisans",
      "100% phthalate-free and toxin-free",
    ],
    image: "/products/incense-sticks.jpg",
  },
];

export const categories = [
  "Incense Sticks",
  "Cones",
  "Bambooless Sticks",
  "Candles",
  "Diffuser Oils",
  "Reed Diffusers",
  "Camphor",
] as const;
