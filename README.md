# MIT Cab Share

A minimal, Airbnb/Uber/Linear-inspired web app that helps MIT Manipal students
share cabs to and from Mangalore Airport and split the fare.

No authentication. No admin panel. Currently backed by local mock data —
built to be wired up to Supabase later with minimal changes.

## Tech Stack

- **Next.js 15** (App Router, `src/` directory)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **shadcn/ui**-style primitives (Radix UI under the hood)
- **Lucide Icons**
- **Framer Motion** for animations
- **React Hook Form** + **Zod** for the "Post a Cab" form
- **Sonner** for toast notifications
- **ESLint** + **Prettier**

## Getting Started

### Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- npm

### Installation

\`\`\`bash
npm install
\`\`\`

### Running in development

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 in your browser.

### Building for production

\`\`\`bash
npm run build
npm run start
\`\`\`

### Linting

\`\`\`bash
npm run lint
\`\`\`

## Folder Structure

\`\`\`
src/
  app/                     # Next.js App Router entry (layout, page, globals.css)
  components/
    ui/                    # shadcn-style primitives (button, input, dialog, select, ...)
    navbar/                # Sticky top navbar
    hero/                  # Hero section with headline + CTAs
    filters/               # Sticky filter bar (route, date, time, seats, sort)
    cards/                 # CabCard, CabGrid, skeletons, listings section
    dialogs/               # PostCabDialog (post a cab form)
    footer/                # Footer
    common/                # HomeClient (page orchestrator), EmptyState
  hooks/                   # useCabListings — state, filtering, sorting
  lib/                     # utils.ts (cn helper), validation.ts (Zod schema)
  utils/                   # format.ts — date/time/fare formatting helpers
  services/                # cabService.ts — data access layer (swap for Supabase)
  types/                   # Shared TypeScript types
  data/                    # mockCabs.ts — ~20 generated mock listings
public/                    # Static assets (favicon, etc.)
\`\`\`

## How It Works

- The homepage (\`src/app/page.tsx\`) renders \`HomeClient\`, a client component
  that owns all UI state via the \`useCabListings\` hook.
- Cab listings start as local mock data (\`src/data/mockCabs.ts\`), simulated
  with a short loading delay so the skeleton UI is visible.
- Filtering and sorting happen entirely client-side in
  \`src/services/cabService.ts\` (\`filterAndSortCabs\`).
- Posting a cab opens a shadcn \`Dialog\` with a React Hook Form + Zod-validated
  form. On submit, the new listing is prepended to state instantly — no
  network round-trip.

## Future Supabase Integration

The app was structured so a real backend can be dropped in with minimal
changes:

1. **Create a Supabase project** and a \`cabs\` table matching the \`CabListing\`
   type in \`src/types/index.ts\`.
2. **Add the Supabase client** (\`@supabase/supabase-js\`) and environment
   variables (\`NEXT_PUBLIC_SUPABASE_URL\`, \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`).
3. **Update \`src/services/cabService.ts\` only:**
   - \`getInitialCabs()\` → \`supabase.from("cabs").select("*")\`
   - \`createCabListing()\` → \`supabase.from("cabs").insert(values)\`
   - Filtering/sorting can move server-side into the Supabase query, or stay
     client-side as-is.
4. **Optionally add real-time updates** with Supabase's
   \`on("postgres_changes")\` subscriptions inside \`useCabListings\` so new
   listings appear for all users live, without a page refresh.

No other component needs to change — \`Navbar\`, \`Hero\`, \`FilterBar\`,
\`CabGrid\`, \`CabCard\`, and \`PostCabDialog\` only depend on the \`CabListing\` /
\`CabFormValues\` types and the callbacks passed to them, not on where the data
comes from.

## Design System

| Token          | Value     |
| -------------- | --------- |
| Background     | \`#FAFAFA\` |
| Card           | \`#FFFFFF\` |
| Primary        | \`#2563EB\` |
| Text           | \`#111827\` |
| Secondary Text | \`#6B7280\` |
| Border         | \`#E5E7EB\` |
| Radius         | \`16px\`    |
| Font           | Inter     |
