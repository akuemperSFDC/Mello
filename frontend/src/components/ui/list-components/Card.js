import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListsAsync } from '../../../features/lists/listsSlice.js';

const Card = ({ list }) => {
  const { cards } = list || [];

  return cards
    ? cards.map((card) => <div key={card._id}>{card.title}Card</div>)
    : null;
};

export default Card;
