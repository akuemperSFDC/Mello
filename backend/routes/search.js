import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getBoardsSearch,
  getListsSearch,
  getCardsSearch,
} from '../controllers/search.js';

const router = express.Router();

router.post('/boards', protect, getBoardsSearch);
router.post('/lists', protect, getListsSearch);
router.post('/cards', protect, getCardsSearch);

export default router;
