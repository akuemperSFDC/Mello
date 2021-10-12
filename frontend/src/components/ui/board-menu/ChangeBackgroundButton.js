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
import { Description } from '@mui/icons-material';
import { showBackgroundMenu } from '../../../features/boardMenu/boardMenuSlice';

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

  return (
    <StyledBox onClick={() => dispatch(showBackgroundMenu())}>
      <StyledButtonBase disableRipple>
        <Paper
          sx={{
            width: '20px',
            height: '20px',
            backgroundImage: `url(${currentBoard?.backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <Typography sx={{ fontWeight: 700, ml: 2 }} variant='subtitle2'>
          Change background
        </Typography>
      </StyledButtonBase>
    </StyledBox>
  );
};

export default ChangeBackgroundButton;
