import { addContent, addLog, getConfig } from "./storage";
import type { CreativeItem } from "./types";

function generateId(): string {
  return `creative-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const sEWABrand = `SEWA is a luxury charcoal-free incense brand. Key USPs:
- Charcoal-free, phthalate-free, toxin-free
- 50% more fragrance diffusion with less smoke
- Handcrafted by women artisans
- 100% plastic-free packaging
- Made with premium essential oils and high-quality natural botanicals
- Luxury fragrances: incense sticks, cones, bambooless sticks, candles, diffuser oils, reed diffusers, camphor
- Brand colors: warm amber (#B45309), cream (#FAFAF9), stone (#1C1917), sandstone beige
- Brand aesthetic: minimal, warm, luxurious, Indian heritage with modern sensibility, serene and spa-like
- Target audience: eco-conscious consumers, luxury buyers, wellness/spiritual enthusiasts, socially responsible shoppers`;

const creativeTemplates = [
  {
    title: "Product Hero Shot",
    type: "image" as const,
    platform: "instagram" as const,
    mood: "Serene luxury",
    dimensions: "1080x1080",
    colorPalette: ["#B45309", "#FAFAF9", "#D4A574", "#2D1810"],
    basePrompt: `Create a premium product photograph of SEWA luxury incense products (charcoal-free incense sticks). Warm amber and cream tones. The incense stick is lit with a delicate trail of clean, minimal smoke, placed in an elegant ceramic holder on a marble surface. Natural sunlight from a window creates soft shadows. Fresh flowers (jasmine or rose petals) scattered nearby. 100% plastic-free packaging box visible in the background. The overall mood: luxury wellness, serene, aspirational. Studio lighting, 8K resolution, product photography style. No text overlays.`,
  },
  {
    title: "Women Artisan Hands",
    type: "image" as const,
    platform: "instagram" as const,
    mood: "Empowerment & craft",
    dimensions: "1080x1350",
    colorPalette: ["#B45309", "#FAFAF9", "#8B6914", "#3D2B1F"],
    basePrompt: `Close-up photograph of a woman artisan's hands carefully handcrafting incense sticks. Warm, golden ambient lighting. Focus on the skilled hands, the natural botanical materials, and the bamboo tray with finished incense sticks. The woman is wearing traditional Indian attire in warm earth tones. Background: artisan workshop with soft bokeh. Documentary photography style. Conveys: craftsmanship, empowerment, authenticity. Natural textures visible - botanical materials, wooden tools, clay holders. No text.`,
  },
  {
    title: "Home Sanctuary Scene",
    type: "image" as const,
    platform: "instagram" as const,
    mood: "Calm & cozy",
    dimensions: "1080x1080",
    colorPalette: ["#FAFAF9", "#D4A574", "#B45309", "#8B7355"],
    basePrompt: `Interior scene of a modern Indian home sanctuary. A wooden coffee table holds a lit SEWA soy wax candle in an amber glass jar, alongside an open book, a ceramic mug of chai, and a reed diffuser. Soft morning light streams through linen curtains. A cozy throw blanket on a neutral-toned sofa in the background. The candle has minimal, clean flame. Mood: peaceful, slow living, morning ritual. Warm cream and beige tones dominate. Shot with shallow depth of field. Lifestyle photography, 8K. No text.`,
  },
  {
    title: "Plastic-Free Unboxing",
    type: "image" as const,
    platform: "instagram" as const,
    mood: "Sustainable luxury",
    dimensions: "1080x1350",
    colorPalette: ["#FAFAF9", "#B45309", "#D4A574", "#3D2B1F"],
    basePrompt: `Top-down flat lay photograph of an unboxed SEWA incense product. Beautiful kraft paper packaging (zero plastic) partially opened, revealing incense sticks tied with natural jute string. Beside it: dried lavender sprigs, a ceramic incense holder, and a handwritten thank-you note on recycled paper. The packaging design is elegant and minimal with amber and cream color scheme. Warm, natural lighting from above. Composition: centered with items arranged aesthetically. Product photography style. Conveys: eco-luxury, thoughtful design, sustainability. 8K.`,
  },
  {
    title: "Pooja Ritual Setup",
    type: "image" as const,
    platform: "instagram" as const,
    mood: "Sacred & devotional",
    dimensions: "1080x1080",
    colorPalette: ["#B45309", "#FAFAF9", "#8B6914", "#2D1810"],
    basePrompt: `A traditional Indian pooja setup with modern aesthetic. A brass diya with glowing flame, SEWA pure camphor in a copper holder, and charcoal-free incense sticks burning with minimal, clean smoke in a ceramic holder. Fresh marigold flowers, kumkum, and rice arranged on a brass plate. Warm diya light creates a golden glow. The background is softly lit with subtle bokeh. Marble surface. Spiritual yet modern composition. No plastic visible. Conveys: sacred devotion, purity, tradition with modern sensibility.`,
  },
  {
    title: "Fragrance Experience - Carousel",
    type: "carousel-visual" as const,
    platform: "instagram" as const,
    mood: "Sensory",
    dimensions: "1080x1080",
    colorPalette: ["#B45309", "#FAFAF9", "#D4A574", "#8B7355"],
    basePrompt: `Instagram carousel (6 slides) for SEWA luxury incense fragrance story. Each slide has a different fragrance note visual:
Slide 1 (Title): "SEWA Luxury Fragrances" in elegant typography on cream background with subtle amber gradient
Slide 2 (Sandalwood): Close-up photograph of sandalwood chips and powder on a marble surface, warm tones
Slide 3 (Lavender): Beautiful lavender field or dried lavender close-up, purple against cream background
Slide 4 (Nag Champa): Champaka flowers and aromatic botanicals, earthy rich tones
Slide 5 (Rose): Fresh rose petals scattered, soft pink against amber backdrop
Slide 6 (CTA): "Shop the Collection — Link in Bio" on brand-colored background. Consistent warm, luxurious aesthetic throughout.`,
  },
  {
    title: "50% More Fragrance - Reel Visual",
    type: "video" as const,
    platform: "instagram" as const,
    mood: "Dynamic & educational",
    dimensions: "1080x1920",
    colorPalette: ["#B45309", "#FAFAF9", "#2D1810", "#D4A574"],
    basePrompt: `Vertical video concept (9:16) for Instagram Reel showing the difference between regular charcoal incense and SEWA charcoal-free incense:
- Split screen: Left side shows heavy, dark smoke from regular incense. Right side shows SEWA incense with minimal, clean, light smoke
- Split screen: Left side shows small fragrance wave graphic. Right side shows LARGE fragrance wave graphic with text "50% MORE"
- Text overlays appear sequentially: "Regular Incense" → "SEWA Charcoal-Free" → "Less Smoke" → "50% More Fragrance" → "Toxin-Free & Phthalate-Free" → "Made by Women Artisans"
- Ending frame: SEWA logo and "Burn Luxury. Breathe Responsibility." on warm amber background
- Smooth transitions, modern typography, warm color palette. Duration: 15-20 seconds.`,
  },
  {
    title: "E-Commerce Listing Image",
    type: "image" as const,
    platform: "amazon" as const,
    mood: "Professional product",
    dimensions: "2000x2000",
    colorPalette: ["#FAFAF9", "#B45309", "#D4A574", "#3D2B1F"],
    basePrompt: `Amazon product listing main image for SEWA luxury charcoal-free incense sticks. Pure white background filling 85% of frame. Product centered: box of incense sticks with clear label showing "SEWA - Luxury Incense - Charcoal-Free". Next to the box: a few incense sticks placed diagonally. Clean, professional product photography with even studio lighting. No shadows on the background. Sharp focus throughout. Meets Amazon image requirements. 2000x2000 pixels. No text overlays on the image itself.`,
  },
];

