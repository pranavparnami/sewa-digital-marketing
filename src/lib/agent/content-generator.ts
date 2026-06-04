import { addContent, getConfig, addLog } from "./storage";
import type { ContentType, Platform } from "./types";
import { getNextBigEvent, getUpcomingEvents } from "./marketing-intelligence";

const postTemplates = [
  {
    theme: "Charcoal-Free & Clean",
    captions: [
      "Most incense is made with charcoal. Ours isn't. SEWA: charcoal-free, toxin-free, phthalate-free. Breathe easy. 🛡️",
      "No charcoal. No phthalates. No toxins. Just pure, clean luxury fragrance. That's the SEWA promise. 🌿",
      "Say goodbye to charcoal-heavy incense. Switch to SEWA — clean-burning, safe for your home, and 50% more fragrance. ✨",
    ],
    hashtags: ["#CharcoalFree", "#CleanBurn", "#ToxinFree", "#PhthalateFree", "#BreatheEasy"],
  },
  {
    theme: "50% More Fragrance, Less Smoke",
    captions: [
      "Why settle for faint fragrance? SEWA delivers 50% more scent diffusion with significantly less smoke. Luxury you can actually smell. ✨",
      "More aroma. Less smoke. That's not a trade-off — that's premium craftsmanship. Discover the SEWA difference. 🌬️",
      "Premium essential oils + high-quality botanicals = 50% more fragrance. Your home deserves this upgrade. 🏠",
    ],
    hashtags: ["#MoreFragrance", "#LessSmoke", "#LuxuryIncense", "#PremiumAroma", "#SEWAdifference"],
  },
  {
    theme: "Toxin-Free & Safe",
    captions: [
      "What's NOT in SEWA incense: charcoal, phthalates, toxins, synthetic chemicals. What IS: pure luxury fragrance. 🌸",
      "Your home should be your safest space. SEWA: toxin-free, phthalate-free, and uncompromisingly clean. 🌿",
      "Clean air matters. That's why every SEWA product is toxin-free and phthalate-free. Breathe with confidence. 🛡️",
    ],
    hashtags: ["#ToxinFree", "#PhthalateFree", "#CleanHome", "#SafeFragrance", "#HealthyLiving"],
  },
  {
    theme: "Women Empowerment",
    captions: [
      "Behind every SEWA incense stick is a woman artisan building her independence. Fragrance crafted with skill, sold with pride. 👩‍🎨",
      "When you light a SEWA incense, you're not just creating ambience — you're supporting women artisans. That's real luxury. 💪",
      "Handcrafted by women. Every stick. Every cone. Every candle. Your purchase empowers. 🙌",
    ],
    hashtags: ["#WomenEmpowerment", "#WomenArtisans", "#Handcrafted", "#MadeByWomen", "#SocialImpact"],
  },
  {
    theme: "Plastic-Free Packaging",
    captions: [
      "Luxury shouldn't come wrapped in plastic. SEWA packaging is 100% plastic-free — beautiful inside and out. 🌍",
      "From the box to the wrapper: zero plastic. Because luxury that harms the planet isn't luxury at all. ♻️",
      "Open a SEWA box. Notice what's missing: plastic. Notice what's there: pure, conscious luxury. 📦",
    ],
    hashtags: ["#PlasticFree", "#SustainableLuxury", "#EcoFriendly", "#ZeroWaste", "#ConsciousLiving"],
  },
  {
    theme: "Product Spotlight",
    captions: [
      "Our Sandalwood Incense — charcoal-free, phthalate-free, toxin-free. 50% more fragrance. 100% plastic-free. This is luxury redefined. 🪔",
      "Nag Champa like you've never experienced: charcoal-free, crafted by women artisans, packaged plastic-free. The classic, elevated. 🔥",
      "Soy wax candles. Pure essential oils. Plastic-free packaging. Hand-poured by women artisans. Meet your new obsession. 🕯️",
    ],
    hashtags: ["#SEWAproducts", "#LuxuryIncense", "#CharcoalFree", "#Handcrafted", "#SustainableLuxury"],
  },
  {
    theme: "Premium Quality",
    captions: [
      "High-quality natural botanicals. Premium essential oils. No shortcuts. That's how SEWA incense is made. 🌿",
      "We didn't just remove what's bad — charcoal, toxins, phthalates. We replaced it with what's exceptional: pure botanicals, richer fragrance. ✨",
      "Luxury isn't just how it smells. It's how it's made. SEWA: crafted with premium materials and uncompromising standards. 💫",
    ],
    hashtags: ["#PremiumQuality", "#NaturalIngredients", "#LuxuryCrafted", "#HighQuality", "#SEWAstandards"],
  },
  {
    theme: "Sustainable Luxury",
    captions: [
      "Charcoal-free ✅ Phthalate-free ✅ Toxin-free ✅ 50% more fragrance ✅ Women-made ✅ Plastic-free ✅ This is what real luxury looks like. 💫",
      "SEWA is redefining luxury fragrance: clean ingredients, premium botanicals, sustainable packaging, and women at the helm. 🌍",
      "Burn luxury. Breathe responsibility. That's the SEWA way. 🕉️",
    ],
    hashtags: ["#SustainableLuxury", "#SEWAdifference", "#CleanFragrance", "#ConsciousLuxury", "#BurnLuxuryBreatheResponsibility"],
  },
  {
    theme: "Home Sanctuary",
    captions: [
      "Your home is your sanctuary. Make it toxin-free. Make it beautiful. Make it SEWA. 🏠",
      "Transform your space without compromising your health. Clean-burning, toxin-free fragrance for conscious homes. ✨",
      "A beautiful home deserves beautiful, safe fragrance. No chemicals. No compromise. Just SEWA. 🌿",
    ],
    hashtags: ["#HomeSanctuary", "#CleanHome", "#ToxinFreeHome", "#SafeFragrance", "#ConsciousHome"],
  },
  {
    theme: "Customer Love",
    captions: [
      "Your reviews make our day! Tag us in your SEWA moments — we'd love to feature your sanctuary. 💛",
      "Thank you for choosing clean, conscious luxury. Every purchase empowers women and supports sustainable living. 🙏",
      "5 stars. Happy homes. Empowered women. Cleaner planet. Thank you, SEWA family! ⭐",
    ],
    hashtags: ["#CustomerLove", "#SEWAfamily", "#ConsciousConsumer", "#HappyCustomer", "#ThankYou"],
  },
];

