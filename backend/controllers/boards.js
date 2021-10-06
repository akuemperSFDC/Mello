import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Board from '../models/Board.js';

// @desc      Get all boards
// @route     GET /api/boards
// @access    Private
export const getBoards = asyncHandler(async (req, res, next) => {
  const boards = await Board.find();
  res.status(200).json({ success: true, count: boards.length, data: boards });
});

// @desc      Get single board
// @route     GET /api/boards/:id
// @access    Private
export const getBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: board });
});

// @desc      Create new board
// @route     POST /api/boards
// @access    Private
export const createBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.create(req.body);

  res.status(201).json({ success: true, data: board });
});

// @desc      Update board
// @route     PUT /api/boards/:id
// @access    Private
export const updateBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: board });
});

// @desc      Delete board
// @route     DELETE /api/boards/:id
// @access    Private
export const deleteBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findByIdAndDelete(req.params.id);

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
