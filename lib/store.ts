'use client';
import { useSyncExternalStore } from 'react';

export type CardStatus = 'got' | 'review';
export interface Story {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  reflection: string;
  tags: string[];
  updatedAt: number;
}
export interface AppData {
  version: 1;
  stories: Story[];
  cards: Record<string, { status: CardStatus; seen: number; at: number }>;
  plan: Record<string, boolean>;
  notes: Record<string, string>;
}

const KEY = 'ip:v1';
export const emptyData = (): AppData => ({ version: 1, stories: [], cards: {}, plan: {}, notes: {} });

let cache: AppData | null = null;
const listeners = new Set<() => void>();
const SERVER: AppData = emptyData();

function read(): AppData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return sanitize(JSON.parse(raw)) ?? emptyData();
  } catch {}
  return emptyData();
}

export function sanitize(x: unknown): AppData | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  const isObj = (v: unknown) => !!v && typeof v === 'object' && !Array.isArray(v);
  if (o.stories !== undefined && !Array.isArray(o.stories)) return null;
  if (o.cards !== undefined && !isObj(o.cards)) return null;
  if (o.plan !== undefined && !isObj(o.plan)) return null;
  const stories = ((o.stories as Story[]) ?? []).filter((s) => s && typeof s.id === 'string' && typeof s.title === 'string').map((s) => ({
    id: s.id, title: s.title, situation: s.situation ?? '', task: s.task ?? '', action: s.action ?? '',
    result: s.result ?? '', reflection: s.reflection ?? '', tags: Array.isArray(s.tags) ? s.tags.filter((t) => typeof t === 'string') : [],
    updatedAt: typeof s.updatedAt === 'number' ? s.updatedAt : Date.now(),
  }));
  return {
    version: 1,
    stories,
    cards: (o.cards as AppData['cards']) ?? {},
    plan: (o.plan as AppData['plan']) ?? {},
    notes: (isObj(o.notes) ? o.notes : {}) as AppData['notes'],
  };
}

const getSnapshot = () => (cache ??= read());
const getServerSnapshot = () => SERVER;
function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) { cache = null; fn(); }
  };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(fn); window.removeEventListener('storage', onStorage); };
}

export function setData(next: AppData) {
  cache = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  listeners.forEach((l) => l());
}
export const update = (fn: (d: AppData) => AppData) => setData(fn(getSnapshot()));

export function useData(): AppData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True once running in the browser (after hydration). */
export function useHydrated(): boolean {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function mergeData(a: AppData, b: AppData): AppData {
  const byId = new Map(a.stories.map((s) => [s.id, s]));
  b.stories.forEach((s) => { const e = byId.get(s.id); if (!e || s.updatedAt >= e.updatedAt) byId.set(s.id, s); });
  return { version: 1, stories: [...byId.values()], cards: { ...a.cards, ...b.cards }, plan: { ...a.plan, ...b.plan }, notes: { ...a.notes, ...b.notes } };
}
