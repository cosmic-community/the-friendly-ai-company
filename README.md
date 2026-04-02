# The Friendly AI Company 🌟

![App Preview](https://imgix.cosmicjs.com/d3e702e0-2e8b-11f1-86e7-4be326c2a87b-hal9000.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A warm, joyful digital product store built with Next.js 16 and Cosmic CMS. The Friendly AI Company sells marketing toolkits and templates for small business owners, solopreneurs, and freelancers — all powered by AI.

## Features

- 🏠 **Dynamic Homepage** — Hero section, featured products, trust signals, and about section
- 🛍️ **Product Shop** — Filterable product grid with categories, pricing, and buy buttons
- 📦 **Product Detail Pages** — Rich descriptions, what's included, reviews, and purchase CTAs
- 📝 **Marketing Blog** — Tips and advice to drive organic traffic
- 📄 **About Page** — The AI-powered company story
- 📬 **Contact Page** — Friendly contact form
- ⭐ **Customer Reviews** — Social proof throughout the site
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- 🎨 **Playful Design** — Bright colors, rounded shapes, and joyful tone

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69ce57921e9f11faa9098574&clone_repository=69ce61dd1e9f11faa90986a1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: The Friendly AI Company - a warm, approachable, joyful digital product store selling marketing toolkits and templates for small business owners, solopreneurs, and freelancers. The brand is playful, friendly, and non-threatening — think bright colors, rounded shapes, and a tone that sparks joy.
>
> Pages needed:
> 1. Homepage - hero section with tagline "Marketing made friendly", featured products, trust signals, about section explaining this company is built and run by AI
> 2. Products/Shop page - grid of digital marketing toolkits with pricing, descriptions, and buy buttons
> 3. Individual product pages - detailed product descriptions, what's included, pricing, buy button
> 4. About page - the story of The Friendly AI Company, built by AI to help humans succeed
> 5. Blog - marketing tips and advice (content marketing funnel to drive organic traffic)
> 6. Contact page
>
> Products to feature:
> - The Social Media Starter Kit ($29)
> - Email Marketing Toolkit ($29)
> - Brand Strategy Workbook ($19)
> - The Launch Checklist Bundle ($24)
> - Content Marketing Playbook ($29)
> - The Complete Bundle - all 5 products ($79)
>
> Design: bright, friendly colors (think warm yellows, soft blues, gentle greens), rounded UI elements, playful illustrations, clean typography. Should feel welcoming and joyful, not corporate or intimidating. Mobile-responsive. Modern Next.js site."

### Code Generation Prompt

> "Build a Next.js application for an online business called "The Friendly AI Company". The content is managed in Cosmic CMS with the following object types: product-categories, products, reviews, blog-posts, pages, homepage. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: The Friendly AI Company - a warm, approachable, joyful digital product store selling marketing toolkits and templates for small business owners, solopreneurs, and freelancers. The brand is playful, friendly, and non-threatening — think bright colors, rounded shapes, and a tone that sparks joy.
>
> Pages needed:
> 1. Homepage - hero section with tagline "Marketing made friendly", featured products, trust signals, about section explaining this company is built and run by AI
> 2. Products/Shop page - grid of digital marketing toolkits with pricing, descriptions, and buy buttons
> 3. Individual product pages - detailed product descriptions, what's included, pricing, buy button
> 4. About page - the story of The Friendly AI Company, built by AI to help humans succeed
> 5. Blog - marketing tips and advice (content marketing funnel to drive organic traffic)
> 6. Contact page
>
> Products to feature:
> - The Social Media Starter Kit ($29)
> - Email Marketing Toolkit ($29)
> - Brand Strategy Workbook ($19)
> - The Launch Checklist Bundle ($24)
> - Content Marketing Playbook ($29)
> - The Complete Bundle - all 5 products ($79)
>
> Design: bright, friendly colors (think warm yellows, soft blues, gentle greens), rounded UI elements, playful illustrations, clean typography. Should feel welcoming and joyful, not corporate or intimidating. Mobile-responsive. Modern Next.js site."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS
- [@cosmicjs/sdk](https://www.npmjs.com/package/@cosmicjs/sdk) — Cosmic SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the content model set up

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd friendly-ai-company

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'social-media-starter-kit' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses 6 Cosmic object types:
- **Homepage** — Hero content, featured products, trust signals
- **Products** — Digital toolkits with pricing, descriptions, images
- **Product Categories** — Category organization
- **Reviews** — Customer testimonials and ratings
- **Blog Posts** — Marketing tips and content
- **Pages** — Static pages (About, Contact)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->