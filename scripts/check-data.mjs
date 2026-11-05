// Build-time sanity check: question bank must have 200+ entries, each category populated.
import { readdirSync, readFileSync } from 'node:fs';
const dir = new URL('../data/questions/', import.meta.url);
let total = 0;
const problems = [];
for (const f of readdirSync(dir)) {
  if (f === 'helper.ts' || f === 'index.ts') continue;
  const src = readFileSync(new URL(f, dir), 'utf8');
  const n = (src.match(/^\s*\['(easy|medium|hard)',/gm) || []).length;
  total += n;
  if (n < 20) problems.push(`${f} has only ${n} questions (need >= 20)`);
}
if (total < 200) problems.push(`Only ${total} questions in total (need >= 200)`);
if (problems.length) { console.error('Data check failed:\n - ' + problems.join('\n - ')); process.exit(1); }
console.log(`Data check OK: ${total} questions`);