export const sEWABrandBlock = sEWABrand;

export async function generateCreative(): Promise<CreativeItem | null> {
  const config = getConfig();
  const templates = creativeTemplates;
  const template = templates[Math.floor(Math.random() * templates.length)];

  if (config.gemini.isConfigured && config.gemini.apiKey) {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

      const imageModels = [
        "nano-banana-pro-preview",
        "gemini-3.1-flash-image-preview",
        "gemini-3-pro-image-preview",
        "gemini-2.5-flash-image",
      ];

      let resultText = "";
      let imageUrl: string | null = null;

      for (const modelName of imageModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent([
            { text: `${sEWABrand}\n\nCreate a high-quality marketing visual:\n${template.basePrompt}` },
          ]);
          const resp = result.response;

          for (const candidate of resp.candidates || []) {
            for (const part of candidate.content?.parts || []) {
              if (part.text && part.text.trim()) {
                resultText = part.text.trim();
              }
              if (part.inlineData?.data) {
                imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
              }
              if (part.fileData?.fileUri) {
                imageUrl = part.fileData.fileUri;
              }
            }
          }

          if (resultText || imageUrl) break;
        } catch {
          continue;
        }
      }

      const creative: CreativeItem = {
        id: generateId(),
        title: template.title,
        type: template.type,
        prompt: template.basePrompt,
        description: resultText || `Created with nano-banana • ${template.mood}`,
        platform: template.platform,
        status: "generated",
        colorPalette: template.colorPalette,
        mood: template.mood,
        dimensions: template.dimensions,
        generatedUrl: imageUrl,
        createdAt: new Date().toISOString(),
      };

      saveCreative(creative);
      addLog("creative-generated", `Gemini generated: ${template.title}`, "success");
      return creative;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown";
      addLog("creative-error", `Gemini API error: ${message}`, "error");
    }
  }

  const creative: CreativeItem = {
    id: generateId(),
    title: template.title,
    type: template.type,
    prompt: template.basePrompt,
    description: `${template.mood} visual — ready for generation when Gemini API key is configured.`,
    platform: template.platform,
    status: "pending",
    colorPalette: template.colorPalette,
    mood: template.mood,
    dimensions: template.dimensions,
    generatedUrl: null,
    createdAt: new Date().toISOString(),
  };

  saveCreative(creative);
  addLog("creative-queued", `Creative prompt generated: ${template.title}`, "info");
  return creative;
}

