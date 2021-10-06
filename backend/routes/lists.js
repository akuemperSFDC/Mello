import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getLists,
  getList,
  createList,
  editList,
  deleteList,
} from '../controllers/lists.js';

const router = express.Router();

router.get('/:id', protect, getList);
router.put('/:id', protect, editList);
router.delete('/:id', protect, deleteList);
router.get('/board/:id', protect, getLists);
router.post('/board/:id', protect, createList);

export default router;
