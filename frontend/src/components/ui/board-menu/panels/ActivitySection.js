import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Box,
  ButtonBase,
  Typography,
  Avatar,
} from '@mui/material';
import { Storage } from '@mui/icons-material';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px',
  fontWeight: 500,
  fontSize: '1rem',
  width: '100%',
}));

const iconStyles = {
  width: '22px',
  height: '22px',
};

const ActivitySection = () => {
  const dispatch = useDispatch();

  return (
    <>
      {/* -------------------------------- Header -------------------------------- */}
      <StyledBox>
        <Storage sx={{ ...iconStyles }} />
        <Typography sx={{ fontWeight: 700, ml: 2 }} variant='subtitle2'>
          Activity
        </Typography>
      </StyledBox>

      {/* --------------------------------- Items -------------------------------- */}
      <Box mt={1}>
        <Avatar sx={{ height: '32px', width: '32px' }} />
      </Box>
    </>
  );
};

export default ActivitySection;
