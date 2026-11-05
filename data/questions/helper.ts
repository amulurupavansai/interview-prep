import type { CategoryId, Difficulty, Question } from '../types';

type Row = [Difficulty, string, string[], string[]];

export function build(category: CategoryId, prefix: string, rows: Row[]): Question[] {
  return rows.map(([difficulty, q, answer, tips], i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, '0')}`,
    category, q, answer, tips, difficulty,
  }));
}
