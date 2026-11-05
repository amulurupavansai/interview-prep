export interface Framework {
  slug: string;
  name: string;
  tagline: string;
  whenToUse: string[];
  steps: { title: string; detail: string }[];
  example: { title: string; body: string[] };
  pitfalls: string[];
  questionCategories: string[];
}

export const FRAMEWORKS: Framework[] = [
  {
    slug: 'circles', name: 'CIRCLES', tagline: 'Structure for product design / product sense questions.',
    whenToUse: ['"Design a product for X" or "Improve Y" questions', 'Whenever you need a repeatable structure under pressure'],
    steps: [
      { title: 'C — Comprehend the situation', detail: 'Clarify the product, goal, constraints, timeframe and what success means. Ask 3-4 questions then restate.' },
      { title: 'I — Identify the customer', detail: 'List segments, pick one and justify (size, pain, strategic value).' },
      { title: 'R — Report customer needs', detail: 'Turn the segment into jobs and pain points; prioritise the top 1-2.' },
      { title: 'C — Cut through prioritisation', detail: 'Choose the need to solve using impact, frequency, strategic fit.' },
      { title: 'L — List solutions', detail: 'Brainstorm 3-5 distinct ideas, including one bold and one simple.' },
      { title: 'E — Evaluate trade-offs', detail: 'Compare on impact, effort, risk; pick one and state why.' },
      { title: 'S — Summarise', detail: 'Recap the user, problem, solution, MVP scope and success metrics.' },
    ],
    example: { title: 'Improve leave requests for shift workers', body: ['Comprehend: goal is fewer scheduling conflicts and fewer HR tickets.', 'Identify: shift workers in retail (large, low tool literacy) vs office staff, pick shift workers.', 'Needs: know balance, request in under 30 seconds, see if swaps are allowed.', 'Solution picked: mobile request with auto-check of coverage and instant feedback.', 'Metrics: request completion time, manager approval time, HR tickets.'] },
    pitfalls: ['Spending 10 minutes on clarifying and rushing the solution', 'Listing segments but never choosing one', 'Skipping success metrics'],
    questionCategories: ['product-sense'],
  },
  {
    slug: 'rice', name: 'RICE', tagline: 'Score and compare backlog items.',
    whenToUse: ['Comparing many candidate features', 'Defending prioritisation to stakeholders'],
    steps: [
      { title: 'Reach', detail: 'How many users/customers are affected per period (e.g. admins per quarter).' },
      { title: 'Impact', detail: 'Effect per user: 3 massive, 2 high, 1 medium, 0.5 low, 0.25 minimal.' },
      { title: 'Confidence', detail: 'How sure are you about the estimates: 100% / 80% / 50%.' },
      { title: 'Effort', detail: 'Person-months across product, design, engineering.' },
      { title: 'Score', detail: 'Score = (Reach x Impact x Confidence) / Effort. Rank, then sanity-check with judgement.' },
    ],
    example: { title: 'Bulk payslip download vs payslip explainer', body: ['Bulk download: reach 800, impact 1, confidence 80%, effort 1 → 640.', 'Explainer: reach 20,000, impact 2, confidence 50%, effort 3 → 6,667.', 'Explainer wins on score; validate confidence with a prototype test.'] },
    pitfalls: ['Treating scores as objective truth', 'Inflating confidence', 'Ignoring strategic or compliance must-dos'],
    questionCategories: ['prioritisation'],
  },
  {
    slug: 'moscow', name: 'MoSCoW', tagline: 'Scope a release into Must / Should / Could / Won\'t.',
    whenToUse: ['Fixed deadline releases', 'Negotiating scope with stakeholders'],
    steps: [
      { title: 'Must have', detail: 'Release fails without it (legal, core flow). Keep to about 60% of effort.' },
      { title: 'Should have', detail: 'Important but a workaround exists.' },
      { title: 'Could have', detail: 'Nice to have; first to drop.' },
      { title: "Won't have (this time)", detail: 'Explicitly out of scope; recorded to manage expectations.' },
    ],
    example: { title: 'New statutory tax update release', body: ['Must: new rates and thresholds in calculation, updated payslip fields.', 'Should: customer-facing change notice in app.', 'Could: simulation tool for HR.', "Won't: historical re-computation UI (next release)."] },
    pitfalls: ['Everything becomes a Must', 'No buffer for the unknown'],
    questionCategories: ['prioritisation', 'execution'],
  },
  {
    slug: 'aarrr', name: 'AARRR (Pirate metrics)', tagline: 'Funnel for acquisition-to-revenue diagnosis.',
    whenToUse: ['Diagnosing where growth leaks', 'Defining metrics per lifecycle stage'],
    steps: [
      { title: 'Acquisition', detail: 'How do people find us? Visitors, leads by channel.' },
      { title: 'Activation', detail: 'First moment of value, e.g. first successful pay run.' },
      { title: 'Retention', detail: 'Do they come back / renew? Cohort retention.' },
      { title: 'Revenue', detail: 'Monetisation: ARPA, expansion, NRR.' },
      { title: 'Referral', detail: 'Do customers recommend? Referrals, NPS.' },
    ],
    example: { title: 'Payroll SaaS for SMEs', body: ['Acquisition: accountant partner leads.', 'Activation: employees imported and first pay run done within 14 days.', 'Retention: second and third pay run completed.', 'Revenue: per-employee-per-month plus add-ons.', 'Referral: accountants referring other clients.'] },
    pitfalls: ['Optimising a stage without checking the next one', 'Using vanity metrics at the top'],
    questionCategories: ['metrics'],
  },
  {
    slug: 'heart', name: 'HEART', tagline: 'Google\'s UX metrics framework.',
    whenToUse: ['Measuring user experience of a feature', 'Linking goals to signals to metrics'],
    steps: [
      { title: 'Happiness', detail: 'Satisfaction: CSAT, NPS, survey scores.' },
      { title: 'Engagement', detail: 'Depth of use: frequency, sessions per week.' },
      { title: 'Adoption', detail: 'New users of a feature or product.' },
      { title: 'Retention', detail: 'Users who continue over time.' },
      { title: 'Task success', detail: 'Efficiency, effectiveness, error rate; time to complete.' },
      { title: 'Goals → Signals → Metrics', detail: 'For each dimension pick a goal, an observable signal and a metric.' },
    ],
    example: { title: 'Leave request redesign', body: ['Happiness: post-request CSAT.', 'Adoption: % of requests made through the new flow.', 'Task success: median time to submit and error rate.', 'Retention: repeat use next quarter.'] },
    pitfalls: ['Tracking all five for everything', 'Metrics without goals'],
    questionCategories: ['metrics', 'product-sense'],
  },
  {
    slug: 'north-star', name: 'North Star metric', tagline: 'One metric that captures delivered customer value.',
    whenToUse: ['Aligning teams around one outcome', 'Defining what "growth" means for a product'],
    steps: [
      { title: 'Find the value moment', detail: 'What do customers get that makes them stay?' },
      { title: 'Pick a metric reflecting value and frequency', detail: 'Should lead revenue, be measurable, and be influenced by teams.' },
      { title: 'Break into input metrics', detail: 'Breadth, depth, frequency, efficiency inputs that teams can own.' },
      { title: 'Add counter-metrics', detail: 'Quality, cost or trust guardrails to prevent gaming.' },
      { title: 'Review regularly', detail: 'Change if the business model shifts.' },
    ],
    example: { title: 'Payroll platform', body: ['North Star: pay runs completed on time with zero post-run corrections.', 'Inputs: companies live, runs started per week, validation issues caught pre-run.', 'Counter-metric: time spent per run.'] },
    pitfalls: ['Choosing revenue as the North Star', 'Metrics teams cannot influence', 'No counter-metrics'],
    questionCategories: ['metrics'],
  },
  {
    slug: 'jtbd', name: 'Jobs-to-be-done', tagline: 'Understand the progress a customer is trying to make.',
    whenToUse: ['Discovery interviews', 'Positioning and finding competitors beyond the obvious'],
    steps: [
      { title: 'Define the job statement', detail: 'When [situation], I want to [motivation], so I can [outcome].' },
      { title: 'Map functional, emotional and social dimensions', detail: 'What must get done, how they want to feel, how they want to be seen.' },
      { title: 'Find the forces', detail: 'Push (frustration), pull (new solution), anxiety, habit.' },
      { title: 'Identify unmet or poorly served needs', detail: 'Where is the current solution failing?' },
      { title: 'Design to the job', detail: 'Prioritise features that help complete the job.' },
    ],
    example: { title: 'HR admin and payroll cutoffs', body: ['Job: When cutoff is near, I want to be sure all inputs are correct so I can approve payroll without fear of errors.', 'Anxiety: finding mistakes after pay.', 'Solution: pre-run checklist and variance explanations.'] },
    pitfalls: ['Writing jobs that are really features', 'Confusing buyer and user jobs'],
    questionCategories: ['product-sense'],
  },
  {
    slug: 'root-cause', name: 'Root cause analysis', tagline: 'Find the underlying cause before proposing fixes.',
    whenToUse: ['Metric drops', 'Recurring payroll errors, outages, support spikes'],
    steps: [
      { title: 'Define the problem precisely', detail: 'What, where, when, how big. Quantify against a baseline.' },
      { title: 'Check data validity', detail: 'Is the measure or tracking broken?' },
      { title: 'Segment', detail: 'By time, platform, customer, region, version, cohort.' },
      { title: '5 Whys', detail: 'Ask why repeatedly until you reach a process or system cause.' },
      { title: 'Fishbone (Ishikawa)', detail: 'Group causes: people, process, technology, data, policy, environment.' },
      { title: 'Pareto', detail: 'Focus on the 20% of causes making 80% of the impact.' },
      { title: 'Fix, verify and prevent', detail: 'Implement, monitor the metric, add controls.' },
    ],
    example: { title: 'Payroll corrections doubled this quarter', body: ['Segment: corrections concentrated in two customers.', 'Why 1: incorrect allowance rates. Why 2: bulk import overwrote rates. Why 3: no validation on import. Why 4: validation was removed in a refactor.', 'Fix: restore validation plus regression test, alert on large changes.'] },
    pitfalls: ['Stopping at the first plausible cause', 'Blaming people instead of process', 'Fixing symptoms'],
    questionCategories: ['metrics', 'business-analysis', 'execution'],
  },
];

export const frameworkBySlug = (s: string) => FRAMEWORKS.find((f) => f.slug === s);
