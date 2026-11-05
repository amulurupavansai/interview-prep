'use client';
import { useState, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark' | 'system';
const apply = (t: Theme) => {
  const dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
};
const read = (): Theme => {
  try { return (localStorage.getItem('ip:theme') as Theme) || 'system'; } catch { return 'system'; }
};

export default function ThemeToggle() {
  const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [theme, setTheme] = useState<Theme | null>(null);
  const t = theme ?? (hydrated ? read() : 'system');
  const next = () => {
    const n: Theme = t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system';
    try { localStorage.setItem('ip:theme', n); } catch {}
    apply(n); setTheme(n);
  };
  const icon = t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '🖥️';
  return (
    <button onClick={next} aria-label={`Theme: ${t}. Click to change`} title={`Theme: ${t}`}
      className="btn-ghost h-9 w-9 justify-center !px-0">{icon}</button>
  );
}
