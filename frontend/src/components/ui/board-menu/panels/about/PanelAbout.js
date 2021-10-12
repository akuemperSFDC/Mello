import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Divider, List } from '@mui/material';
import Header from '../../Header';
import { Box } from '@mui/system';

import BoardOwner from './BoardOwner';
import DescriptionSection from './DescriptionSection';

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
      <BoardOwner />
      <DescriptionSection />
    </Box>
  );
};

export default PanelAbout;
