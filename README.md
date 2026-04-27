# Flying Dutchmen Racing Platform

Modern Next.js site scaffold for a premium thoroughbred racing operation.

## Run

```bash
npm install
npm run dev
```

## Pages

- `/` Home
- `/horses` Horse roster
- `/horses/[slug]` Horse detail page
- `/results` Results and upcoming runners
- `/news` News and updates
- `/about` About
- `/contact` Contact

## Backend-ready structure

`lib/data.ts` currently contains local data. Swap these arrays for API/CMS calls:

- `horses`
- `results`
- `upcomingRunners`
- `news`

This maps directly to Supabase or CMS collections/tables and keeps UI components unchanged.
