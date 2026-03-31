## Solution Process & Architecture Guide

This document explains how the "Our Universe" project is built, how the major parts work together (Next.js frontend + Express/MongoDB backend), and what changes were made to resolve the issues encountered during setup.

## 1. What the project is

The app is a romantic single-page experience built with **Next.js 14 (App Router)** and **TypeScript**. The UI is split into several sections (hero, story timeline, reasons, secret letters, and a final surprise), with interactive animations powered by **Framer Motion**.  

“Secret Letters” is an interactive memory section driven by a static frontend data array (no API calls).  

Visual effects include:

- Animated particle background using **tsParticles** (via `react-tsparticles`)
- Confetti on the final "forever" action using `canvas-confetti`
- Full-page smooth scrolling and Tailwind-based styling

## 2. Tech Stack

- Frontend: `next` (v14.2.4), `react`, `react-dom`, `typescript`
- UI motion: `framer-motion`
- Styling: `tailwindcss` + `app/globals.css` (Tailwind directives and custom utilities)
- Particles: `react-tsparticles` + `tsparticles`
- Backend: `express`, `mongoose`, `cors` (kept in the repo, but the current frontend “Secret Letters” no longer depends on it)

## 3. Frontend Architecture (Next.js App Router)

### 3.1 Routing and composition

Next.js uses the App Router, so the app entry is under `app/`:

- `app/layout.tsx`
  - Defines the global HTML/body structure.
  - Loads fonts (`Inter`, `Playfair_Display`) from `next/font/google`.
  - Applies global class names for the page theme.
- `app/page.tsx`
  - Composes the page by rendering section components in order:
    - `NavBar`
    - `HeroSection`
    - `StoryTimeline`
    - `WhyILoveYou`
    - `SecretLetters`
    - `FinalSurprise`
    - `MusicPlayer`

### 3.2 Client vs server components

Interactive UI pieces are implemented as **client components** (they include `"use client";`).

Examples:

- `app/components/RomanticParticles.tsx` (particles animation)
- `app/components/NavBar.tsx` (Framer Motion animation)
- `app/components/MusicPlayer.tsx` (audio play/pause)
- `app/sections/*` like `SecretLetters.tsx` (interactive UI + modals)

### 3.3 Section-by-section responsibilities

- `app/components/NavBar.tsx`
  - Fixed top navigation with animated entrance.
  - Uses anchor links like `#hero`, `#story`, `#why`, `#letters`, `#music`, `#forever`.

- `app/sections/HeroSection.tsx`
  - Intro hero content.
  - Provides an "Our together" picture slot in the right card.

- `app/components/RomanticParticles.tsx`
  - Uses `react-tsparticles` with `loadFull(engine)` to load the full tsParticles engine.
  - Runs as a fixed, `pointer-events-none` background layer.
  - Rendered globally from `app/layout.tsx` so it stays visible across the entire site.

- `app/sections/StoryTimeline.tsx`
  - Timeline layout with alternating left/right cards.
  - Uses Framer Motion `whileInView` animations to reveal each card.

- `app/sections/WhyILoveYou.tsx`
  - Displays "reason" dots positioned absolutely inside a framed area.
  - Clicking a dot opens a modal with details (Framer Motion + `AnimatePresence`).

- `app/sections/SecretLetters.tsx`
  - Renders a static `MEMORIES` array.
  - Implements an input-based unlock clue (answer required: `april2`).
  - Cards are locked initially (blur + lock badge). On correct unlock, clicking a card opens a modal and reveals the memory text.

- `app/sections/FinalSurprise.tsx`
  - Opens a "forever" modal and triggers confetti via `canvas-confetti`.

- `app/components/MusicPlayer.tsx`
  - Uses a hidden `Audio` instance and toggles play/pause on click.
  - Handles autoplay restrictions by starting muted and only unmuting after user interaction.
  - Shows a one-time music disclaimer modal with a low-volume option (useful for classes/meetings).

## 4. Backend Architecture (Express + MongoDB)

### 4.1 Server entrypoint

The backend starts from:

- `backend/server.ts`

Responsibilities:

- Create an Express app
- Enable:
  - `cors()` for cross-origin requests
  - `express.json()` for JSON parsing
- Configure environment variables:
  - `MONGODB_URI` (defaults to `mongodb://127.0.0.1:27017/our-universe`)
  - `PORT` (defaults to `4000`)
- Register routes:
  - `GET /api/letters` via `backend/routes/letters.ts`
- Connect to MongoDB and only start listening after successful `mongoose.connect`.

### 4.2 Letters route and seeding

- `backend/routes/letters.ts`
  - Implements `GET /api/letters`
  - Fetches all letters sorted by `createdAt` descending.
  - If the collection is empty, it seeds 3 default love letters and returns them.

- `backend/models/LoveLetter.ts`
  - Defines the `LoveLetter` schema:
    - `title` (required, trimmed)
    - `body` (required)
  - Uses Mongoose timestamps so `createdAt` is available.

## 5. End-to-End Runtime Flow (How it works)

### 5.1 Initial page load

1. User opens the Next.js app.
2. Next.js renders `app/page.tsx`, including all section components.
3. Client components run in the browser:
   - `RomanticParticles` starts the tsParticles animation immediately (full engine loaded via `loadFull`).
  - Other interactive sections render modals/buttons (no API calls in the current Secret Letters experience).

### 5.2 “Secret Letters” lock/unlock + modal

1. `SecretLetters` renders a static `MEMORIES` array on the client.
2. The user sees a clue question and an input field.
3. All memory cards start in a locked state (blur + lock badge).
4. If the user submits the correct clue answer (`april2`), cards unlock and clicking a card opens a modal that reveals the full memory text.

## 6. Fixes Applied During Setup (What changed and why)

### 6.1 Removed invalid Next.js config option

While starting the dev server, Next.js warned that:

- `experimental.appDir` was unrecognized in `next.config.mjs`

Because this project already uses the **App Router** via the `app/` directory, that experimental flag is unnecessary.

Change made:

- Updated `next.config.mjs` to remove the invalid `experimental.appDir` option.

### 6.2 Installed missing particles dependency

During compilation, the app failed with:

- `Module not found: Can't resolve 'tsparticles'`

`app/components/RomanticParticles.tsx` imports:

- `loadFull` from `tsparticles`
- types from `tsparticles-engine`

So the `tsparticles` package must exist in `dependencies`.

Change made:

- Installed `tsparticles`:
  - `npm install tsparticles@^2.12.0`

### 6.3 Moved particles to global layout

- Updated `app/layout.tsx` to render `RomanticParticles` globally so it is visible across the full page.
- Ensured the particles layer uses a fixed background setup (`pointer-events-none` and low z-index) while content stays on top.

## 7. Build & Run Guide (matching the repo README)

1. Install dependencies:
   - `npm install`
2. Start the backend:
   - Ensure MongoDB is running
   - Optionally create `.env.local` with `MONGODB_URI` and/or `PORT`
   - Run: `npm run backend`
3. Start the frontend:
   - Optionally create `.env.local` with `NEXT_PUBLIC_API_URL` pointing to the backend (e.g. `http://localhost:4000`)
   - Run: `npm run dev`

## 8. Where to look in the code

- Frontend composition: `app/page.tsx`
- Global layout/fonts: `app/layout.tsx`
- Particles integration: `app/components/RomanticParticles.tsx`
- Backend entry: `backend/server.ts`
- Letters API: `backend/routes/letters.ts`
- Mongo model: `backend/models/LoveLetter.ts`

