import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Divider } from '@mui/material';
import Header from './Header';
import { Box } from '@mui/system';

const PanelAbout = ({ handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Box>
      <Header
        title='About this board'
        backButton={true}
        handleClose={handleClose}
      />
      <Divider variant='middle' />
    </Box>
  );
};

export default PanelAbout;
