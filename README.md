## Our Universe – April 1 & April 2 Gift Experience

**Tech stack**: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · tsParticles · Node.js + Express · MongoDB (Mongoose)

### 1. Installing dependencies

```bash
cd our-universe
npm install
```

### 2. Running the backend (Express + MongoDB)

1. Make sure MongoDB is running locally or set a connection string:

   ```bash
   # .env.local (root of the project)
   MONGODB_URI="mongodb://127.0.0.1:27017/our-universe"
   ```

2. Start the backend:

   ```bash
   npm run backend
   ```

   This starts the Express server on `http://localhost:4000` with:

  - `GET /api/letters` – returns love notes from MongoDB (seeds a few if empty).

### 3. Running the frontend (Next.js)

1. (Optional) Tell the frontend where the backend lives:

   ```bash
   # .env.local
   NEXT_PUBLIC_API_URL="http://localhost:4000"
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` – scroll through the hero, story timeline, reasons, secret letters, music player, and final surprise.

### 4. Deploying to Vercel

1. Push this project to a Git repository (e.g. GitHub).
2. Go to Vercel, create a new project, and import the repo.
3. Vercel will detect **Next.js 14** automatically. Use:

   - **Root directory**: `our-universe`
   - **Build command**: `next build`
   - **Output directory**: `.next`

4. Set environment variables in Vercel:

   - `NEXT_PUBLIC_API_URL` – URL of your running backend (e.g. `https://your-backend-domain.com`).

> Note: The Express + MongoDB backend is not automatically deployed by Vercel. You can deploy it separately using a service like Render, Railway, Fly.io, or a VPS. Point `NEXT_PUBLIC_API_URL` to that backend URL.

