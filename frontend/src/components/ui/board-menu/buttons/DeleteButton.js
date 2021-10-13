import { useDispatch, useSelector } from 'react-redux';
import { styled, Typography, ButtonBase, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deleteBoardAsync } from '../../../../features/boards/boardSlice';
import {
  menuVisible,
  showDeleteConfirm,
} from '../../../../features/boardMenu/boardMenuSlice';
import { deleteBoardModal } from '../../../../features/modal/modalSlice';

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

  return (
    <StyledBox onClick={() => dispatch(deleteBoardModal(true))}>
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
