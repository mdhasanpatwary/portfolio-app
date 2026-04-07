# TODO: Project Enhancements

## High Priority (Bugs & Structural Issues)
- [ ] **SEO**: Merge duplicate `FAQPage` scripts in `app/about/page.tsx`.
- [ ] **Accessibility**: Add keyboard support (role, tabIndex, onKeyDown) to `components/global/Card.tsx`.
- [ ] **Semantic HTML**: Change Footer site name from `h2` to `h3` or `p`.

## Medium Priority (UI/UX & Content)
- [ ] **UI/UX**: Un-comment and refine the tech stack display in `components/projects/ProjectCard.tsx`.
- [ ] **SEO**: Implement `BreadcrumbList` JSON-LD schema across all internal pages.
- [ ] **GEO**: Expand `knowsAbout` in `data/metadata.json` with more specific niche keywords.
- [ ] **UI/UX**: Audit and increase mobile padding for `ExperienceCard` and `BlogCard`.

## Low Priority (Refinement)
- [ ] **Persistence**: Migrate AI rate limiting from in-memory `Map` to `Upstash Redis` (if scaling).
- [ ] **Testing**: Initialize `Vitest` and add basic unit tests for utility functions.
- [ ] **AEO**: Refine FAQ component to use more explicit Q&A semantics in the DOM.
