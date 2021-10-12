import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Box,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { ArrowForward, ContentCopy, Delete } from '@mui/icons-material';
import { deleteCardAsync } from '../../../features/lists/listsSlice';
import { deleteCurrentCard } from '../../../features/cards/cardSlice';
import { editCardModal } from '../../../features/modal/modalSlice';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: '#EAECF0',
  fontSize: '14px',
  marginBottom: '8px',
  borderRadius: theme.shape.borderRadius,
  minWidth: '168px',
  padding: '6px 12px',
  '&:hover': {
    backgroundColor: alpha('#EAECF0', theme.palette.action[50]),
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  marginLeft: '8px',
}));

const SideMenu = () => {
  const dispatch = useDispatch();

  const { currentCard } = useSelector((state) => state.cards && state.cards);

  const handleDelete = () => {
    dispatch(deleteCardAsync({ id: currentCard._id }));
    dispatch(deleteCurrentCard());
    dispatch(editCardModal(false));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List sx={{ pt: 0 }}>
        <Typography
          sx={{
            mb: 0.8,
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          ACTIONS
        </Typography>

        {/* Move */}
        <StyledListItemButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowForward sx={{ fontSize: '14px' }} />
            <StyledTypography>Move</StyledTypography>
          </Box>
        </StyledListItemButton>

        {/* Copy */}
        <StyledListItemButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentCopy sx={{ fontSize: '14px' }} />

            <StyledTypography>Copy</StyledTypography>
          </Box>
        </StyledListItemButton>

        {/* Delete */}
        <StyledListItemButton onClick={handleDelete}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Delete sx={{ fontSize: '14px' }} />
            <StyledTypography>Delete</StyledTypography>
          </Box>
        </StyledListItemButton>
      </List>
    </Box>
  );
};

export default SideMenu;