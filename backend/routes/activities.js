import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getActivitiesForBoard,
  getNextBatchActivitiesForBoard,
} from '../controllers/activity.js';
const router = express.Router();

router.route('/:boardId').get(protect, getActivitiesForBoard);
router.route('/:boardId/next').get(protect, getNextBatchActivitiesForBoard);

export default router;
