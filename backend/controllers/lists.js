import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import List from '../models/List.js';

// @desc      Get all lists for board
// @route     GET /api/lists/:id
// @access    Private
export const getLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({ board: req.params.id });

  res.status(200).json({ success: true, count: lists.length, data: lists });
});
