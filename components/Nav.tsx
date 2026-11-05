'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/questions/', label: 'Questions', icon: '❓' },
  { href: '/practice/', label: 'Practice', icon: '🃏' },
  { href: '/stories/', label: 'Stories', icon: '⭐' },
  { href: '/frameworks/', label: 'Frameworks', icon: '🧭' },
  { href: '/plan/', label: '30-day plan', icon: '✅' },
];

export default function Nav() {
  const path = usePathname() || '/';
  const active = (h: string) => (h === '/' ? path === '/' : path.startsWith(h.replace(/\/$/, '')));
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
          <Link href="/" className="font-semibold tracking-tight">Interview Prep</Link>
          <nav className="ml-4 hidden gap-1 md:flex" aria-label="Main">
            {LINKS.slice(1).map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-md px-3 py-1.5 text-sm ${active(l.href) ? 'bg-accent/10 font-medium text-accent' : 'text-muted hover:text-fg'}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Link href="/data/" className="btn-ghost text-sm">Data</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <nav aria-label="Main mobile" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-line bg-bg/95 backdrop-blur md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={`flex flex-col items-center gap-0.5 py-2 text-[10px] ${active(l.href) ? 'text-accent font-medium' : 'text-muted'}`}>
            <span className="text-base leading-none" aria-hidden>{l.icon}</span>{l.label.replace('30-day plan', 'Plan')}
          </Link>
        ))}
      </nav>
    </>
  );
}
