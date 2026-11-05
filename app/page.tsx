'use client';
import Link from 'next/link';
import { QUESTIONS } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import { PLAN, PLAN_TOTAL, taskKey } from '@/data/plan';
import { useData } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  const { cards, plan, stories } = useData();
  const got = QUESTIONS.filter((q) => cards[q.id]?.status === 'got').length;
  const review = QUESTIONS.filter((q) => cards[q.id]?.status === 'review').length;
  const planDone = Object.values(plan).filter(Boolean).length;
  const nextDay = PLAN.flatMap((w) => w.days).find((d) => d.tasks.some((_, i) => !plan[taskKey(d.day, i)]));

  return (
    <div>
      <h1 className="h1">Interview prep for PM &amp; BA roles</h1>
      <p className="mt-1 text-muted">APM · PM · Business Analyst — HR-tech, payroll &amp; SaaS.</p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="card"><ProgressBar value={got} max={QUESTIONS.length} label="Questions mastered" /></div>
        <div className="card"><ProgressBar value={planDone} max={PLAN_TOTAL} label="30-day plan" /></div>
        <div className="card text-sm"><span className="text-2xl font-semibold">{stories.length}</span> STAR stories written<br /><span className="text-muted">{review} {review === 1 ? "card" : "cards"} waiting for review</span></div>
      </div>

      {nextDay && (
        <section className="card mt-4">
          <h2 className="text-sm font-semibold text-muted">Up next in your plan</h2>
          <p className="mt-1 font-medium">Day {nextDay.day} · {nextDay.title}</p>
          <ul className="ml-5 mt-1 list-disc text-sm text-muted">{nextDay.tasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <Link href="/plan/" className="btn-outline mt-3">Open plan</Link>
        </section>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/practice/" className="btn">Start flashcards</Link>
        <Link href="/stories/" className="btn-outline">Write a STAR story</Link>
        <Link href="/frameworks/" className="btn-outline">Frameworks</Link>
      </div>

      <h2 className="mt-8 font-semibold">Question categories</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {CATEGORIES.map((c) => {
          const qs = QUESTIONS.filter((q) => q.category === c.id);
          const g = qs.filter((q) => cards[q.id]?.status === 'got').length;
          return (
            <Link key={c.id} href="/questions/" className="card block transition hover:border-accent">
              <div className="font-medium">{c.label}</div>
              <div className="mb-2 text-xs text-muted">{c.blurb}</div>
              <ProgressBar value={g} max={qs.length} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
