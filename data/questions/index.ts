import type { Question } from '../types';
import ps from './product-sense';
import pm from './metrics';
import pr from './prioritisation';
import es from './estimation';
import ex from './execution';
import bh from './behavioural';
import ba from './business-analysis';
import sq from './sql';
import hr from './payroll-hr';
import ai from './ai';

export const QUESTIONS: Question[] = [...ps, ...pm, ...pr, ...es, ...ex, ...bh, ...ba, ...sq, ...hr, ...ai];
export const questionById = (id: string) => QUESTIONS.find((q) => q.id === id);
