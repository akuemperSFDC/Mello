import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Activity from '../models/Activity.js';

/* ----------------------------- Get all boards ----------------------------- */

// @desc      Get all activities for board
// @route     GET /api/boards
// @access    Private
export const getActivitiesForBoard = asyncHandler(async (req, res, next) => {
  const activities = await Activity.find({ user: req.user.id });

  res.status(200).json(userBoards);
});
