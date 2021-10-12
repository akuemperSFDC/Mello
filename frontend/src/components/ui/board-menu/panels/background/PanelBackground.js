import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Divider } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../../Header';

const PanelBackground = ({ handleClose }) => {
  return (
    <Box>
      <Header
        title='Change background'
        backButton={true}
        handleClose={handleClose}
      />
      <Divider variant='middle' />
    </Box>
  );
};

export default PanelBackground;
