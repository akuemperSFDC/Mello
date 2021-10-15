import { styled, Box, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  showCopyListMenu,
  showMoveListMenu,
} from '../../../../features/listMenu/listMenuSlice';
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

const PanelMain = ({ handleDelete, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: '280px' }}>
      <Header
        title='List actions'
        backButton={false}
        handleClose={handleClose}
      />
      <Divider sx={{ mx: 2 }} />
      <StyledBox sx={{ flexDirection: 'column', p: 0 }}>
        <StyledTypography sx={{ mt: 0.5 }}>Add card...</StyledTypography>
        <StyledTypography onClick={() => dispatch(showCopyListMenu())}>
          Copy list...
        </StyledTypography>
        <StyledTypography
          onClick={() => dispatch(showMoveListMenu())}
          sx={{ mb: 0.5 }}
        >
          Move list...
        </StyledTypography>
      </StyledBox>
      <Divider sx={{ mx: 2 }} />
      <StyledBox sx={{ flexDirection: 'column', p: 0 }} onClick={handleDelete}>
        <StyledTypography sx={{ my: 0.5 }}>Delete list</StyledTypography>
      </StyledBox>
    </Box>
  );
};

export default PanelMain;
