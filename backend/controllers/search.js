import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Board from '../models/Board.js';
import List from '../models/List.js';
import Card from '../models/Card.js';

// @desc      Get boards search
// @route     POST /api/search/boards
// @access    Private
export const getBoardsSearch = asyncHandler(async (req, res, next) => {
  const { search } = req.body;
  const { _id } = req.user;

  const foundBoards = await Board.find({
    $or: [
      {
        $and: [{ user: _id }, { title: { $regex: search, $options: 'i' } }],
      },
      {
        $and: [
          { user: _id },
          { description: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  });

  res.status(200).json({ boards: foundBoards });
});

// @desc      Get lists search
// @route     GET /api/search/lists
// @access    Private
export const getListsSearch = asyncHandler(async (req, res, next) => {
  const { search } = req.body;

  const { _id } = req.user;

  const foundLists = await List.find({
    $or: [
      {
        $and: [{ user: _id }, { title: { $regex: search, $options: 'i' } }],
      },
      {
        $and: [
          { user: _id },
          { description: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  });

  res.status(200).json({ lists: foundLists });
});

// @desc      Get cards search
// @route     GET /api/search/cards
// @access    Private
export const getCardsSearch = asyncHandler(async (req, res, next) => {
  const { search } = req.body;
  const { _id } = req.user;

  const foundCards = await Card.find({
    $or: [
      {
        $and: [{ user: _id }, { title: { $regex: search, $options: 'i' } }],
      },
      {
        $and: [
          { user: _id },
          { description: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  });

  res.status(200).json({ cards: foundCards });
});
