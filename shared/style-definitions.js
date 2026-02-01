/**
 * Style DNA - Shared Style Definitions & Quiz Configuration
 * Rule-based style matching logic
 */

export const BODY_TYPES = [
  { id: 'slim', label: 'Slim', description: 'Lean, narrow frame' },
  { id: 'athletic', label: 'Athletic', description: 'Muscular, defined' },
  { id: 'regular', label: 'Regular', description: 'Average build' },
  { id: 'broad', label: 'Broad', description: 'Wider shoulders, solid' },
  { id: 'stocky', label: 'Stocky', description: 'Compact, heavier build' }
];

export const PREFERRED_STYLES = [
  { id: 'casual', label: 'Casual' },
  { id: 'smart', label: 'Smart' },
  { id: 'street', label: 'Street' },
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'sporty', label: 'Sporty' },
  { id: 'creative', label: 'Creative' },
  { id: 'bohemian', label: 'Bohemian' }
];

export const LIFESTYLE_DRESS_CODES = [
  { id: 'office', label: 'Office / Corporate' },
  { id: 'freelance', label: 'Freelance / Remote' },
  { id: 'creative', label: 'Creative Industry' },
  { id: 'student', label: 'Student' },
  { id: 'entrepreneur', label: 'Entrepreneur' },
  { id: 'mixed', label: 'Mixed / Flexible' }
];

export const BUDGET_OPTIONS = [
  { id: 'low', label: 'Budget-friendly', description: 'Under $100 per item' },
  { id: 'medium', label: 'Mid-range', description: '$100–300 per item' },
  { id: 'high', label: 'Premium', description: '$300+ per item' }
];

export const STYLE_PROFILES = {
  minimal_scandinavian: {
    id: 'minimal_scandinavian',
    name: 'Minimal Scandinavian',
    description: 'Clean lines, neutral palette, understated elegance. Your style focuses on quality over quantity—each piece serves a purpose. Think monochrome basics, natural fabrics, and timeless silhouettes.',
    keywords: ['minimal menswear', 'scandinavian style men', 'neutral outfit casual'],
    triggers: {
      preferredStyles: ['minimal', 'casual'],
      lifestyle: ['freelance', 'creative', 'office'],
      budget: ['medium', 'high'],
      weight: 1
    }
  },
  smart_casual: {
    id: 'smart_casual',
    name: 'Smart Casual',
    description: 'Polished yet relaxed. Your wardrobe balances refinement with comfort—think tailored chinos, quality knitwear, and versatile blazers. Perfect for professionals who value both style and ease.',
    keywords: ['smart casual menswear', 'tailored casual outfit', 'business casual men'],
    triggers: {
      preferredStyles: ['smart', 'casual', 'classic'],
      lifestyle: ['office', 'freelance', 'entrepreneur'],
      budget: ['medium', 'high'],
      weight: 1
    }
  },
  street_urban: {
    id: 'street_urban',
    name: 'Street Urban',
    description: 'Bold, trend-driven, sneaker culture. You mix streetwear staples with contemporary pieces—oversized fits, statement sneakers, and urban edge. Always ahead of the curve.',
    keywords: ['streetwear men', 'urban style outfit', 'sneaker fashion'],
    triggers: {
      preferredStyles: ['street', 'sporty', 'creative'],
      lifestyle: ['student', 'creative', 'mixed'],
      budget: ['low', 'medium'],
      weight: 1
    }
  },
  classic_traditional: {
    id: 'classic_traditional',
    name: 'Classic Traditional',
    description: 'Timeless, tailored, heritage. You invest in pieces that last decades—Oxford shirts, quality suits, leather goods. Your style speaks of refinement and permanence.',
    keywords: ['classic menswear', 'traditional style men', 'heritage fashion'],
    triggers: {
      preferredStyles: ['classic', 'smart'],
      lifestyle: ['office', 'entrepreneur'],
      budget: ['high'],
      weight: 1
    }
  },
  creative_eclectic: {
    id: 'creative_eclectic',
    name: 'Creative Eclectic',
    description: 'Mix of patterns, bold colors, unexpected combinations. You're not afraid to experiment—vintage finds meet contemporary pieces. Your style is distinctly yours.',
    keywords: ['eclectic menswear', 'creative style men', 'pattern mixing outfit'],
    triggers: {
      preferredStyles: ['creative', 'bohemian', 'street'],
      lifestyle: ['creative', 'freelance', 'student'],
      budget: ['low', 'medium'],
      weight: 1
    }
  },
  relaxed_modern: {
    id: 'relaxed_modern',
    name: 'Relaxed Modern',
    description: 'Comfortable, contemporary basics. You prefer ease and functionality—soft fabrics, relaxed fits, versatile pieces that work from day to night. Effortless and authentic.',
    keywords: ['relaxed menswear', 'modern casual outfit', 'comfortable style men'],
    triggers: {
      preferredStyles: ['casual', 'minimal', 'sporty'],
      lifestyle: ['student', 'freelance', 'mixed'],
      budget: ['low', 'medium'],
      weight: 1
    }
  }
};

/**
 * Calculate style match score for a user's quiz answers
 */
export function calculateStyleMatch(quizAnswers, styleProfile) {
  let score = 0;
  const { preferredStyles = [], lifestyle, budget, favoriteBrands = [] } = quizAnswers;
  const { triggers } = styleProfile;

  // Preferred styles (40% weight)
  const styleMatches = preferredStyles.filter(s => triggers.preferredStyles?.includes(s)).length;
  if (triggers.preferredStyles?.length) {
    score += (styleMatches / Math.max(preferredStyles.length, 1)) * 40;
  }

  // Lifestyle (30% weight)
  if (lifestyle && triggers.lifestyle?.includes(lifestyle)) {
    score += 30;
  }

  // Budget (20% weight)
  if (budget && triggers.budget?.includes(budget)) {
    score += 20;
  }

  // Brands add small bonus if style fits (10%)
  score += 10; // Default small bonus for MVP

  return score;
}

/**
 * Match user quiz answers to best style profile
 */
export function matchStyleProfile(quizAnswers) {
  const scores = {};
  
  for (const [id, profile] of Object.entries(STYLE_PROFILES)) {
    scores[id] = calculateStyleMatch(quizAnswers, profile);
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topMatch = sorted[0];
  const fallback = 'relaxed_modern';

  return topMatch && topMatch[1] > 0 
    ? STYLE_PROFILES[topMatch[0]] 
    : STYLE_PROFILES[fallback];
}
