import { matchStyleProfile } from './style-definitions.js';

/**
 * Generate style profile from quiz answers
 */
export function generateStyleProfile(quizAnswers) {
  const profile = matchStyleProfile(quizAnswers);
  return {
    id: profile.id,
    name: profile.name,
    description: profile.description,
    keywords: profile.keywords
  };
}
