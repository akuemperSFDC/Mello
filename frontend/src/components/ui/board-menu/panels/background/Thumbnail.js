import { CheckCircle } from '@mui/icons-material';
import { ButtonBase, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBoardAsync } from '../../../../../features/boards/boardSlice';

const Thumbnail = ({ img }) => {
  const dispatch = useDispatch();

  const [backgroundImage, setBackgroundImage] = useState('');

  const { currentBoard } = useSelector(
    (state) => state.boards.currentBoard && state.boards
  );

  const handleClick = () => {
    setBackgroundImage(img.src);
  };

  useEffect(() => {
    if (backgroundImage) {
      dispatch(editBoardAsync({ id: currentBoard._id, backgroundImage }));
    }
  }, [dispatch, backgroundImage, currentBoard._id]);

  return (
    <ButtonBase
      disableRipple
      onClick={handleClick}
      sx={{ '&:hover': { opacity: 0.7 }, position: 'relative' }}
    >
      <Paper
        sx={{
          width: '138px',
          minHeight: '96px',
          backgroundImage: `url(${img.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'scroll',
          mb: '6px',
        }}
      />
      {currentBoard.backgroundImage === img.src && (
        <CheckCircle
          sx={{ position: 'absolute', bottom: 7, right: 3, color: 'white' }}
        />
      )}
    </ButtonBase>
  );
};

export default Thumbnail;
