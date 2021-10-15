import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, Box, Typography, Divider } from '@mui/material';
import Header from './Header';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '8px',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  padding: '8px 16px 8px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.common.hoverDark,
  },
}));

const PanelMoveList = ({ handleDelete, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: '280px' }}>
      <Header
        title='List actions'
        backButton={true}
        handleClose={handleClose}
      />
      <Divider sx={{ mx: 2 }} />
      <StyledBox>Copy</StyledBox>
    </Box>
  );
};

export default PanelMoveList;
