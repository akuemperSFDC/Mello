import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Card from '../models/Card.js';

// @desc      Get all cards for a list
// @route     GET /api/cards/list/:id
// @access    Private
export const getCards = asyncHandler(async (req, res, next) => {
  const cards = await Card.find({ list: req.params.id });

  res.status(200).json({ success: true, count: cards.length, data: cards });
});

// @desc      Get single card
// @route     GET /api/cards/:id
// @access    Private
export const getCard = asyncHandler(async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    return next(
      new ErrorResponse(`Card with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: card });
});

// @desc      Create new list
// @route     POST /api/cards/list/:id
// @access    Private
export const createCard = asyncHandler(async (req, res, next) => {
  // Add user ID and board ID to req.body
  req.body.user = req.user.id;
  req.body.list = req.params.id;

  const card = await Card.create(req.body);

  res.status(200).json({ success: true, data: card });
});

// @desc      Edit card
// @route     PUT /api/cards/:id
// @access    Private
export const editCard = asyncHandler(async (req, res, next) => {
  let card = await Card.findById(req.params.id);

  // Make sure user is list owner
  if (card.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to edit card with id ${req.params.id}`,
        404
      )
    );
  }

  card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: card });
});

// @desc      Delete card
// @route     DELETE /api/cards/:id
// @access    Private
export const deleteCard = asyncHandler(async (req, res, next) => {
  let card = await Card.findById(req.params.id);

  // Make sure user is list owner
  if (card.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete card with id ${req.params.id}`,
        404
      )
    );
  }

  await Card.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});