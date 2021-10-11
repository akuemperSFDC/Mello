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

const List = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentLists =
    useSelector((state) => Object.values(state.lists.currentLists)) || [];

  useEffect(() => {
    dispatch(getListsAsync(id));
  }, [dispatch, id]);
  return currentLists.map((list, i) => (
    <StyledBox>
      <ListHeader list={list} i={i} />
      <Card list={list} />
      <AddCardButton list={list} />
    </StyledBox>
  ));
};

export default List;
