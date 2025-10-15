# Coffee Blog - AI Coding Agent Instructions

## Project Overview

This is a **server-side rendered Astro coffee blog** with Polish content, using MDX for posts and courses, configured for standalone Node.js deployment.

## Architecture & Key Patterns

### Content Management

- **Content Collections**: Posts and courses in `src/content/` with strict TypeScript schemas
- **Two post types**: `featured/` and `standard/` directories under `posts/`
- **Bilingual ready**: Polish labels but structured for internationalization
- **Asset organization**: Images in `src/assets/images/` and `public/images/posts/`

### Routing & Rendering

- **Hybrid rendering**: Mix of `export const prerender = true` (static) and SSR pages
- **Dynamic articles page**: `/articles` with SSR for sorting/pagination via URL params
- **Static post pages**: `[slug].astro` generates all post routes at build time
- **Content rendering**: Use `post.render()` for MDX content, `getCollection()` for data

### Component Structure

```
components/
├── BlogPost/          # Post cards, pagination, sorting
├── Courses/           # Course-specific components
├── HeroSection/       # Landing page sections
├── TheNavigation/     # Nav with NavLink sub-components
└── TheFooter/         # Footer with column structure
```

### Styling System

- **Global padding utility**: `.global-padding` responsive class (2.5rem → 4rem → 4.5rem/6rem)
- **CSS custom properties**: Primary colors in `:root` (`--primary`, `--primary-light`, etc.)
- **Typography**: Funnel Sans + Source Serif 4 from Google Fonts
- **No CSS framework**: Custom CSS with utility classes

### Data & Navigation

- **Centralized navigation**: `src/data/navigation.ts` with typed links and footer categories
- **Link variants**: `standard`, `featured`, `newsletter` with footer organization
- **Active state logic**: `isLinkActive()` utility for current page detection

## Development Workflows

### Local Development

```bash
npm run dev          # Starts dev server at localhost:4321
npm run build        # Builds to ./dist/ for Node.js standalone
npm run preview      # Preview production build locally
```

### Content Creation

1. Add MDX files to `src/content/posts/featured/` or `src/content/posts/standard/`
2. Follow frontmatter schema in `src/content/config.ts` (title, description, publishDate, author, image, tags, readTime, featured)
3. Images go in `public/images/posts/` and reference as `/images/posts/filename.jpg`
4. Use Polish content with proper date formatting

### Page Creation

- **Static pages**: Add `export const prerender = true` for build-time generation
- **Dynamic pages**: Omit prerender for SSR (default in server mode)
- **Layout props**: All pages use `BasicLayout` with required `title` and `description` props
- **Slots**: Use named slots (`header`, `newsletter`) for layout flexibility

## Critical Conventions

### File Organization

- **Types**: Centralized in `src/types/` (e.g., `basicLayoutTypes.ts`)
- **Assets**: Use `src/assets/` for processed images, `public/` for static assets
- **Layouts**: `BasicLayout.astro` for all pages, `ArticleLayout.astro` for posts

### Content Schema Compliance

- **Required fields**: Every post needs title, description, publishDate, author, image, tags, readTime
- **Date format**: Use `"YYYY-MM-DD"` strings, formatted to Polish locale in components
- **Featured logic**: `featured: true` in frontmatter changes styling and placement

### Component Props Pattern

```typescript
interface Props {
  title: string
  description: string
  // ... other typed props
}

const { title, description } = Astro.props
```

### Navigation Updates

- Add new pages to `src/data/navigation.ts` with appropriate footer categories
- Use `isLinkActive(link.href, pathname)` for active state detection
- Consider mobile navigation when adding new links

## Integration Points

### Astro Integrations

- **@astrojs/mdx**: Handles all post content rendering
- **@astrojs/node**: Standalone server adapter for production deployment
- **Prettier**: Code formatting with astro plugin

### External Dependencies

- **Google Fonts**: Loaded in global.css for typography
- **Astro Image**: Optimized image processing for post thumbnails and content

## Common Patterns

### Content Queries

```typescript
const allPosts = await getCollection('posts')
const featuredPosts = allPosts.filter((post) => post.data.featured)
```

### Dynamic Routing with SSR

```typescript
const sort = Astro.url.searchParams.get('sort') || 'newest'
const page = Astro.url.searchParams.get('page') || '1'
```

### Polish Locale Formatting

```typescript
const formattedDate = new Date(publishDate).toLocaleDateString('pl-PL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
```
