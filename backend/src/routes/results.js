import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getResults, getResultsByShareToken, saveResults } from '../controllers/resultsController.js';

const router = Router();
router.get('/share/:token', getResultsByShareToken);
router.get('/', authMiddleware, getResults);
router.post('/save', authMiddleware, saveResults);

export default router;
