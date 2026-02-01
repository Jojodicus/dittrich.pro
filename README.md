# dittrich.pro

Personal portfolio website built with Astro 5.

## Tech Stack

- **Framework**: Astro (static build)
- **Styling**: Tailwind CSS
- **Icons**: astro-icon (lucide, lineicons, cib)
- **Content**: Astro content collections (blog, imprint)
- **Integrations**: @astrojs/sitemap, mermaid, mdx

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build production site to `dist/` |
| `npm run preview` | Preview build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## Project Structure

```
src/
├── components/      # Reusable Astro components
├── layouts/         # Base layouts
├── pages/           # File-based routing
│   ├── index.astro  # Home page
│   ├── blog/        # Blog pages
│   └── imprint.astro
├── content/         # Content collections
├── data/            # Static data (projects, etc.)
└── styles/          # Global styles
```

## Development

```bash
npm run dev
```

## Deployment

Build output is in `dist/`. Deploy to any static host (Netlify, Vercel, etc.).

## License

Code structure is MIT. All content (blog posts, text) is copyrighted to the respective authors. Third-party logos and images retain their respective ownership.
