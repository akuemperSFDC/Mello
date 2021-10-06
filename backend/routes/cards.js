import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getCards,
  getCard,
  createCard,
  editCard,
  deleteCard,
} from '../controllers/cards.js';

const router = express.Router();

router.get('/:id', protect, getCard);
router.put('/:id', protect, editCard);
router.delete('/:id', protect, deleteCard);
router.get('/list/:id', protect, getCards);
router.post('/list/:id', protect, createCard);

export default router;
