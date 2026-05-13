import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  addMoodEntry,
  getMoodHistory,
  getMoodStats,
} from '../controllers/moodController';

const router = Router();

router.use(authenticate);

router.post('/', addMoodEntry);
router.get('/history', getMoodHistory);
router.get('/stats', getMoodStats);

export default router;
