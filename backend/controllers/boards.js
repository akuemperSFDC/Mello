import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Board from '../models/Board.js';

// @desc      Get all boards for user
// @route     GET /api/boards
// @access    Private
export const getBoards = asyncHandler(async (req, res, next) => {
  const userBoards = await Board.find({ user: req.user.id });

  res.status(200).json(userBoards);
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

  res.status(200).json(board);
});

// @desc      Create new board
// @route     POST /api/boards
// @access    Private
export const createBoard = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check for
  const board = await Board.create(req.body);

  res.status(201).json(board);
});

// @desc      Update board
// @route     PUT /api/boards/:id
// @access    Private
export const updateBoard = asyncHandler(async (req, res, next) => {
  let board = await Board.findById(req.params.id);

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  // Make sure user is board owner
  if (board.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to edit board with id ${req.params.id}`,
        404
      )
    );
  }

  board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(board);
});

// @desc      Delete board
// @route     DELETE /api/boards/:id
// @access    Private
export const deleteBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  // Make sure user is board owner
  if (board.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to edit board with id ${req.params.id}`,
        404
      )
    );
  }

  board.remove();

  res.status(200).json({});
});
