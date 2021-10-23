import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Card from '../models/Card.js';
import List from '../models/List.js';
import Activity from '../models/Activity.js';
import mongoose from 'mongoose';

/* ------------------------ Get all cards for a list ------------------------ */

// @desc      Get all cards for a list
// @route     GET /api/cards/list/:id
// @access    Private
export const getCards = asyncHandler(async (req, res, next) => {
  const cards = await Card.find({ list: req.params.id });

  res.status(200).json({ success: true, count: cards.length, data: cards });
});

/* ----------------------------- Get single card ---------------------------- */

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

/* ------------------------------- Create card ------------------------------ */

// @desc      Create new card
// @route     POST /api/cards/list/:id
// @access    Private
export const createCard = asyncHandler(async (req, res, next) => {
  // Add user ID and board ID to req.body
  req.body.user = req.user.id;
  req.body.list = req.params.id;

  const card = await Card.create(req.body);

  // Create new activity document based on creation of a new card
  const list = await List.findById(card.list).populate({
    path: 'cards',
    options: { sort: { index: 1 } },
    select: 'title description index user list',
  });

  await Activity.create({
    documentType: 'card',
    typeOfActivity: 'added',
    valueOfActivity: card.title,
    source: undefined,
    destination: list.title,
    user: req.user,
    card: card._id,
    list: card.list,
    board: list.board,
  });

  // Index the card
  card.index = list.cards.length;
  await card.save();

  res.status(200).json(card);
});

/* -------------------------------- Edit card ------------------------------- */

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

  // Create new activity document based on card changes
  const { title, description } = req.body;
  const list = await List.findById(card.list);

  await Activity.create({
    documentType: 'card',
    typeOfActivity:
      (title && 'renamed') ||
      (description && card.description ? 'changed' : 'added'),
    valueOfActivity: title || description,
    previousPropertyValue:
      (title && card.title) || (description && (card.description || '')),
    propertyChanged: (title && 'title') || (description && 'description'),
    source: card.title,
    user: req.user,
    card: req.params.id,
    list: card.list,
    board: list.board,
  });

  // Update card
  card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(card);
});

/* ------------------------------- Delete card ------------------------------ */

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

  // Create new activity document based on deletion of a card
  const list = await List.findById(card.list);

  await Activity.create({
    documentType: 'card',
    typeOfActivity: 'deleted',
    valueOfActivity: card.title,
    source: list.title,
    user: card.user,
    card: card._id,
    list: card.list,
    board: list.board,
  });

  console.log('list.cards', list.cards);

  await card.remove();

  // Re-Index cards
  const updatedList = await List.findById(list._id).populate({
    path: 'cards',
    options: { sort: { index: 1 } },
    select: 'title index',
  });

  for (let i in updatedList.cards) {
    updatedList.cards[i].index = Number(i) + 1;
    await updatedList.cards[i].save();
  }

  console.log('updatedList.cards', updatedList.cards);

  res
    .status(200)
    .json({
      cardId: req.params.id,
      listId: list._id,
      cards: updatedList.cards,
    });
});

/* -------------------------------- Move card ------------------------------- */

// @desc      Move card
// @route     PUT /api/cards/:id/move
// @access    Private
export const moveCard = asyncHandler(async (req, res, next) => {
  const { boardId, listId } = req.body;
  const card = await Card.findById(req.params.id);

  // Create new activity document based on moving card
  const oldList = await List.findById(card.list);
  const newList = await List.findById(listId);

  await Activity.create({
    documentType: 'card',
    typeOfActivity: 'moved',
    valueOfActivity: card.title,
    source: oldList.title,
    destination: newList.title,
    user: req.user,
    card: card._id,
    list: listId,
    board: newList.board,
  });

  // Move card
  card.list = listId;
  await card.save();

  // Make sure user is list owner
  if (card.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete card with id ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ card, oldList: oldList._id });
});

/* -------------------------------- Copy card ------------------------------- */

// @desc      Copy card
// @route     POST /api/cards/:id/copy
// @access    Private
export const copyCard = asyncHandler(async (req, res, next) => {
  const { boardId, listId } = req.body;

  const card = await Card.findById(req.params.id);

  // Make sure user is list owner
  if (card.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to copy card with id ${req.params.id}`,
        404
      )
    );
  }

  // Create new activity document based on copying card
  const oldList = await List.findById(card.list);
  const newList = await List.findById(listId);

  await Activity.create({
    documentType: 'card',
    typeOfActivity: 'copied',
    valueOfActivity: card.title,
    source: oldList.title,
    destination: newList.title,
    user: req.user,
    card: card._id,
    list: listId,
    board: newList.board,
  });

  // Create a new card associated to the board and list being copied to
  const newCard = new Card(card);
  newCard._id = mongoose.Types.ObjectId();
  newCard.list = listId;
  newCard.isNew = true;
  await newCard.save();

  res.status(200).json(newCard);
});

/* -------------------------------- Drag and drop card ------------------------------- */

// @desc      Update list(s) with new cards array card
// @route     PUT /api/cards/:id/draganddrop
// @access    Private
export const dragAndDropCard = asyncHandler(async (req, res, next) => {
  const { cards, sourceListId, destinationListId } = req.body;

  // Update all cards with new index and destination list id
  for (const card of cards) {
    const foundCard = await Card.findById(card._id);
    foundCard.index = card.index;
    foundCard.list = destinationListId;
    await foundCard.save();
  }

  // Create new activity document based on moving card
  const card = await Card.findById(req.params.id);

  const sourceList = await List.findById(sourceListId);
  const destinationList = await List.findById(destinationListId);

  if (destinationListId !== sourceListId) {
    await Activity.create({
      documentType: 'card',
      typeOfActivity: 'moved',
      valueOfActivity: card.title,
      source: sourceList.title,
      destination: destinationList.title,
      user: req.user,
      card: card._id,
      list: destinationList._id,
      board: destinationList.board,
    });
  }

  res.status(200).json({});
});