const reelScripts = [
  {
    title: "The Clean Burn",
    captions: [
      "Watch the difference: charcoal incense (smoke + toxins) vs SEWA (clean, less smoke, 50% more fragrance). Choose wisely. 🛡️",
      "Your lungs deserve better. Switch to charcoal-free, phthalate-free, toxin-free SEWA. 🌬️",
    ],
  },
  {
    title: "Women Behind SEWA",
    captions: [
      "Meet the women who craft your incense. Every stick tells a story of skill, independence, and pride. 💪",
      "When you buy SEWA, you're not just buying incense. You're buying a woman's independence. 👩‍🎨",
    ],
  },
  {
    title: "Plastic-Free Unboxing",
    captions: [
      "Unbox the SEWA experience. Notice what's there: pure luxury fragrance. Notice what's not: plastic. 📦",
      "ASMR unboxing: paper wrap, box opening, incense reveal. Zero plastic. Maximum satisfaction. 🌍",
    ],
  },
  {
    title: "More Fragrance, Less Smoke",
    captions: [
      "Split screen: regular incense (faint smell, heavy smoke) vs SEWA (rich aroma, barely any smoke). The upgrade is real. ✨",
      "50% more fragrance. Significantly less smoke. That's the premium SEWA difference in 15 seconds. 🔥",
    ],
  },
];

