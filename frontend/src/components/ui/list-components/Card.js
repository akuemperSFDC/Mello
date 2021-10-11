import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListsAsync } from '../../../features/lists/listsSlice.js';

const Card = ({ list }) => {
  return list && list.cards.map((card) => <div>{card.title}</div>);
};

export default Card;
