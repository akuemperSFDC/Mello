import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Activity from '../models/Activity.js';

/* ----------------------------- Get all activities for board ----------------------------- */

// @desc      Get all activities for board
// @route     GET /api/activities/:boardId
// @access    Private
export const getActivitiesForBoard = asyncHandler(async (req, res, next) => {
  const activities = await Activity.find({ board: req.params.boardId })
    .populate({ path: 'user', select: 'firstName -_id' })
    .sort({
      createdAt: -1,
    });

  res.status(200).json(activities);
});
