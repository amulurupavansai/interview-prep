import { build } from './helper';

const star = ['Situation: brief context', 'Task: your responsibility', 'Action: what YOU did, step by step', 'Result: measurable outcome and what you learned'];

export default build('behavioural', 'bh', [
  ['easy', 'Tell me about yourself.', ['Present: current role and focus', 'Past: 2-3 relevant highlights', 'Future: why this role and company', 'Keep under 2 minutes'], ['Tailor to HR-tech/payroll and the role.']],
  ['easy', 'Why do you want to be a product manager / business analyst?', ['Personal story that shows the pull toward problems and users', 'Evidence from past work', 'What you will bring'], ['Be specific, avoid cliches.']],
  ['easy', 'Why HR-tech or payroll?', ['Payroll is mission-critical: people depend on it', 'Complex rules plus real user impact', 'Link to your experience or curiosity'], ['Show you understand the domain stakes.']],
  ['medium', 'Tell me about a time you disagreed with a stakeholder.', star, ['Show respect, data and a constructive outcome.']],
  ['medium', 'Tell me about a time you failed.', star, ['Own it; focus on learning and changes you made.']],
  ['medium', 'Describe a time you influenced without authority.', star, ['Highlight building a case and relationships.']],
  ['medium', 'Tell me about a time you used data to make a decision.', star, ['State the data, the decision and the result.']],
  ['medium', 'Describe a time you had to prioritise competing demands.', star, ['Name your criteria.']],
  ['medium', 'Tell me about a time you handled a difficult customer or stakeholder.', star, ['Show empathy plus firmness.']],
  ['hard', 'Tell me about the most complex project you managed.', star, ['Scope, stakeholders, risks, outcomes.']],
  ['medium', 'Describe a time you had to learn something quickly.', star, ['Show your learning method.']],
  ['medium', 'Tell me about a time you took initiative.', star, ['Not asked, but you saw an opportunity.']],
  ['medium', 'Tell me about a time you worked with a difficult teammate.', star, ['Avoid blame; focus on collaboration.']],
  ['hard', 'Describe a time you made a decision with incomplete information.', star, ['Show how you reduced risk.']],
  ['medium', 'Tell me about a time you received critical feedback.', star, ['Show you acted on it.']],
  ['medium', 'Describe a time you simplified a complex process.', star, ['Quantify time or error savings.']],
  ['hard', 'Tell me about a time you said no to a request.', star, ['Respect for the requester and clear reasoning.']],
  ['medium', 'Describe a time you missed a deadline.', star, ['Own it, communicate, fix the system.']],
  ['medium', 'Tell me about a time you led a team or project without being the manager.', star, ['Show how you motivated others.']],
  ['easy', 'What are your strengths and weaknesses?', ['2-3 strengths with evidence', 'A real weakness with steps you take to improve'], ['No fake weaknesses.']],
  ['easy', 'Where do you see yourself in 5 years?', ['Growth in craft and scope', 'Link to the company\'s path'], ['Be genuine but ambitious.']],
  ['medium', 'How do you handle ambiguity?', ['Clarify what is known and unknown', 'Make assumptions explicit', 'Take small steps to learn'], ['Give an example.']],
  ['medium', 'Tell me about a time you improved a product or process using customer feedback.', star, ['Close the loop.']],
  ['easy', 'Do you have any questions for us?', ['Ask about team goals, success in 6 months, biggest challenge, how product decisions are made'], ['Prepare 5 questions.']],
]);
