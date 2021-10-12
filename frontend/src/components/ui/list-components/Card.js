import React from 'react';
import { styled, alpha, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { editCardModal } from '../../../features/modal/modalSlice.js';
import { currentCard } from '../../../features/cards/cardSlice.js';
import { currentList } from '../../../features/lists/listsSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  maxWidth: '100%',
  minHeight: '24px',
  padding: '6px 8px 2px 8px',
  cursor: 'pointer',
  fontSize: '14px',
  marginBottom: 8,
  marginLeft: 'auto',
  marginRight: 'auto',
  wordWrap: 'break-word',
  lineHeight: '20px',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const Card = ({ list }) => {
  const dispatch = useDispatch();

  const { cards } = list || [];

  const handleClick = (card) => {
    dispatch(editCardModal(true));
    dispatch(currentCard(card));
    dispatch(currentList(list));
  };

  return cards
    ? cards.map((card) => (
        <StyledBox onClick={() => handleClick(card)} key={card._id}>
          {card.title}
        </StyledBox>
      ))
    : null;
};

export default Card;
