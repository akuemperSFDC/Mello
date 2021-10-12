import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, Close } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { showMainMenu } from '../../../features/boardMenu/boardMenuSlice';

const Header = ({ title, backButton = false, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        py: 0.75,
        alignItems: 'center',
      }}
    >
      <IconButton
        sx={{
          userSelect: !backButton && 'none',
          pointerEvents: !backButton && 'none',
          color: !backButton && 'transparent',
        }}
        onClick={() => dispatch(showMainMenu())}
      >
        <ChevronLeft />
      </IconButton>

      <Typography sx={{ fontWeight: 700, mr: 'auto', ml: 'auto' }}>
        {title}
      </Typography>
      <IconButton onClick={handleClose}>
        <Close />
      </IconButton>
    </Box>
  );
};

export default Header;
