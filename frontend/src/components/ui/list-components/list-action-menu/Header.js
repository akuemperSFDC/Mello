import { Close, KeyboardArrowLeft } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showMainMenu } from '../../../../features/listMenu/listMenuSlice';

const Header = ({ title, backButton = true, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        padding: '8px',
      }}
    >
      <IconButton
        onClick={() => dispatch(showMainMenu())}
        sx={{
          color: backButton ? 'inherit' : 'transparent',
          pointerEvents: backButton ? undefined : 'none',
          width: '25px',
          height: '25px',
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography
        sx={{ fontSize: '14px', userSelect: 'none', fontWeight: 600 }}
      >
        {title}
      </Typography>
      <IconButton onClick={handleClose} sx={{ width: '25px', height: '25px' }}>
        <Close sx={{ fontSize: '20px' }} />
      </IconButton>
    </Box>
  );
};

export default Header;
