# Interview Prep

A static, offline-friendly interview preparation app for **Associate Product Manager, Product Manager and Business Analyst** roles in HR-tech, payroll and SaaS. Built with Next.js (App Router, static export) and Tailwind CSS. No backend: your data lives in your browser.

## Features
- **Question bank** — 220+ questions across 10 categories (product sense, metrics, prioritisation, estimation, execution, behavioural, business analysis, SQL, payroll/HR domain, AI products), each with a model answer outline and tips. Search and filter by category, difficulty and status.
- **STAR story builder** — write your own stories and tag them to question types; see which themes you have not covered.
- **Practice mode** — flashcards with "Got it / Review again" tracking and a review-only deck.
- **Frameworks** — CIRCLES, RICE, MoSCoW, AARRR, HEART, North Star, Jobs-to-be-done, root cause analysis.
- **30-day plan** — daily checklist with progress tracking.
- **Dark / light / system theme**, mobile-first layout.
- **Export / import** your data as JSON (Data page).

## Develop
```bash
npm install
npm run dev
```

## Build & preview
```bash
npm run build      # runs the data sanity check, then a static export to ./out
npx serve out
```
`npm run check:data` fails the build if the question bank drops below 200 questions or any category has fewer than 20.

## Deploy to Vercel
Import the repo in Vercel; the Next.js preset works as is (static export, no environment variables).

## Data model
All user data is stored under the `ip:v1` localStorage key as `{ version, stories, cards, plan, notes }`. Theme preference is stored under `ip:theme`. Use **Data → Export** to back up; importing can merge with or replace current data.

## Editing content
- Questions: `data/questions/*.ts` (one file per category)
- Frameworks: `data/frameworks.ts`
- 30-day plan: `data/plan.ts`
