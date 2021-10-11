import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  InputBase,
  styled,
  Typography,
  Fade,
  ClickAwayListener,
} from '@mui/material';

import ListHeader from './ListHeader.js';
import AddCardButton from './AddCardButton.js';
import Card from './Card.js';
import { getListsAsync } from '../../../features/lists/listsSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  minWidth: '270px',
  backgroundColor: theme.palette.list.main,
  minHeight: '68px',
  height: '100%',
  maxHeight: `calc(100vh - ${theme.mixins.denseToolbar.minHeight} - 70px)`,
  overflowY: 'auto',
  marginRight: 8,
  borderRadius: theme.shape.borderRadius,
  padding: '4px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  width: '100%',
  maxHeight: '28px',
  padding: 0,
  fontSize: '14px',
  lineHeight: '20px',
  wordSpacing: '0px',
  [`& .MuiInputBase-input`]: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}));

const List = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [showListInput, setShowListInput] = useState(false);
  const [title, setTitle] = useState('');

  const { currentLists } = useSelector((state) => state.lists) || [];

  const handleShowListInput = (e, i) => {
    if (Number(e.target.id) === i) {
      setShowListInput(true);
    }
  };

  useEffect(() => {
    dispatch(getListsAsync(id));
  }, [dispatch, id]);
  return currentLists.map((list, i) => (
    <StyledBox>
      <ListHeader list={list} i={i} />
      {/* <Card /> */}
      <AddCardButton />
    </StyledBox>
  ));
};

export default List;