const storyIdeas = [
  "Quick poll: What matters most to you? A) Toxin-free B) Charcoal-free C) Women-made D) All of the above",
  "Behind the scenes: Watch how our women artisans craft luxury incense 🎥",
  "Swipe up! New blog post: 'Why Charcoal-Free & Toxin-Free Incense Matters' 🔗",
  "Flash deal: 20% off our bestseller on Amazon — next 24 hours! ⚡",
  "Customer of the week: @[tag] thank you for choosing conscious luxury 💛",
  "Did you know? Regular incense can contain charcoal, phthalates, and synthetic toxins. SEWA has none of that. 🌿",
  "Question box: Ask us anything about charcoal-free incense, our premium ingredients, or women artisans! 💬",
  "This or That: Regular incense vs SEWA charcoal-free? Vote now! 🗳️",
  "Countdown to Diwali! Pre-order your toxin-free, plastic-free SEWA gift boxes 🪔",
  "Meet our team: The women artisans crafting your favourite fragrances 👩‍🎨",
];

export function generateInstagramContent(): void {
  const template = postTemplates[Math.floor(Math.random() * postTemplates.length)];
  const caption = template.captions[Math.floor(Math.random() * template.captions.length)];
  const subsetHashtags = template.hashtags.slice(0, Math.min(5, template.hashtags.length));

  addContent({
    platform: "instagram",
    type: "post",
    title: template.theme,
    caption,
    hashtags: subsetHashtags,
    mediaText: [
      `📸 ${template.theme} Image: Beautiful flat-lay photography featuring SEWA products with warm, ambient lighting. Size: 1080x1080px. Style: Minimal aesthetic with amber/cream tones.`,
    ],
    status: "pending",
    scheduledAt: null,
    postedAt: null,
    postUrl: null,
    error: null,
  });
}

export function generateInstagramReel(): void {
  const script = reelScripts[Math.floor(Math.random() * reelScripts.length)];
  const caption = script.captions[Math.floor(Math.random() * script.captions.length)];

  addContent({
    platform: "instagram",
    type: "reel",
    title: script.title,
    caption,
    hashtags: ["#Reels", "#SEWAaromas", "#IncenseReel", "#TrendingReel", "#ExplorePage"],
    mediaText: [
      `🎬 ${script.title} Reel: 15-20 seconds. Vertical 9:16 format. Warm lighting, soft transitions. Music: trending calm instrumental or original ASMR audio.`,
    ],
    status: "pending",
    scheduledAt: null,
    postedAt: null,
    postUrl: null,
    error: null,
  });
}

export function generateInstagramStories(count = 2): void {
  const shuffled = [...storyIdeas].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    addContent({
      platform: "instagram",
      type: "story",
      title: `Story ${i + 1}`,
      caption: shuffled[i],
      hashtags: [],
      mediaText: [
        `📱 Story Frame: 1080x1920px, 15 seconds. Text overlay on brand-colored background with subtle animation. Include interactive sticker (poll/quiz/link).`,
      ],
      status: "pending",
      scheduledAt: null,
      postedAt: null,
      postUrl: null,
      error: null,
    });
  }
}

