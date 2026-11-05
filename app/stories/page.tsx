'use client';
import { useState } from 'react';
import { CATEGORIES, catLabel } from '@/data/categories';
import { update, uid, useData, type Story } from '@/lib/store';

const THEMES = ['conflict', 'leadership', 'failure', 'influence', 'data-driven', 'ambiguity', 'customer-focus', 'initiative', 'deadline-pressure'];
const ALL_TAGS = [...CATEGORIES.map((c) => c.id as string), ...THEMES];
const tagLabel = (t: string) => (CATEGORIES.some((c) => c.id === t) ? catLabel(t) : t.replace(/-/g, ' '));

const blank = (): Story => ({ id: uid(), title: '', situation: '', task: '', action: '', result: '', reflection: '', tags: [], updatedAt: Date.now() });
const FIELDS: { key: 'situation' | 'task' | 'action' | 'result' | 'reflection'; label: string; hint: string }[] = [
  { key: 'situation', label: 'Situation', hint: 'Context in 1-2 sentences: where, when, what was at stake.' },
  { key: 'task', label: 'Task', hint: 'Your specific responsibility or goal.' },
  { key: 'action', label: 'Action', hint: 'What YOU did, step by step. Use “I”, not “we”.' },
  { key: 'result', label: 'Result', hint: 'Measurable outcome (%, hours saved, ₹/$ impact).' },
  { key: 'reflection', label: 'Learning (optional)', hint: 'What you would do differently.' },
];

export default function StoriesPage() {
  const { stories } = useData();
  const [editing, setEditing] = useState<Story | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const save = () => {
    if (!editing || !editing.title.trim()) return;
    const s = { ...editing, updatedAt: Date.now() };
    update((d) => ({ ...d, stories: d.stories.some((x) => x.id === s.id) ? d.stories.map((x) => (x.id === s.id ? s : x)) : [s, ...d.stories] }));
    setEditing(null);
  };
  const remove = (id: string) => { if (confirm('Delete this story?')) update((d) => ({ ...d, stories: d.stories.filter((s) => s.id !== id) })); };
  const toggle = (t: string) => editing && setEditing({ ...editing, tags: editing.tags.includes(t) ? editing.tags.filter((x) => x !== t) : [...editing.tags, t] });

  if (editing) {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="h1">{stories.some((s) => s.id === editing.id) ? 'Edit story' : 'New STAR story'}</h1>
        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium">Title
            <input className="input mt-1" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Cut payroll corrections by 40%" />
          </label>
          {FIELDS.map((f) => (
            <label key={f.key} className="block text-sm font-medium">{f.label}
              <span className="block text-xs font-normal text-muted">{f.hint}</span>
              <textarea className="input mt-1 min-h-24" value={editing[f.key]} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
            </label>
          ))}
          <fieldset>
            <legend className="text-sm font-medium">Tag to question types</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {ALL_TAGS.map((t) => (
                <button type="button" key={t} aria-pressed={editing.tags.includes(t)} onClick={() => toggle(t)} className={`chip ${editing.tags.includes(t) ? 'chip-on' : ''}`}>{tagLabel(t)}</button>
              ))}
            </div>
          </fieldset>
          <div className="flex gap-2">
            <button className="btn" onClick={save} disabled={!editing.title.trim()}>Save story</button>
            <button className="btn-outline" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  const shown = filter === 'all' ? stories : stories.filter((s) => s.tags.includes(filter));
  const used = ALL_TAGS.filter((t) => stories.some((s) => s.tags.includes(t)));
  const uncovered = THEMES.filter((t) => !stories.some((s) => s.tags.includes(t)));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="h1">STAR stories</h1>
        <button className="btn" onClick={() => setEditing(blank())}>+ New story</button>
      </div>
      <p className="mt-1 text-sm text-muted">Aim for 6-8 stories that flex across many questions. Saved only in this browser.</p>

      {stories.length > 0 && (
        <>
          <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
            <button className={`chip shrink-0 ${filter === 'all' ? 'chip-on' : ''}`} onClick={() => setFilter('all')}>All ({stories.length})</button>
            {used.map((t) => <button key={t} className={`chip shrink-0 ${filter === t ? 'chip-on' : ''}`} onClick={() => setFilter(t)}>{tagLabel(t)}</button>)}
          </div>
          {uncovered.length > 0 && <p className="mt-2 text-xs text-muted">No story yet for: {uncovered.map(tagLabel).join(', ')}</p>}
        </>
      )}

      <div className="mt-4 space-y-3">
        {shown.map((s) => (
          <article key={s.id} className="card">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold">{s.title}</h2>
              <div className="flex shrink-0 gap-1">
                <button className="btn-ghost" onClick={() => setEditing(s)}>Edit</button>
                <button className="btn-ghost" onClick={() => remove(s.id)}>Delete</button>
              </div>
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">{s.tags.map((t) => <span key={t} className="chip chip-on">{tagLabel(t)}</span>)}</div>
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer text-accent">Read story</summary>
              <dl className="mt-2 space-y-2">
                {FIELDS.filter((f) => s[f.key]).map((f) => (
                  <div key={f.key}><dt className="font-medium">{f.label}</dt><dd className="whitespace-pre-wrap text-muted">{s[f.key]}</dd></div>
                ))}
              </dl>
            </details>
          </article>
        ))}
        {stories.length === 0 && (
          <div className="card text-center text-muted">
            <p>No stories yet.</p>
            <button className="btn mt-3" onClick={() => setEditing(blank())}>Write your first story</button>
          </div>
        )}
      </div>
    </div>
  );
}
