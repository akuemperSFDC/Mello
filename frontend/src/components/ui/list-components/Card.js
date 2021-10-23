import { Box, styled } from '@mui/material';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
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

const Card = ({ card, list }) => {
  const dispatch = useDispatch();

  const handleClick = (card) => {
    dispatch(editCardModal(true));
    dispatch(currentCard(card));
    dispatch(currentList(list));
  };

  return (
    <Draggable draggableId={card._id} index={card.index}>
      {(provided) => (
        <StyledBox
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => handleClick(card)}
        >
          {card.title}
        </StyledBox>
      )}
    </Draggable>
  );
};

export default Card;
