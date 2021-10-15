import { Box, styled } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { currentCard } from '../../../features/cards/cardSlice.js';
import { currentList } from '../../../features/lists/listsSlice.js';
import { editCardModal } from '../../../features/modal/modalSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  maxWidth: '100%',
  minHeight: '24px',
  padding: '6px 8px 2px 8px',
  cursor: 'pointer',
  fontSize: '14px',
  marginBottom: 4,
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

  const cardsSorted = [...cards];
  cardsSorted.sort((a, b) => a.index - b.index);

  const handleClick = (card) => {
    dispatch(editCardModal(true));
    dispatch(currentCard(card));
    dispatch(currentList(list));
  };

  return (
    <>
      {cardsSorted &&
        cardsSorted.map((card) => (
          <StyledBox onClick={() => handleClick(card)} key={card._id}>
            {card.title}
          </StyledBox>
        ))}
    </>
  );
};

export default Card;
