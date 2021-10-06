import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import List from '../models/List.js';

// @desc      Get all lists for board
// @route     GET /api/lists/board/:id
// @access    Private
export const getLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({ board: req.params.id });

  res.status(200).json({ success: true, count: lists.length, data: lists });
});

// @desc      Get single list
// @route     GET /api/lists/:id
// @access    Private
export const getList = asyncHandler(async (req, res, next) => {
  const list = await List.findById(req.params.id).populate('cards');

  if (!list) {
    return next(
      new ErrorResponse(`List with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: list });
});

// @desc      Create new list
// @route     POST /api/lists/board/:id
// @access    Private
export const createList = asyncHandler(async (req, res, next) => {
  // Add user ID and board ID to req.body
  req.body.user = req.user.id;
  req.body.board = req.params.id;

  const list = await List.create(req.body);

  res.status(200).json({ success: true, data: list });
});

// @desc      Edit list
// @route     PUT /api/lists/:id
// @access    Private
export const editList = asyncHandler(async (req, res, next) => {
  let list = await List.findById(req.params.id);

  // Make sure user is list owner
  if (list.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to edit list with id ${req.params.id}`,
        404
      )
    );
  }

  list = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: list });
});

// @desc      Delete list
// @route     DELETE /api/lists/:id
// @access    Private
export const deleteList = asyncHandler(async (req, res, next) => {
  let list = await List.findById(req.params.id);

  // Make sure user is list owner
  if (list.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete list with id ${req.params.id}`,
        404
      )
    );
  }

  await List.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});
