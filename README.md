# Neihon Monorepo

This repository houses the Neihon backend (`apps/api`), Expo mobile client (`apps/mobile`), and the new Next.js status dashboard (`apps/web`).

- **Live API**: https://neihon-api.onrender.com  
- **Frontend (apps/web)**: Next.js 14 App Router + TypeScript + Tailwind. Displays live JSON from `/` and `/health`.

## Getting Started

```bash
cd apps/web
cp .env.example .env.local
npm install   # or pnpm install / yarn install
npm run dev
```

Open http://localhost:3000 to view the API status card.

## Deploy

Deploy `apps/web` with Vercel (project root `apps/web`, build command `next build`). Set the environment variable `NEXT_PUBLIC_NEIHON_API_URL=https://neihon-api.onrender.com`.
