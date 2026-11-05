# StudioSpace

**Find and book creative studios by the hour.**

StudioSpace connects creators with production spaces such as photo studios, film stages, podcast rooms, music suites, and workshops.

**Live client:** [https://studiospace-mu-sand.vercel.app](https://studiospace-mu-sand.vercel.app)

## Features

- Browse, search, filter, and sort creative studio listings.
- View studio photos, amenities, host information, ratings, and reviews.
- Book a studio by date and time, and track booking status.
- Create and manage studio listings as a host.
- Save studios to a personal wishlist.
- Use a responsive interface with light and dark themes.

## Tech stack

- **Framework:** Next.js 16 App Router, React 19, and TypeScript.
- **Styling and UI:** Tailwind CSS v4, Base UI, and Lucide icons.
- **Authentication:** Better Auth with email/password and optional Google sign-in.
- **Data and services:** MongoDB for authentication, a separate StudioSpace API for listings and bookings, and optional ImgBB image uploads.
- **Hosting:** Vercel.

## Run locally

1. Install Node.js and npm, then clone this client repository:

   ```bash
   git clone https://github.com/Jannatulakiba/A8_StudioSpace.git
   cd A8_StudioSpace
   npm install
   ```

2. Set up and run the [StudioSpace API](https://github.com/Jannatulakiba/StudioSpace_Server) by following its setup instructions. The client needs the API to load studios and manage bookings.

3. Create a `.env.local` file in the client project root:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=replace-with-a-long-random-secret
   MONGODB_URI=your-mongodb-connection-string

   # Optional: configure these to enable Google sign-in.
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   # Optional: enables direct image uploads; users can also provide an image URL.
   NEXT_PUBLIC_IMGBB_KEY=
   ```

   Configure Google OAuth's local redirect URI as `http://localhost:3000/api/auth/callback/google` if enabling Google sign-in.

4. Start the client:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Examiner demo credentials

Use the following demo accounts to explore the deployed site. Demo account availability may depend on the live service's seeded data.

| Account | Email | Password |
| --- | --- | --- |
| Examiner | `examiner@studiospace.com` | `Examiner123` |
| Studio host | `tanvir@host.com` | `Host12345` |

If a demo account is unavailable, create an account from the registration page.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
