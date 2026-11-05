import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FRAMEWORKS, frameworkBySlug } from '@/data/frameworks';
import { catLabel } from '@/data/categories';

export function generateStaticParams() {
  return FRAMEWORKS.map((f) => ({ slug: f.slug }));
}
export const dynamicParams = false;

export default async function FrameworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = frameworkBySlug(slug);
  if (!f) notFound();
  const idx = FRAMEWORKS.findIndex((x) => x.slug === slug);
  const prev = FRAMEWORKS[idx - 1], next = FRAMEWORKS[idx + 1];
  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/frameworks/" className="text-sm text-muted hover:text-fg">← All frameworks</Link>
      <h1 className="h1 mt-2">{f.name}</h1>
      <p className="mt-1 text-muted">{f.tagline}</p>

      <section className="card mt-5">
        <h2 className="font-semibold">When to use</h2>
        <ul className="prose-lite ml-5 mt-2 list-disc text-sm">{f.whenToUse.map((w, i) => <li key={i}>{w}</li>)}</ul>
      </section>

      <section className="mt-5">
        <h2 className="font-semibold">Steps</h2>
        <ol className="mt-2 space-y-2">
          {f.steps.map((s, i) => (
            <li key={i} className="card !p-3 text-sm"><span className="font-medium">{s.title}</span><span className="block text-muted">{s.detail}</span></li>
          ))}
        </ol>
      </section>

      <section className="card mt-5">
        <h2 className="font-semibold">Worked example: {f.example.title}</h2>
        <ul className="prose-lite ml-5 mt-2 list-disc text-sm">{f.example.body.map((b, i) => <li key={i}>{b}</li>)}</ul>
      </section>

      <section className="card mt-5 border-warn/50">
        <h2 className="font-semibold">Common pitfalls</h2>
        <ul className="prose-lite ml-5 mt-2 list-disc text-sm">{f.pitfalls.map((b, i) => <li key={i}>{b}</li>)}</ul>
      </section>

      <p className="mt-5 text-sm text-muted">Practise with: {f.questionCategories.map(catLabel).join(', ')} — <Link className="text-accent underline" href="/questions/">question bank</Link></p>

      <nav className="mt-6 flex justify-between text-sm">
        {prev ? <Link className="btn-outline" href={`/frameworks/${prev.slug}/`}>← {prev.name}</Link> : <span />}
        {next ? <Link className="btn-outline" href={`/frameworks/${next.slug}/`}>{next.name} →</Link> : <span />}
      </nav>
    </article>
  );
}
