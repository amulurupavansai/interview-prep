import Link from 'next/link';
import { FRAMEWORKS } from '@/data/frameworks';

export default function FrameworksPage() {
  return (
    <div>
      <h1 className="h1">Frameworks cheat-sheets</h1>
      <p className="mt-1 text-sm text-muted">Use frameworks as scaffolding, not scripts. Say them out loud, then adapt.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {FRAMEWORKS.map((f) => (
          <Link key={f.slug} href={`/frameworks/${f.slug}/`} className="card block transition hover:border-accent">
            <h2 className="font-semibold">{f.name}</h2>
            <p className="mt-1 text-sm text-muted">{f.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
