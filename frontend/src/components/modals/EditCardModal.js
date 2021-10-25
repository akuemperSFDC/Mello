import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, styled, useTheme, useMediaQuery } from '@mui/material';

import { editCardModal } from '../../features/modal/modalSlice';
import Header from './edit-card-modal-components/Header';
import Body from './edit-card-modal-components/Body';

const StyledBox = styled(Box)(({ theme, matches }) => ({
  marginLeft: matches ? 0 : 'auto',
  marginRight: matches ? 0 : 'auto',
  marginTop: '48px',
  width: matches ? '100%' : '768px',
  maxWidth: matches && '100%',
  height: matches ? 'auto' : '334px',
  backgroundColor: '#F4F5F7',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}));

const EditCardModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const { currentCard } = useSelector((state) => state.cards);
  const { editCard } = useSelector((state) => state.modals);

  const handleClose = () => {
    dispatch(editCardModal(false));
  };

  return (
    <Modal sx={{ width: '100%' }} open={editCard} onClose={handleClose}>
      <StyledBox matches={matches}>
        <Header currentCard={currentCard} handleClose={handleClose} />
        <Body />
      </StyledBox>
    </Modal>
  );
};

export default EditCardModal;
