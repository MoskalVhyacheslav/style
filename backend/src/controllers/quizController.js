import QuizAnswer from '../models/QuizAnswer.js';
import StyleResult from '../models/StyleResult.js';
import { generateStyleProfile } from '../services/style-engine.js';
import { generateMoodboard } from '../services/moodboard.js';
import { v4 as uuidv4 } from 'uuid';

export async function submitQuiz(req, res) {
  try {
    const { preferredStyles, lifestyle, favoriteBrands, budget } = req.body;
    const userId = req.user._id;

    const quizAnswer = await QuizAnswer.create({
      userId,
      preferredStyles: preferredStyles || [],
      lifestyle,
      favoriteBrands: favoriteBrands || [],
      budget
    });

    const quizData = {
      preferredStyles: quizAnswer.preferredStyles,
      lifestyle: quizAnswer.lifestyle,
      favoriteBrands: quizAnswer.favoriteBrands,
      budget: quizAnswer.budget
    };

    const styleProfile = generateStyleProfile(quizData);
    const outfits = await generateMoodboard(styleProfile);

    const result = await StyleResult.create({
      userId,
      quizAnswerId: quizAnswer._id,
      styleProfile,
      outfits,
      shareToken: uuidv4().slice(0, 8)
    });

    res.status(201).json({
      resultId: result._id,
      styleProfile,
      outfits
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
