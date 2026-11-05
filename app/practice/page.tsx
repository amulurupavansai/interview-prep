'use client';
import { useState } from 'react';
import { QUESTIONS } from '@/data/questions';
import { CATEGORIES, catLabel } from '@/data/categories';
import type { CategoryId, Question } from '@/data/types';
import { useData } from '@/lib/store';
import { setStatus } from '@/components/QuestionCard';

type Mode = 'all' | 'review' | 'new';

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}

export default function PracticePage() {
  const data = useData();
  const [cat, setCat] = useState<CategoryId | 'all'>('all');
  const [mode, setMode] = useState<Mode>('all');
  const [deck, setDeck] = useState<Question[] | null>(null);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [session, setSession] = useState({ got: 0, review: 0 });

  const pool = QUESTIONS.filter((q) => (cat === 'all' || q.category === cat) &&
    (mode === 'all' || (mode === 'review' ? data.cards[q.id]?.status === 'review' : !data.cards[q.id])));

  const start = () => { setDeck(shuffle(pool)); setI(0); setFlipped(false); setSession({ got: 0, review: 0 }); };
  const mark = (s: 'got' | 'review') => {
    if (!deck) return;
    setStatus(deck[i].id, s);
    setSession((x) => ({ ...x, [s]: x[s] + 1 }));
    setFlipped(false); setI(i + 1);
  };

  const gotTotal = Object.values(data.cards).filter((c) => c.status === 'got').length;
  const revTotal = Object.values(data.cards).filter((c) => c.status === 'review').length;

  if (!deck) {
    return (
      <div className="mx-auto max-w-xl">
        <h1 className="h1">Practice</h1>
        <p className="mt-1 text-sm text-muted">Flashcards from the question bank. Think of your answer first, flip, then be honest with yourself.</p>
        <div className="card mt-4 space-y-4">
          <label className="block text-sm font-medium">Category
            <select className="input mt-1" value={cat} onChange={(e) => setCat(e.target.value as CategoryId | 'all')}>
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium">Which cards
            <select className="input mt-1" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
              <option value="all">All</option><option value="review">Only “review again”</option><option value="new">Only not yet attempted</option>
            </select>
          </label>
          <p className="text-sm text-muted">{pool.length} cards in this deck · overall: {gotTotal} got it, {revTotal} to review</p>
          <button className="btn w-full justify-center" disabled={pool.length === 0} onClick={start}>Start session</button>
        </div>
      </div>
    );
  }

  if (i >= deck.length) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h1 className="h1">Session complete 🎉</h1>
        <div className="card mt-4">
          <p>{deck.length} cards · <span className="text-good">{session.got} got it</span> · <span className="text-warn">{session.review} review again</span></p>
          <div className="mt-4 flex justify-center gap-2">
            <button className="btn" onClick={start}>Go again</button>
            <button className="btn-outline" onClick={() => setDeck(null)}>Change deck</button>
          </div>
        </div>
      </div>
    );
  }

  const q = deck[i];
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center justify-between text-sm text-muted">
        <button className="btn-ghost" onClick={() => setDeck(null)}>← Decks</button>
        <span>{i + 1} / {deck.length}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full bg-accent transition-all" style={{ width: `${(i / deck.length) * 100}%` }} /></div>

      <div className="card mt-4 min-h-72 cursor-pointer select-none" onClick={() => setFlipped(!flipped)} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(!flipped); } }}
        aria-label={flipped ? 'Hide answer' : 'Show answer'}>
        <span className="chip">{catLabel(q.category)}</span>
        <h2 className="mt-3 text-lg font-semibold leading-snug">{q.q}</h2>
        {flipped ? (
          <div className="mt-4 border-t border-line pt-3 text-sm">
            <ul className="ml-5 list-disc">{q.answer.map((a, k) => <li key={k} className="mb-1">{a}</li>)}</ul>
            <p className="mt-3 text-muted">💡 {q.tips.join(' ')}</p>
          </div>
        ) : <p className="mt-8 text-center text-sm text-muted">Tap to reveal the model answer</p>}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="btn-outline justify-center !border-warn !text-warn" disabled={!flipped} onClick={() => mark('review')}>↻ Review again</button>
        <button className="btn justify-center !bg-good" disabled={!flipped} onClick={() => mark('got')}>✓ Got it</button>
      </div>
      {!flipped && <p className="mt-2 text-center text-xs text-muted">Flip the card to rate yourself</p>}
    </div>
  );
}
