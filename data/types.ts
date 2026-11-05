export type CategoryId =
  | 'product-sense' | 'metrics' | 'prioritisation' | 'estimation' | 'execution'
  | 'behavioural' | 'business-analysis' | 'sql' | 'payroll-hr' | 'ai';

export interface Category { id: CategoryId; label: string; blurb: string }

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  category: CategoryId;
  q: string;
  answer: string[];
  tips: string[];
  difficulty: Difficulty;
}
