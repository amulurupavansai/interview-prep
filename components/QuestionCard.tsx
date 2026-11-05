'use client';
import { useState } from 'react';
import type { Question } from '@/data/types';
import { catLabel } from '@/data/categories';
import { update, type CardStatus } from '@/lib/store';

const DIFF: Record<string, string> = { easy: 'text-good', medium: 'text-warn', hard: 'text-red-500' };

export function setStatus(id: string, status: CardStatus) {
  update((d) => ({ ...d, cards: { ...d.cards, [id]: { status, seen: (d.cards[id]?.seen ?? 0) + 1, at: Date.now() } } }));
}

export default function QuestionCard({ q, status }: { q: Question; status?: CardStatus }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="card">
      <button className="flex w-full items-start gap-3 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="mt-0.5 text-muted" aria-hidden>{open ? '▾' : '▸'}</span>
        <span className="flex-1">
          <span className="block font-medium leading-snug">{q.q}</span>
          <span className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="chip">{catLabel(q.category)}</span>
            <span className={DIFF[q.difficulty]}>{q.difficulty}</span>
            {status === 'got' && <span className="text-good">✓ got it</span>}
            {status === 'review' && <span className="text-warn">↻ review</span>}
          </span>
        </span>
      </button>
      {open && (
        <div className="mt-3 border-t border-line pt-3 text-sm">
          <h3 className="mb-1 font-semibold">Model answer outline</h3>
          <ul className="prose-lite ml-5 list-disc">{q.answer.map((a, i) => <li key={i}>{a}</li>)}</ul>
          <h3 className="mb-1 mt-3 font-semibold">Tips</h3>
          <ul className="prose-lite ml-5 list-disc text-muted">{q.tips.map((a, i) => <li key={i}>{a}</li>)}</ul>
          <div className="mt-3 flex gap-2">
            <button className="btn-outline !min-h-9 !py-1" onClick={() => setStatus(q.id, 'got')}>✓ Got it</button>
            <button className="btn-outline !min-h-9 !py-1" onClick={() => setStatus(q.id, 'review')}>↻ Review again</button>
          </div>
        </div>
      )}
    </article>
  );
}
