import React from 'react';
import { styled, alpha, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getListsAsync } from '../../../features/lists/listsSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  maxWidth: '90%',
  minHeight: '24px',
  padding: '6px 8px 2px 8px',
  cursor: 'pointer',
  fontSize: '14px',
  marginBottom: 8,
  wordWrap: 'break-word',
  lineHeight: '20px',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const Card = ({ list }) => {
  const { cards } = list || [];

  return cards
    ? cards.map((card) => <StyledBox key={card._id}>{card.title}</StyledBox>)
    : null;
};

export default Card;
