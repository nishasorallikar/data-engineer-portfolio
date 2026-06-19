# Future Enhancements & TODOs

This file tracks the upcoming features and improvements planned for the data engineering portfolio.

## Phase 2: Interactive MDX Blogs
- [ ] **Upgrade to MDX**: Migrate from `react-markdown` to `@mdx-js/rollup` (Vite integration).
- [ ] **Embed Interactive Components**: Allow the high-end 3D `<TiltCard>`, `<GlassCard>`, and `<ArchitectureDiagram>` components to be rendered directly *inside* the markdown blog posts.
- [ ] **Extract remaining components**: Move the rest of the interactive UI elements from `SQLDataWarehouseProject.jsx` into the `src/components/ui/` folder for universal reuse.

## Phase 3: Dynamic Integrations
- [ ] **Live GitHub Integration**: Implement a GitHub API fetcher to dynamically display real-time commit activity, pull requests merged, and top languages used on the portfolio (perhaps in the Hero or About sections).
- [ ] **Caching**: Implement simple caching (like `localStorage` or React Query) so the GitHub API rate limits are not exceeded during development or high traffic.

## Phase 4: Design Polish
- [ ] **Doodle Consistency**: Extend the hand-drawn SVG arrows and annotations (currently in the Hero and Work sections) across the entire site to unify the "Data with Nisha" branding.
- [ ] **Project Cards Refinement**: Enhance the project cards in `Work.jsx` to feature video hover states or live code snippets.
