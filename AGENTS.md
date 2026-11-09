<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Next.js App Router marketplace for discovering and booking creative studios. Single package; no monorepo, tests, or CI.

## Commands

- `npm run dev` — Turbopack dev server. It regenerates the `nextjs-agent-rules` block above; keep that block in the file.
- `npm run lint` — ESLint flat config (`eslint.config.mjs`). Baseline: two `<img>` warnings (`FeaturedStudios.tsx`, `studios/[id]/page.tsx`), no errors.
- `npx tsc --noEmit` — typecheck. There is no `typecheck` script.
- `npm run build` / `npm start`
- No test runner or test script is configured.

## External studio API (not in this repo)

- Studio data comes from a separate backend at `http://localhost:8000`, hardcoded in:
  - `app/components/FeaturedStudios.tsx` — server-side `GET /featured-studios`
  - `app/studios/[id]/page.tsx` — client-side `GET /studios/:id`
  - `app/add-studio/page.tsx` — client-side `POST /add-studios`
- Without that backend running, the home page renders an empty "Featured Studios" section (fetch errors are swallowed) and studio detail pages show "Studio unavailable". There are no local `/api/studios` routes.
- `add-studio` POSTs the raw `form` (numeric fields stay strings) and never sends the computed `studioData` or `amenities`.
- API records use Mongo `_id` strings; the `Studio` shape is defined in `app/studios/[id]/page.tsx`.

## Auth

- better-auth + MongoDB adapter. Server config: `app/lib/auth.ts`; catch-all handler: `app/api/[auth]/[...all]/route.ts` (serves `/api/auth/[...all]`).
- Requires `MONGODB_URI`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in `.env` (`.env*` is gitignored). The database name is hardcoded to `StudioSpace`.
- `app/lib/auth-client.ts` and `app/lib/getTokenFromClient.ts` are empty placeholders; sign-in/sign-up pages are UI-only and not wired to auth.

## Next.js 16 / build config

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Caching is opt-in via `use cache` + `cacheLife`/`cacheTag`. Do not add `dynamic`, `revalidate`, `fetchCache`, `runtime`, `dynamicParams`, or `experimental_ppr` exports — they error or are removed under Cache Components.
- `LayoutProps<"/">` and `PageProps<...>` are generated globals (created by `next dev`, `next build`, or `next typegen`); do not import them.
- Tailwind v4 + daisyUI 5 are loaded with `@import "tailwindcss"; @plugin "daisyui";` in `app/globals.css`. There is no `tailwind.config.*`; CSS is wired through the `@tailwindcss/turbopack` loader rule in `next.config.ts`.
- `next/image` only allows `images.unsplash.com` and `plus.unsplash.com` (see `images.remotePatterns`). Add new hosts there; studio cards intentionally use plain `<img>` for arbitrary API image URLs.

## Layout / conventions

- App Router only, under `app/`. Components live in `app/components/`, helpers in `app/lib/`; alias `@/*` maps to the repo root.
- Route folder naming is inconsistent: `add-studio`, `allstudios` (no hyphen), `sign-in`, `sign-up`, `studios/[id]`.
- `/studios` is linked from the navbar, hero, and category cards, but `app/studios/page.tsx` does not exist; `app/allstudios/page.tsx` is an empty stub.
- Styling uses hardcoded warm-neutral hexes (`#FAF9F6`, `#F8F7F4`, `#302820`, `#98745B`, `#77716B`, `#EAE4DC`) plus daisyUI classes. Match existing colors; no daisyUI theme tokens are defined.
