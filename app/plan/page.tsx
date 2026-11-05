'use client';
import Link from 'next/link';
import { PLAN, PLAN_TOTAL, taskKey } from '@/data/plan';
import { update, useData } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';

export default function PlanPage() {
  const { plan } = useData();
  const done = Object.values(plan).filter(Boolean).length;
  const toggle = (k: string) => update((d) => ({ ...d, plan: { ...d.plan, [k]: !d.plan[k] } }));
  const dayDone = (day: number, n: number) => Array.from({ length: n }).every((_, i) => plan[taskKey(day, i)]);

  return (
    <div>
      <h1 className="h1">30-day prep plan</h1>
      <div className="card mt-4"><ProgressBar value={done} max={PLAN_TOTAL} label="Overall progress (tasks)" /></div>

      {PLAN.map((w) => {
        const total = w.days.reduce((n, d) => n + d.tasks.length, 0);
        const wd = w.days.reduce((n, d) => n + d.tasks.filter((_, i) => plan[taskKey(d.day, i)]).length, 0);
        return (
          <section key={w.week} className="mt-8">
            <h2 className="text-lg font-semibold">Week {w.week}: {w.theme}</h2>
            <div className="mt-2"><ProgressBar value={wd} max={total} /></div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {w.days.map((d) => (
                <div key={d.day} className={`card ${dayDone(d.day, d.tasks.length) ? 'opacity-70' : ''}`}>
                  <h3 className="text-sm font-semibold">Day {d.day} · {d.title}{dayDone(d.day, d.tasks.length) && ' ✓'}</h3>
                  <ul className="mt-2 space-y-1">
                    {d.tasks.map((t, i) => {
                      const k = taskKey(d.day, i);
                      return (
                        <li key={k}>
                          <label className="flex min-h-8 cursor-pointer items-start gap-2 text-sm">
                            <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--accent)]" checked={!!plan[k]} onChange={() => toggle(k)} />
                            <span className={plan[k] ? 'text-muted line-through' : ''}>{t}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  {d.link && <Link href={d.link.href} className="mt-2 inline-block text-xs text-accent underline">{d.link.label} →</Link>}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
