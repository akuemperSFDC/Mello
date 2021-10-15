import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import List from '../models/List.js';
import Card from '../models/Card.js';
import mongoose from 'mongoose';

// @desc      Get all lists for board
// @route     GET /api/lists/board/:id
// @access    Private
export const getLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({ board: req.params.id }).populate({
    path: 'cards',
    options: { sort: { index: 1 } },
    select: 'title description index -list',
  });

  res.status(200).json(lists);
});

// @desc      Get single list
// @route     GET /api/lists/:id
// @access    Private
export const getList = asyncHandler(async (req, res, next) => {
  const list = await List.findById(req.params.id).populate({
    path: 'cards',
    select: 'title description -list',
  });

  if (!list) {
    return next(
      new ErrorResponse(`List with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json(list);
});

// @desc      Create new list
// @route     POST /api/lists/board/:id
// @access    Private
export const createList = asyncHandler(async (req, res, next) => {
  // Add user ID and board ID to req.body
  req.body.user = req.user.id;
  req.body.board = req.params.id;

  const list = await List.create(req.body);

  res.status(200).json(list);
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

  res.status(200).json(list);
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

  res.status(200).json({ _id: req.params.id });
});

// @desc      Move list
// @route     PUT /api/lists/:id/move
// @access    Private
export const moveList = asyncHandler(async (req, res, next) => {
  const { boardId } = req.body;

  let list = await List.findOneAndUpdate(
    { _id: req.params.id },
    { board: boardId }
  );

  // Make sure user is list owner
  if (list.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to move list with id ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json(list);
});

// @desc      Copy list
// @route     POST /api/lists/:id/copy
// @access    Private
export const copyList = asyncHandler(async (req, res, next) => {
  const { boardId, title, cards } = req.body;

  const list = await List.findById(req.params.id);

  // Make sure user is list owner
  if (list.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to move list with id ${req.params.id}`,
        404
      )
    );
  }

  // Create a new list associated to the board being copied to
  const newList = new List(list);
  newList._id = mongoose.Types.ObjectId();
  newList.title = title;
  newList.board = boardId;
  newList.isNew = true;
  await newList.save();

  // Create a new set of cards associated to the new list created above
  for (const card of cards) {
    const newCard = new Card(card);
    newCard._id = mongoose.Types.ObjectId();
    newCard.index = card.index;
    newCard.list = newList._id;
    newCard.user = req.user._id;
    newCard.isNew = true;
    await newCard.save();
  }

  res.status(200).json(newList);
});
