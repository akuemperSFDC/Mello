import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getCards,
  getCard,
  createCard,
  editCard,
  deleteCard,
  moveCard,
  copyCard,
  dragAndDropCard,
} from '../controllers/cards.js';

const router = express.Router();

router.put('/:id/draganddrop', protect, dragAndDropCard);
router.get('/:id', protect, getCard);
router.put('/:id', protect, editCard);
router.delete('/:id', protect, deleteCard);
router.get('/list/:id', protect, getCards);
router.post('/list/:id', protect, createCard);
router.put('/:id/move', protect, moveCard);
router.post('/:id/copy', protect, copyCard);

export default router;
