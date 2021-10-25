import { Box, Paper, styled } from '@mui/material';
import { useEffect } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: theme.breakpoints.down('sm') ? '32%' : '28px',
  height: theme.breakpoints.down('sm') ? '33%' : '28px',
  marginBottom: '6px',
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}));

const Thumbnail = ({ image, setSelected, i }) => {
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
