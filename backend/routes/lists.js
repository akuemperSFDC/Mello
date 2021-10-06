import express from 'express';
import { protect } from '../middleware/auth.js';
import { getLists } from '../controllers/lists.js';

const router = express.Router();

router.get('/:id', protect, getLists);

export default router;
