import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  InputBase,
  ClickAwayListener,
  useTheme,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { editCardAsync } from '../../../features/lists/listsSlice';

const DescriptionInput = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');

  const { currentCard } = useSelector((state) => state.cards && state.cards);

  const handleShow = () => {
    setShow(true);
  };

  const handleSave = () => {
    dispatch(editCardAsync({ id: currentCard._id, description }));
    setShow(false);
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      dispatch(editCardAsync({ id: currentCard._id, description }));
      setShow(false);
    }
  };

  useEffect(() => {
    if (currentCard) {
      setDescription(currentCard.description || '');
    }
  }, [currentCard]);

  return show ? (
    <ClickAwayListener onClickAway={() => setShow(false)}>
      <Box>
        <InputBase
          sx={{
            backgroundColor: '#EAECF0',
            width: '100%',
            fontSize: '14px',
            py: '6px',
            px: 1,
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: '4px',
            '& .MuiInputBase-input': {
              padding: 0,
            },
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Add a more detailed description...'
          multiline={true}
          minRows={5}
          maxRows={5}
          onKeyDown={handleEnterKey}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <Button
            variant='contained'
            size='small'
            sx={{ minWidth: '40px', maxWidth: '50px', mr: 1 }}
            onClick={handleSave}
          >
            Save
          </Button>
          <IconButton
            sx={{ width: '30px', height: '30px' }}
            onClick={() => setShow(false)}
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
    </ClickAwayListener>
  ) : (
    <InputBase
      sx={{
        backgroundColor: '#EAECF0',
        width: '100%',
        fontSize: '14px',
        py: '6px',
        px: 1,
        border: `3px solid transparent`,
        borderRadius: '4px',
        '& .MuiInputBase-input': {
          padding: 0,
          '&::placeholder': {
            opacity: 1,
          },
        },
      }}
      disabled
      placeholder={
        description ? description : 'Add a more detailed description...'
      }
      multiline={true}
      minRows={2}
      maxRows={5}
      onClick={handleShow}
    />
  );
};

export default DescriptionInput;
