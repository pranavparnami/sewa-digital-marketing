# SEWA Digital Marketing — Session Memory

## Goal
Build a complete digital marketing website and content strategy for SEWA (charcoal-free luxury incense made from recycled temple flowers, crafted by women artisans, 100% plastic-free packaging).

## Key Brand USPs (Updated)
1. Charcoal-free — made from recycled temple flowers
2. 50% more fragrance diffusion with less smoke
3. Women empowerment — handcrafted by women artisans
4. 100% plastic-free packaging
5. Phthalate-free and toxin-free

## Tech Stack
- Next.js 16 + TypeScript + Tailwind CSS 4
- No external dependencies (pure Next.js)
- Static site (SSG) — no database needed

## What We Built

### Website (`src/app/`)
- **`layout.tsx`** — Root layout with sticky nav (Home, Products, Blog, **Agent**, Instagram) + footer with platform links
- **`page.tsx`** — Homepage: hero section, product categories grid, 6 USP cards, platform badges, CTA
- **`products/page.tsx`** — Products listing grouped by 7 categories with product cards showing benefits, ingredients, and Buy on Amazon + Instagram buttons
- **`blog/page.tsx`** — Blog listing page with category tags, read time, excerpts
- **`blog/[slug]/page.tsx`** — Individual blog post page with markdown-like rendering, tags, share buttons
- **`globals.css`** — Brand theme: warm amber tones on stone/cream backgrounds

### 24/7 AI Agent (`src/lib/agent/` + `src/app/api/agent/` + `src/app/agent/`)
- **`types.ts`** — Shared TypeScript types (ContentItem, CreativeItem, AgentConfig, AgentLogEntry, InstagramPost)
- **`storage.ts`** — JSON file-based storage with CRUD operations for content queue, config, logs, stats
- **`content-generator.ts`** — Generates Instagram posts (10 themed templates), reels (4 scripts), stories (10 ideas), and e-commerce listings for all 5 platforms
- **`creative-generator.ts`** — Gemini-powered creative generation: 8 image/video templates, custom prompt generation, batch generation. Creates marketing visuals with color palettes, moods, dimensions
- **`instagram-poster.ts`** — Posts content to Instagram via Meta Graph API (v22.0), supports posts/reels/carousels/stories
- **`scheduler.ts`** — Cron-based scheduling engine: daily post batch, every-3h reels, daily listings, daily creative generation, every-4h auto-posting
- **`route.ts`** — Agent API endpoints: start/stop, generate posts/reels/listings/creatives, post pending content, update config, view status/queue/creatives/logs
- **`agent/page.tsx`** — Agent dashboard: real-time stats, controls (start/stop/generate/post/creative), content queue with filters, Gemini Creative Studio gallery, Instagram + Gemini setup guides
- **`agent/run.ts`** — Standalone 24/7 runner script (`npm run agent`)

### Data Files (`src/lib/`)
- **`products.ts`** — 8 products across 7 categories with full details (slug, name, description, ingredients, usage, benefits)
- **`blog.ts`** — 6 SEO blog posts:
  1. Benefits of Incense for Meditation (Wellness)
  2. Choosing the Right Diffuser for Your Home (Home & Decor)
  3. Spiritual Significance of Camphor in Pooja (Spirituality)
  4. Ultimate Candle Buying Guide for India (Home & Decor)
  5. How to List Products on Amazon India (Business)
  6. Instagram Content Strategy for Home Fragrance Brands (Marketing)

### Strategy Documents (`src/data/`)
- **`instagram-strategy.json`** — Complete IG strategy: 4 content pillars, 3 reel scripts, hashtag strategy (10-10-10 rule), 7-day posting schedule, best times IST, growth tactics
- **`ecommerce-listings.json`** — Platform-specific guides for Amazon, Blinkit, Zepto, Ajio, Reliance (JioMart) with recommended products, fee structures, listing tips, optimization checklist, and SEWA title template

## Verified
- Build: ✓ `npm run build` passes with zero errors
- All routes respond 200: /, /products, /blog, and all 6 blog posts
- Agent API tested and working: generate-posts, generate-reel, generate-listing, status, queue
- Content renders correctly (verified via curl)
- Agent runner starts correctly via `npm run agent`

## Next Steps
1. **Provide brand details**: product USPs, product images, brand story — I'll customize content
2. **Connect Instagram**: provide Meta API tokens → set `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_ACCOUNT_ID` in `.env` → agent auto-posts
3. **Deploy**: Push to GitHub, deploy on Vercel (free). For 24/7 agent, use a VPS or Railway/Render to run `npm run agent` persistently
4. **Start the agent**: `npm run agent` — generates 3 posts/day, reels every 3h, listings daily, auto-posts to IG every 4h
5. **Review dashboard**: visit `/agent` to see content queue, stats, and controls
6. **Add real product images**: Replace placeholder icons in `/public/products/`
7. **Custom domain**: Point a domain to the Vercel deployment
