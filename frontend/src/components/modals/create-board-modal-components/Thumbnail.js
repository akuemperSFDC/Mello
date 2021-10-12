import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Box, Paper } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: '28px',
  height: '28px',
  marginBottom: '6px',
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}));

const Thumbnail = ({ image, setSelected, i }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (i === 0) {
      setSelected(image.src);
    }
  }, [i, image.src, setSelected]);

  return (
    <StyledBox onClick={() => setSelected(image.src)}>
      <StyledPaper
        sx={{
          backgroundImage: `url(${image.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
    </StyledBox>
  );
};

export default Thumbnail;
