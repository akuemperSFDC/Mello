import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  viewBoard,
  getRecentBoards,
} from '../controllers/boards.js';
const router = express.Router();

router.route('/').get(protect, getBoards).post(protect, createBoard);
router.route('/recent').get(protect, getRecentBoards);
router
  .route('/:id')
  .get(protect, getBoard)
  .put(protect, updateBoard)
  .delete(protect, deleteBoard);
router.route('/:id/recent').put(protect, viewBoard);

export default router;
