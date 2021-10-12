import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, styled } from '@mui/material';

import { editCardModal } from '../../features/modal/modalSlice';
import Header from './edit-card-modal-components/Header';
import Body from './edit-card-modal-components/Body';

const StyledBox = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '48px',
  width: '768px',
  height: '334px',
  backgroundColor: '#F4F5F7',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}));

const EditCardModal = () => {
  const dispatch = useDispatch();

  const { currentCard } = useSelector((state) => state.cards);
  const { editCard } = useSelector((state) => state.modals);

  const handleClose = () => {
    dispatch(editCardModal(false));
  };

  return (
    <Modal open={editCard} onClose={handleClose}>
      <StyledBox>
        <Header currentCard={currentCard} handleClose={handleClose} />
        <Body />
      </StyledBox>
    </Modal>
  );
};

export default EditCardModal;
