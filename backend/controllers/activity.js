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
    })
    .limit(20);

  const lastItem = activities[activities.length - 1].createdAt;

  res.status(200).json({ activities, lastItem });
});

/* ---------------------- Get next batch of activities ---------------------- */

// @desc      Get all next batch of activities for board
// @route     GET /api/activities/:boardId/next/?prevItem=createdAt
// @access    Private
export const getNextBatchActivitiesForBoard = asyncHandler(
  async (req, res, next) => {
    const { prevItem, count } = req.query;

    // Total number of documents for specific board
    const totalActivitiesForBoard = await Activity.countDocuments({
      board: req.params.boardId,
    });

    // Return last item fetched true if number of docs is equal to total backend docs
    if (Number(count) === Number(totalActivitiesForBoard)) {
      return res.status(200).json({ activities: [], lastItemFetched: true });
    }

    const activities = await Activity.find({
      board: req.params.boardId,
      createdAt: { $lt: prevItem },
    })
      .populate({ path: 'user', select: 'firstName -_id' })
      .sort({
        createdAt: -1,
      })
      .limit(20);

    const lastItem = activities[activities.length - 1].createdAt;

    res.status(200).json({ activities, lastItem });
  }
);

/* ----------------------------- Get all activities for user ----------------------------- */

// @desc      Get all activities for user
// @route     GET /api/activities/user
// @access    Private
export const getActivitiesForUser = asyncHandler(async (req, res, next) => {
  const activities = await Activity.find({ user: req.user._id })
    .populate({ path: 'user', select: 'firstName -_id' })
    .populate({ path: 'board', select: 'title -_id' })
    .sort({
      createdAt: -1,
    });
  // .limit(20);

  const lastItem = activities[activities.length - 1].createdAt;

  res.status(200).json({ activities, lastItem });
});
