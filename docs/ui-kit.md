# Cursor UI kit (`components/ui`)

Self-contained marketing primitives aligned with cursor.com (`/pricing`, `/download`, `/evals`).

**Portable:** this folder has no `siteConfig` / i18n / content imports. Copy the whole directory into Thailand (or any chapter) and swap imports.

## Files

| File                                   | Role                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `Button.tsx` + `button-styles.ts`      | Pill CTAs: `primary` (dark), `accent` (orange), `secondary` (outline), `ghost` |
| `Badge.tsx` + `badge-styles.ts`        | Status chips (`Coming soon`, live, etc.)                                       |
| `TextLink.tsx` + `text-link-styles.ts` | Accent / muted links with optional `→` caret                                   |
| `card-styles.ts`                       | Flat hairline cards — no colored glow                                          |
| `cn.ts`                                | Tiny class joiner                                                              |
| `index.ts`                             | Barrel export                                                                  |

## Hierarchy

- **primary** — Join us, Featured CTA, Footer join, 404 home (dark filled pill)
- **accent** — Register / live actions only (orange, rationed)
- **secondary** — Browse on X, Load more
- **ghost** — rare text actions

## Thailand port (parallel)

1. Copy `components/ui/` into `cursor-thailand-website/components/ui/`.
2. Replace orange `rounded-md` CTAs in `Navbar`, `Footer`, `UpcomingEvents`, `FeaturedResource`, `SubscribeCTA`, `CommunityTweets` with `<Button …>`.
3. Replace `hover:shadow-[0_0_30px_…]` + radial wash overlays with `cardInteractive` / `cardTile` / `cardFeatured`.
4. Swap “Coming soon” spans for `<Badge>`.
5. Prefer `→` TextLink / caret over Lucide `ArrowRight` on recap links.

Requires the same Tailwind `cursor-*` tokens already shared by both repos (`globals.css` / theme). No new dependencies.