export async function generateFromPrompt(customPrompt: string, title: string, type: "image" | "video", platform: "instagram" | "amazon" | "website"): Promise<CreativeItem> {
  const config = getConfig();

  if (config.gemini.isConfigured && config.gemini.apiKey) {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

      const imageModels = [
        "nano-banana-pro-preview",
        "gemini-3.1-flash-image-preview",
        "gemini-3-pro-image-preview",
        "gemini-2.5-flash-image",
      ];

      let resultText = "";
      let imageUrl: string | null = null;

      for (const modelName of imageModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent([
            { text: `${sEWABrand}\n\nCreate a high-quality marketing visual based on this brief:\n${customPrompt}` },
          ]);
          const resp = result.response;

          for (const candidate of resp.candidates || []) {
            for (const part of candidate.content?.parts || []) {
              if (part.text && part.text.trim()) {
                resultText = part.text.trim();
              }
              if (part.inlineData?.data) {
                imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
              }
              if (part.fileData?.fileUri) {
                imageUrl = part.fileData.fileUri;
              }
            }
          }

          if (resultText || imageUrl) break;
        } catch {
          continue;
        }
      }

      const creative: CreativeItem = {
        id: generateId(),
        title,
        type,
        prompt: customPrompt,
        description: resultText || `Created with nano-banana`,
        platform,
        status: "generated",
        colorPalette: ["#B45309", "#FAFAF9", "#D4A574"],
        mood: "Custom",
        dimensions: type === "video" ? "1080x1920" : "1080x1080",
        generatedUrl: imageUrl,
        createdAt: new Date().toISOString(),
      };

      saveCreative(creative);
      addLog("creative-generated", `Custom creative generated: ${title}`, "success");
      return creative;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown";
      addLog("creative-error", `Gemini API error: ${message}`, "error");
    }
  }

  const creative: CreativeItem = {
    id: generateId(),
    title,
    type,
    prompt: customPrompt,
    description: "Ready for generation — Gemini API not configured.",
    platform,
    status: "pending",
    colorPalette: ["#B45309", "#FAFAF9", "#D4A574"],
    mood: "Custom",
    dimensions: type === "video" ? "1080x1920" : "1080x1080",
    generatedUrl: null,
    createdAt: new Date().toISOString(),
  };

  saveCreative(creative);
  return creative;
}

function saveCreative(creative: CreativeItem): void {
  const fs = require("fs");
  const path = require("path");
  const DATA_DIR = path.join(process.cwd(), ".agent-data");
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const filepath = path.join(DATA_DIR, "creatives.json");
  let creatives: CreativeItem[] = [];
  if (fs.existsSync(filepath)) {
    creatives = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  }
  creatives.push(creative);
  fs.writeFileSync(filepath, JSON.stringify(creatives, null, 2));
}

export function getCreatives(): CreativeItem[] {
  const fs = require("fs");
  const path = require("path");
  const filepath = path.join(process.cwd(), ".agent-data", "creatives.json");
  if (!fs.existsSync(filepath)) return [];
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

export function generateCreativeBatch(count = 3): void {
  for (let i = 0; i < count; i++) {
    generateCreative();
  }
}

export { creativeTemplates };
