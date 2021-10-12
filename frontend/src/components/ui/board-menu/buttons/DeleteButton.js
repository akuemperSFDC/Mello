import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Typography,
  ButtonBase,
  Box,
  Paper,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '6px',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.common.hoverDark,
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}));

const ChangeBackgroundButton = () => {
  const dispatch = useDispatch();

  const currentBoard = useSelector(
    (state) => state.boards.currentBoard && state.boards.currentBoard
  );

  const handleDelete = () => {
    // dispatch(deleteBoardAsync(currentBoard._id))
  };

  return (
    <StyledBox onClick={handleDelete}>
      <StyledButtonBase disableRipple>
        <Delete sx={{ height: '22px', width: '22px' }} />
        <Typography sx={{ fontWeight: 700, ml: 2 }} variant='subtitle2'>
          Delete board
        </Typography>
      </StyledButtonBase>
    </StyledBox>
  );
};

export default ChangeBackgroundButton;
