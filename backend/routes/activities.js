import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getActivitiesForBoard,
  getNextBatchActivitiesForBoard,
  getActivitiesForUser,
} from '../controllers/activity.js';
const router = express.Router();

router.route('/user').get(protect, getActivitiesForUser);
router.route('/:boardId').get(protect, getActivitiesForBoard);
router.route('/:boardId/next').get(protect, getNextBatchActivitiesForBoard);

export default router;
