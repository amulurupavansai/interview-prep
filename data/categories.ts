import type { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'product-sense', label: 'Product sense', blurb: 'Users, problems, solutions, design trade-offs' },
  { id: 'metrics', label: 'Product metrics', blurb: 'Define, diagnose and move the right numbers' },
  { id: 'prioritisation', label: 'Prioritisation', blurb: 'Frameworks, trade-offs, saying no' },
  { id: 'estimation', label: 'Estimation', blurb: 'Structured back-of-envelope sizing' },
  { id: 'execution', label: 'Execution', blurb: 'Launch, delivery, stakeholders, risk' },
  { id: 'behavioural', label: 'Behavioural (STAR)', blurb: 'Stories about you: conflict, failure, leadership' },
  { id: 'business-analysis', label: 'Business analysis', blurb: 'Requirements, process, UAT, stakeholders' },
  { id: 'sql', label: 'SQL basics', blurb: 'Joins, aggregation, windows, data sense' },
  { id: 'payroll-hr', label: 'Payroll / HR domain', blurb: 'Payroll runs, compliance, HRIS workflows' },
  { id: 'ai', label: 'AI products', blurb: 'LLM features, evals, risk, build vs buy' },
];

export const catLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;
