# Agents Guide - dittrich.pro

**IMPORTANT**: Update this file when project conventions change.

## Project Overview

Personal portfolio website built with Astro 7, TypeScript, and Tailwind CSS. Features blog, project showcase, tech stack carousel, and view transitions.

## Tech Stack

- **Framework**: Astro 7 (static build)
- **Styling**: Tailwind CSS v4
- **Icons**: astro-icon (lucide, lineicons, cib)
- **Content**: Astro content collections (Content Layer API with `glob()` loaders)
- **Language**: TypeScript
- **Linting**: ESLint + Prettier

## Development Commands

```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
npm run lint         # Run ESLint on src
npm run lint -- --fix # Auto-fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without modifying
```

## Code Style Guidelines

### TypeScript

- Use strict TypeScript (extends `astro/tsconfigs/strict`)
- Avoid `any` - ESLint warns but doesn't error
- Use TypeScript interfaces for component props:

```astro
---
interface Props {
  title?: string;
  noindex?: boolean;
}
const { title = 'default', noindex = false } = Astro.props;
---
```

### Imports

- Use absolute imports (configured in tsconfig)
- Icons: `import { Icon } from 'astro-icon/components'`
- Content collections: `import { getCollection, render } from 'astro:content'`
- Zod schemas: `import { z } from 'astro/zod'` (the `astro:content` re-export is deprecated)

### Naming Conventions

- **Components**: PascalCase (e.g., `BlogCard.astro`)
- **Variables/functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE for config objects
- **CSS classes**: kebab-case

### File Structure

```
src/
├── components/   # Reusable Astro components
├── layouts/      # Page layouts
├── pages/        # File-based routing
├── content/       # MDX content collections
├── data/         # Static data (projects, etc.)
├── styles/       # Global CSS
└── utils/         # Utility functions
```

### Astro Components

- Props interface in frontmatter at top
- Destructure `A.props` with defaults
- Use `<script>` tags for client-side JS
- **Important**: Wrap all client-side JS in `astro:page-load` event:

```javascript
document.addEventListener('astro:page-load', () => {
  // Your client-side code here
});
```

### Tailwind CSS

- Use theme colors: `--color-neon-cyan`, `--color-neon-violet`, `--color-dark-*`
- Avoid hardcoded colors (except tech stack carousel items)
- Section spacing: `py-16`
- Content width: `max-w-7xl mx-auto px-4`

### View Transitions

- Use `<ClientRouter />` from `astro:transitions` (NOT deprecated `<ViewTransitions />`)
- Enable morphing with `style="view-transition-name: unique-name"`

### Button Component

Use the reusable `Button.astro` component:

```astro
<Button
  href="/blog"
  variant="primary"
  size="lg"
  icon="lucide:arrow-right"
  iconPosition="right"
>
  View all posts
</Button>
```

- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg' (determines roundedness)

### Content Collections (Blog)

Collections use the **Content Layer API** (Astro v5+). The schema/loader config lives in
`src/content.config.ts` (NOT the removed `src/content/config.ts`), and each collection defines a
`glob()` loader pointing at its content directory.

Post frontmatter:

```yaml
---
title: 'Post Title'
description: 'Post description'
date: 2026-01-15
thumbnail: '../../images/blog/slug/image.png' # relative path, resolved by the image() schema helper
readTime: 5
---
```

Rendering and identifiers:

- Render an entry with the standalone `render()` function, not the removed `entry.render()` method:
  `const { Content, headings } = await render(post);`
- An entry's slug is `entry.id` (derived from the filename by the `glob()` loader). `entry.slug` was
  removed — use `entry.id` for routes (`params: { slug: post.id }`), links, and view-transition names.

> **Parser gotcha**: Do NOT put inline TypeScript generic annotations inside `.astro` template
> expressions, e.g. `{posts.map((post: CollectionEntry<'blog'>) => ...)}`. `astro-eslint-parser`
> misreads the `<'blog'>` as a `<>` fragment and fails to parse. Rely on inference instead
> (`{posts.map((post) => ...)}`); annotate in the frontmatter script where needed.

## Formatting (Prettier)

- Semicolons: yes
- Quotes: single
- Tab width: 2
- Trailing commas: es5

## Linting (ESLint)

- Extends: JS recommended, TypeScript recommended, Astro recommended
- `no-unused-vars`: warn
- `no-explicit-any`: warn

## Common Patterns

### Mobile Menu

- Use inline SVG burger icon (not astro-icon)
- Store state in `data-open` attribute
- Use CSS classes for visibility (opacity/translate, NOT `hidden`)

### Email Links

- Base64-encode email addresses
- Build `mailto:` link in `astro:page-load` event

### Pagination Routes

- Pages are at `/blog/1`, `/blog/2` (NOT `/blog/page/1`)

## Testing Changes

1. `npm run build` - Verify no build errors
2. `npm run lint` - Check linting
3. `npm run format:check` - Verify formatting
4. `npm run preview` - Test locally
5. Check view transitions, scroll animations, 404 page
