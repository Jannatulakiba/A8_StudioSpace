# 🎬 StudioSpace

**Peer-to-peer creative workspace & production studio sharing platform.**

StudioSpace connects creators — filmmakers, photographers, podcasters, musicians and artists — with real production spaces owned by real hosts. Cyc walls, sound stages, podcast lounges, music suites and art workshops, all bookable by the hour with transparent pricing.

> 🔗 **Live Site:** <!-- TODO: paste your deployed client URL here after `vercel --prod`, e.g. https://studiospace.vercel.app --> **[LIVE URL HERE]**
> 🔗 **Server Repo:** [A8_StudioSpace server] <!-- TODO: paste your server repo link -->
> 🔗 **Client Repo:** https://github.com/Jannatulakiba/A8_StudioSpace

---

## ✨ Features

- **🔍 Explore & filter studios** — searchable, category-filtered, price-sorted grid of all listed workspaces with branded skeleton loading and friendly empty states.
- **🏛️ Rich studio detail pages** — image carousel, amenity chips, host profile, reviews and an hourly booking modal with live cost preview.
- **📅 Smart booking system** — date + hour-range reservation with instant overlap detection against confirmed bookings, so a slot can never be double-booked.
- **🛠️ Full listing CRUD** — hosts list new studios (with imgbb image upload), update, and delete with confirmation modals; every listing is ownership-protected.
- **📊 Personal dashboards** — My Listings and My Bookings views with live status badges (Pending → Confirmed → Completed / Cancelled) and one-click cancellation for pending slots.
- **🔐 JWT-secured API** — BetterAuth (Google + email/password) issues JWTs; every mutating endpoint validates them and enforces owner-level authorization.
- **🌙 Dark / light theme toggle** — full system-wide theming via CSS custom properties.
- **🍞 Modern UX polish** — Sonner toasts on every action, custom 404, Swiper hero, marquee category links, and scroll-reveal animations.

---

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling & UI | Tailwind CSS v4 (CSS-first theme), custom components, Swiper.js, Lucide icons |
| Fonts | Bricolage Grotesque (display) · DM Sans (body) |
| State & notifications | React hooks (`useSyncExternalStore`), Sonner toasts |
| Auth | BetterAuth (JWT, session cookie caching, MongoDB adapter) + Google OAuth |
| Backend API | Express 5 (Node.js), JWT verification via `jose` (JWKS) |
| Database | MongoDB (Atlas) — `studios`, `bookings`, `users` collections |
| Media | imgbb image upload API |
| Hosting | Vercel (client + server) · MongoDB Atlas |

---

## 🧑‍💻 Getting Started (Local Setup)

### Prerequisites

- Node.js 18+ and npm
- A MongoDB Atlas cluster (free M0 tier is fine)
- Google OAuth credentials (Client ID & Secret) if you want social login
- An imgbb API key for image uploads

### 1. Clone & install

```bash
git clone https://github.com/Jannatulakiba/A8_StudioSpace.git
cd A8_StudioSpace

# backend
npm install          # Express API (see server repo folder)

# frontend (this repo / client folder)
npm install
```

### 2. Configure environment variables

**Client** — create `.env` in the root of this repo:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000   # Express API base URL
BETTER_AUTH_URL=http://localhost:3000       # this client's URL (auth callback + JWKS issuer)
BETTER_AUTH_SECRET=super-secret-key
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_IMGBB_KEY=your-imgbb-api-key
```

> ⚠️ For Google OAuth to work locally, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in your Google Cloud Console credentials.

### 3. Run both servers

```bash
# Terminal 1 — Express API (server repo)
npm start            # → http://localhost:5000

# Terminal 2 — Next.js client (this repo)
npm run dev          # → http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Seed demo data (optional)

```bash
node seed.js         # inserts 8 demo studios into MongoDB (one-time upsert)
```

---

## 🔑 Examiner Test Credentials

| Role | Email | Password |
| --- | --- | --- |
| 🧪 Examiner (regular user) | `examiner@studiospace.com` | **Examiner123** |
| 🛠️ Studio host | `tanvir@host.com` | **Host12345** |

> Register a fresh account if the seeded passwords above have changed — registration takes one screen: name, email, photo URL (optional), password (uppercase + lowercase + min 6 chars).

**Quick test flow:**
1. Log in with the examiner account → Explore `/studios` → open a studio → **Book Workspace Now** → pick a date/hours → confirm it appears under `/my-bookings` with a 🔶 **Pending** badge.
2. Log in as the host → **My Studio Listings** → try **Edit** and **Delete** (with confirmation modal).
3. Hit `/random-404-url` to see the custom aperture 404 page.
4. Toggle 🌙/☀️ in the navbar — the whole system switches theme.

---

## 📂 Project Structure

```
studiospace-client/
├── src/
│   ├── app/                  # App Router pages (/, /studios, /add-studio, /my-bookings, ...)
│   ├── components/
│   │   ├── auth/             # LoginForm, RegisterForm, AuthShell
│   │   ├── booking/          # BookingModal, MyBookings, StatusBadge
│   │   ├── home/             # HeroSlider, FeaturedStudios, Categories, HowItWorks, ...
│   │   ├── layout/           # Navbar (sticky + dropdown), Footer, Logo, UserSync
│   │   ├── studios/          # StudioGrid, StudioCard, StudioDetails, StudioForm, MyListings
│   │   └── ui/               # Modal, Skeletons, SectionHead, EmptyState, ...
│   └── lib/                  # auth, api client, server actions, hooks, constants, types
└── public/studios/           # demo studio imagery
```

---

## 📋 Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js in dev mode (Turbopack) |
| `npm run build` | Production build (type-checking included) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint check |

---

## 📄 License & credits

Built for an academic assignment (Term A8). All demo data and imagery belong to the StudioSpace project team. © 2026 StudioSpace.
