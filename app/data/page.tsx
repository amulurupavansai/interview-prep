'use client';
import { useRef, useState } from 'react';
import { emptyData, mergeData, sanitize, setData, useData } from '@/lib/store';

export default function DataPage() {
  const data = useData();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [mode, setMode] = useState<'merge' | 'replace'>('merge');

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `interview-prep-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMsg({ ok: true, text: 'Exported.' });
  };

  const importJson = async (f: File) => {
    try {
      const parsed = sanitize(JSON.parse(await f.text()));
      if (!parsed) throw new Error('bad shape');
      setData(mode === 'merge' ? mergeData(data, parsed) : parsed);
      setMsg({ ok: true, text: `Imported ${parsed.stories.length} stories, ${Object.keys(parsed.cards).length} card ratings (${mode}).` });
    } catch {
      setMsg({ ok: false, text: 'That file is not a valid Interview Prep export. Nothing was changed.' });
    }
    if (file.current) file.current.value = '';
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="h1">Your data</h1>
      <p className="mt-1 text-sm text-muted">Everything is stored in this browser only (localStorage). Export a backup regularly, especially before clearing browser data or switching devices.</p>

      <div className="card mt-4 text-sm">
        {data.stories.length} stories · {Object.keys(data.cards).length} rated cards · {Object.values(data.plan).filter(Boolean).length} plan tasks done
      </div>

      <section className="card mt-4 space-y-3">
        <h2 className="font-semibold">Export</h2>
        <button className="btn" onClick={exportJson}>Download JSON backup</button>
      </section>

      <section className="card mt-4 space-y-3">
        <h2 className="font-semibold">Import</h2>
        <fieldset className="flex gap-4 text-sm">
          <label className="flex items-center gap-1.5"><input type="radio" checked={mode === 'merge'} onChange={() => setMode('merge')} /> Merge with current</label>
          <label className="flex items-center gap-1.5"><input type="radio" checked={mode === 'replace'} onChange={() => setMode('replace')} /> Replace current</label>
        </fieldset>
        <input ref={file} type="file" accept="application/json,.json" className="block w-full text-sm" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
      </section>

      <section className="card mt-4 space-y-3">
        <h2 className="font-semibold">Reset</h2>
        <button className="btn-outline !border-red-500 !text-red-500" onClick={() => { if (confirm('Delete all stories, ratings and plan progress from this browser?')) { setData(emptyData()); setMsg({ ok: true, text: 'All data cleared.' }); } }}>Clear all data</button>
      </section>

      {msg && <p role="status" className={`mt-4 text-sm ${msg.ok ? 'text-good' : 'text-red-500'}`}>{msg.text}</p>}
    </div>
  );
}
