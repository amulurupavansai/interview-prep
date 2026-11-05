export interface PlanDay { day: number; title: string; tasks: string[]; link?: { href: string; label: string } }
export interface PlanWeek { week: number; theme: string; days: PlanDay[] }

const d = (day: number, title: string, tasks: string[], link?: PlanDay['link']): PlanDay => ({ day, title, tasks, link });

export const PLAN: PlanWeek[] = [
  { week: 1, theme: 'Foundations & domain', days: [
    d(1, 'Set up & role research', ['Pick target roles and 10 companies', 'Read 3 JDs; list common requirements', 'Write your 2-minute "tell me about yourself"'], { href: '/questions/', label: 'Browse questions' }),
    d(2, 'Product basics', ['Study the CIRCLES framework', 'Answer 3 product sense questions aloud'], { href: '/frameworks/circles/', label: 'CIRCLES' }),
    d(3, 'Payroll fundamentals', ['Learn the payroll cycle end to end', 'Learn gross-to-net and statutory deductions', 'Do 10 payroll/HR flashcards'], { href: '/practice/', label: 'Practice' }),
    d(4, 'HR systems', ['Understand HRIS vs HCM vs payroll', 'Learn the employee lifecycle', 'Do 10 HR flashcards']),
    d(5, 'Company deep dive #1', ['Research one target company: product, customers, competitors', 'Write 5 smart questions to ask']),
    d(6, 'Metrics basics', ['Study AARRR and HEART', 'Answer 3 metrics questions'], { href: '/frameworks/aarrr/', label: 'AARRR' }),
    d(7, 'Review & rest', ['Review week 1 flashcards marked "review"', 'Light reading only']),
  ] },
  { week: 2, theme: 'Core PM skills', days: [
    d(8, 'Prioritisation', ['Study RICE and MoSCoW', 'Practise scoring 5 backlog items'], { href: '/frameworks/rice/', label: 'RICE' }),
    d(9, 'Estimation', ['Practise 4 estimation questions with structure', 'Memorise a few base numbers for your market'], { href: '/questions/', label: 'Estimation Qs' }),
    d(10, 'Execution', ['Write a sample PRD one-pager', 'Answer 5 execution questions']),
    d(11, 'North Star & JTBD', ['Define North Star for a payroll product', 'Write 3 job statements'], { href: '/frameworks/north-star/', label: 'North Star' }),
    d(12, 'Root cause analysis', ['Practise a metric-drop diagnosis out loud', 'Write a fishbone for payroll errors'], { href: '/frameworks/root-cause/', label: 'RCA' }),
    d(13, 'Product sense drills', ['Do 5 product sense questions, timed 15 min each']),
    d(14, 'Review & mock #1', ['Mock interview with a friend or record yourself', 'Review flashcards']),
  ] },
  { week: 3, theme: 'Stories, BA & data', days: [
    d(15, 'STAR story inventory', ['List 8-10 experiences', 'Write 4 STAR stories'], { href: '/stories/', label: 'Story builder' }),
    d(16, 'More STAR stories', ['Write 4 more stories', 'Tag each to question types']),
    d(17, 'Business analysis', ['Review requirements, user stories, BRD vs FRD', 'Answer 8 BA questions']),
    d(18, 'Process mapping', ['Map payroll cycle as-is process', 'Identify 3 improvements']),
    d(19, 'SQL basics I', ['Joins, group by, having', 'Solve 5 practice queries']),
    d(20, 'SQL basics II', ['Window functions, CTEs', 'Solve 5 practice queries']),
    d(21, 'Review & mock #2', ['Behavioural mock', 'Rehearse stories aloud']),
  ] },
  { week: 4, theme: 'AI, polish & mocks', days: [
    d(22, 'AI products', ['Study LLM evals, RAG, hallucination mitigation', 'Answer 8 AI questions']),
    d(23, 'AI product design', ['Design an HR policy assistant end to end']),
    d(24, 'Company deep dive #2', ['Research second company', 'Tailor product-improvement ideas']),
    d(25, 'Full mock: product', ['Product sense + metrics mock, 45 min']),
    d(26, 'Full mock: behavioural & BA', ['Behavioural and BA mock, 45 min']),
    d(27, 'Weak spots', ['Re-do all "review again" flashcards', 'Fix weakest category']),
    d(28, 'Applications', ['Polish CV and LinkedIn', 'Prepare questions to ask interviewers']),
    d(29, 'Final rehearsal', ['Run through frameworks and key stories']),
    d(30, 'Rest & confidence', ['Light review', 'Sleep well, prepare logistics']),
  ] },
];

export const PLAN_TOTAL = PLAN.reduce((n, w) => n + w.days.reduce((m, dd) => m + dd.tasks.length, 0), 0);
export const taskKey = (day: number, i: number) => `d${day}t${i}`;
