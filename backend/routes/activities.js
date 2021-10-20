import express from 'express';
import { protect } from '../middleware/auth.js';
import { getActivitiesForBoard } from '../controllers/activity.js';
const router = express.Router();

router.route('/:boardId').get(protect, getActivitiesForBoard);

export default router;
