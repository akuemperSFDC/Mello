import { useDispatch, useSelector } from 'react-redux';
import { Box, styled, Modal, Typography, Button } from '@mui/material';
import { menuVisible } from '../../features/boardMenu/boardMenuSlice';
import { deleteBoardAsync } from '../../features/boards/boardSlice';
import { deleteBoardModal } from '../../features/modal/modalSlice';

const StyledBox = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '200px',
  width: '325px',
  height: '150px',
  backgroundColor: '#F4F5F7',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  jusitfyContent: 'center',
}));

const DeleteBoardConfirmation = () => {
  const dispatch = useDispatch();

  const { deleteBoard } = useSelector((state) => state.modals);
  const currentBoard = useSelector(
    (state) => state.boards.currentBoard && state.boards.currentBoard
  );

  const handleClose = () => {
    dispatch(deleteBoardModal(false));
  };

  const handleDelete = () => {
    dispatch(deleteBoardModal(false));
    dispatch(deleteBoardAsync(currentBoard._id));
    dispatch(menuVisible(false));
  };

  return (
    <Modal open={deleteBoard} onClose={handleClose}>
      <StyledBox>
        <Typography
          align='center'
          sx={{ fontSize: '1rem', mb: 0.5, fontWeight: 500 }}
        >
          Are you sure you want to delete this board?
        </Typography>
        <Typography
          align='center'
          sx={{
            fontWeight: 600,
            fontSize: '.9rem',
            textDecoration: 'underline',
          }}
        >
          This cannot be undone
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4,
            mb: 1,
          }}
        >
          <Button
            variant='contained'
            color='error'
            sx={{ width: '80%', mb: 0.25 }}
            onClick={handleDelete}
          >
            Permanently Delete
          </Button>
          <Button sx={{ width: '80%' }} onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default DeleteBoardConfirmation;
