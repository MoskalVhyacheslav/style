import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { submitQuiz } from '../controllers/quizController.js';

const router = Router();
router.post('/submit', authMiddleware, submitQuiz);

export default router;
