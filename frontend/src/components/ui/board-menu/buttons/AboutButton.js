import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Typography, ButtonBase, Box } from '@mui/material';
import { Description } from '@mui/icons-material';
import { showAboutMenu } from '../../../../features/boardMenu/boardMenuSlice';

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
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

const AboutButton = () => {
  const dispatch = useDispatch();

  return (
    <StyledBox onClick={() => dispatch(showAboutMenu())}>
      <StyledButtonBase disableRipple>
        <Description sx={{ height: '22px', width: '22px', pt: 0.5 }} />
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>
            About this board
          </Typography>
          <Typography variant='subtitle2'>
            Add a description to your board
          </Typography>
        </Box>
      </StyledButtonBase>
    </StyledBox>
  );
};

export default AboutButton;
