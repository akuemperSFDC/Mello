import { Close } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

const CardActionsHeader = ({ children, handleClose }) => {
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
        sx={{
          color: 'transparent',
          pointerEvents: 'none',
          width: '25px',
          height: '25px',
        }}
      >
        <Close />
      </IconButton>
      <Typography
        sx={{ fontSize: '14px', userSelect: 'none', fontWeight: 600 }}
      >
        {children}
      </Typography>
      <IconButton onClick={handleClose} sx={{ width: '25px', height: '25px' }}>
        <Close sx={{ fontSize: '20px' }} />
      </IconButton>
    </Box>
  );
};

export default CardActionsHeader;
