'use client';
import { useMemo, useState } from 'react';
import { QUESTIONS } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import type { CategoryId, Difficulty } from '@/data/types';
import QuestionCard from '@/components/QuestionCard';
import { useData } from '@/lib/store';

export default function QuestionsPage() {
  const data = useData();
  const [cat, setCat] = useState<CategoryId | 'all'>('all');
  const [diff, setDiff] = useState<Difficulty | 'all'>('all');
  const [status, setStatusF] = useState<'all' | 'got' | 'review' | 'new'>('all');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(30);

  const list = useMemo(() => {
    const s = search.trim().toLowerCase();
    return QUESTIONS.filter((q) => {
      if (cat !== 'all' && q.category !== cat) return false;
      if (diff !== 'all' && q.difficulty !== diff) return false;
      const st = data.cards[q.id]?.status;
      if (status === 'new' && st) return false;
      if ((status === 'got' || status === 'review') && st !== status) return false;
      if (s && !(q.q.toLowerCase().includes(s) || q.answer.some((a) => a.toLowerCase().includes(s)))) return false;
      return true;
    });
  }, [cat, diff, status, search, data.cards]);

  const reset = () => setLimit(30);
  return (
    <div>
      <h1 className="h1">Question bank</h1>
      <p className="mt-1 text-sm text-muted">{QUESTIONS.length} questions · {list.length} shown</p>

      <input className="input mt-4" type="search" placeholder="Search questions and answers…" value={search}
        onChange={(e) => { setSearch(e.target.value); reset(); }} aria-label="Search questions" />

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Category">
        <button className={`chip shrink-0 ${cat === 'all' ? 'chip-on' : ''}`} onClick={() => { setCat('all'); reset(); }}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.id} className={`chip shrink-0 ${cat === c.id ? 'chip-on' : ''}`} onClick={() => { setCat(c.id); reset(); }}>{c.label}</button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <select className="input !w-auto" value={diff} onChange={(e) => { setDiff(e.target.value as Difficulty | 'all'); reset(); }} aria-label="Difficulty">
          <option value="all">Any difficulty</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
        </select>
        <select className="input !w-auto" value={status} onChange={(e) => { setStatusF(e.target.value as typeof status); reset(); }} aria-label="Status">
          <option value="all">Any status</option><option value="new">Not attempted</option><option value="review">Review again</option><option value="got">Got it</option>
        </select>
      </div>

      <div className="mt-4 space-y-3">
        {list.slice(0, limit).map((q) => <QuestionCard key={q.id} q={q} status={data.cards[q.id]?.status} />)}
        {list.length === 0 && <p className="card text-center text-muted">No questions match these filters.</p>}
        {list.length > limit && <button className="btn-outline w-full justify-center" onClick={() => setLimit(limit + 30)}>Show more ({list.length - limit} left)</button>}
      </div>
    </div>
  );
}
