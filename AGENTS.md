## Commands

- `npm run dev` / `build` / `start` / `lint` — the only scripts. No test or typecheck script exists; typecheck via `npx tsc --noEmit` (or it runs as part of `next build`). Do not invent `npm test`.
- Turbopack (`@tailwindcss/turbopack`) is used for dev/build CSS.

## Stack quirks

- Next.js is pinned to `16.4.3` with React `19.3.0` — treat both as exact; minor-version assumptions from older Next knowledge are often wrong here.
- **`cacheComponents: true` changes how everything renders** (also `partialPrefetching: true`):
  - `new Date()` anywhere — **including inside `"use client"` components** — is an "unstable value" and fails `next build` prerendering. Defer time-dependent reads to refs/effects.
  - `usePathname()` / `useSearchParams()` in Client Components **outside `<Suspense>`** fail the build (`CLIENT_HOOK_DYNAMIC`). The Navbar is wrapped in `<Suspense fallback={<NavbarFallback />}>` in `src/app/layout.tsx` for this reason — keep it that way when editing the layout.
  - `params`/`searchParams` are Promises (`await` in server components; `use(props.params)` in client components). `searchParams` values can be `string | string[]` when routes are typed via the global `PageProps<'…'>` helper.
  - Strict react-hooks ESLint errors on `setState` directly inside `useEffect` — use `useSyncExternalStore` (see `authStore` in `src/lib/auth.ts`), refs, or derive values at event time.
- **Tailwind v4 CSS-first**: there is no `tailwind.config.*`; all theme tokens live in `src/app/globals.css` under `@theme` / CSS variables. Add new colors/fonts there, not in a config file.
- **shadcn/ui** registry setup: style `base-nova` (Base UI primitives, not Radix). Components live in `src/components/ui`; add new ones with `npx shadcn@latest add <component>` rather than hand-rolling.
  - Base UI uses the **`render` prop instead of Radix's `asChild`** — `<Button asChild>` compiles but is wrong. For link-buttons, put `cn(buttonVariants({ … }))` on the `<Link>` directly (see Navbar).
- Remote images are user-provided, so use plain `<img>`, not `next/image` (which requires pre-registering hosts in `next.config.ts`).
- `cn` comes from the `cn` package (re-exported in `src/lib/utils.ts`), not clsx/tailwind-merge — import `{ cn } from "@/lib/utils"` in components.

## Project layout

- App Router only (`src/app/`); classic Pages Router patterns from training data do not apply.
- Path alias `@/*` → `src/*`.
- Backend base URL comes from `NEXT_PUBLIC_API_URL` in `.env` (client-accessible var).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