export function generateEcommerceListing(platform: Exclude<Platform, "instagram">): void {
  const products = [
    { name: "Sandalwood Incense Sticks", category: "Incense", size: "100 Sticks" },
    { name: "Rose Incense Cones", category: "Incense", size: "50 Cones" },
    { name: "Lavender Bambooless Sticks", category: "Incense", size: "50 Sticks" },
    { name: "Vanilla Soy Wax Candle", category: "Candles", size: "200g Jar" },
    { name: "Eucalyptus Diffuser Oil", category: "Essential Oils", size: "30ml" },
    { name: "Jasmine Reed Diffuser", category: "Reed Diffusers", size: "100ml" },
    { name: "Pure Kapoor Camphor", category: "Pooja", size: "250g" },
    { name: "Nag Champa Incense Sticks", category: "Incense", size: "100 Sticks" },
  ];

  const product = products[Math.floor(Math.random() * products.length)];

  const titles: Record<string, string> = {
    amazon: `SEWA ${product.name} — Charcoal-Free Luxury Fragrance | Recycled Temple Flowers | ${product.size} | 50% More Fragrance, Less Smoke`,
    blinkit: `SEWA ${product.name} — Charcoal-Free ${product.category} ${product.size} | 10 Min Delivery | Plastic-Free Pack`,
    zepto: `SEWA ${product.name} ${product.size} — Clean Luxury ${product.category} | Charcoal-Free | Fast Delivery`,
    ajio: `SEWA ${product.name} — Conscious Luxury ${product.category} ${product.size} | Charcoal-Free & Plastic-Free`,
    jiomart: `SEWA ${product.name} — Charcoal-Free ${product.category} ${product.size} | Temple Flowers | Best Value`,
  };

  addContent({
    platform,
    type: "listing",
    title: titles[platform] || titles.amazon,
    caption: JSON.stringify({
      title: titles[platform] || titles.amazon,
      bulletPoints: [
        `Charcoal-free — clean, safe burning with no harmful chemicals or synthetic additives`,
        `50% more fragrance diffusion with premium essential oils and significantly less smoke`,
        `100% phthalate-free and toxin-free — safe for your family and indoor air quality`,
        `Handcrafted by women artisans — every purchase supports empowerment`,
        `100% plastic-free sustainable packaging — luxury without the waste`,
      ],
      description: `Discover SEWA: luxury fragrance reimagined. Our ${product.name} is crafted from high-quality natural botanicals — completely charcoal-free, phthalate-free, and toxin-free — and infused with premium essential oils for 50% more fragrance diffusion with less smoke. Every product is handcrafted by women artisans and packaged in 100% plastic-free materials. Made for the conscious home that refuses to compromise on quality. ${product.size} — ideal for daily rituals, meditation, and gifting.`,
    }),
    hashtags: [],
    mediaText: [
      `🖼️ Main Image: White background, ${product.name} centered, filling 85% of frame. High resolution.`,
      `🖼️ Lifestyle Image: ${product.name} in a serene home setting with warm lighting.`,
      `🖼️ Packaging Shot: Close-up of the SEWA packaging showing product details.`,
      `🖼️ Feature Graphic: Key benefits displayed with elegant typography.`,
    ],
    status: "pending",
    scheduledAt: null,
    postedAt: null,
    postUrl: null,
    error: null,
  });
}

export function generateDailyBatch(): void {
  const config = getConfig();
  if (!config.schedule.enabled) return;

  const nextBig = getNextBigEvent();
  const upcoming = getUpcomingEvents(14);

  if (nextBig && upcoming.length > 0) {
    const daysAway = Math.ceil(
      (new Date(nextBig.date).getTime() - Date.now()) / 86400000
    );

    if (daysAway <= 14) {
      const ideas = nextBig.contentIdeas || [];
      if (ideas.length > 0) {
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        addContent({
          platform: "instagram",
          type: "post",
          title: `${nextBig.name} Special`,
          caption: `${randomIdea}\n\n${nextBig.name} is coming — are you ready? ✨\n\n#SEWA #${nextBig.name.replace(/\s+/g, "")} #CleanLuxury`,
          hashtags: nextBig.hashtags || ["#SEWA", "#FestivalPrep"],
          mediaText: [
            `📸 Event-themed post for ${nextBig.name}. SEWA products styled with ${nextBig.name.toLowerCase()} elements. Size: 1080x1080px. Festive yet premium aesthetic.`,
          ],
          status: "pending",
          scheduledAt: null,
          postedAt: null,
          postUrl: null,
          error: null,
        });
        addLog("event-content", `Generated ${nextBig.name} themed content (${daysAway} days out)`, "success");
      }
    }
  }

  for (let i = 0; i < config.schedule.postsPerDay; i++) {
    generateInstagramContent();
  }
  generateInstagramReel();
  generateInstagramStories(2);
}
