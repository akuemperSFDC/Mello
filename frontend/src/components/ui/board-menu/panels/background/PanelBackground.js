import { Box, ClickAwayListener, Divider, Slide } from '@mui/material';
import { images } from '../../../../modals/create-board-modal-components/data.js';
import Header from '../../Header';
import Thumbnail from './Thumbnail';

const PanelBackground = ({ handleClose }) => {
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Slide direction='left' in={true} mountOnEnter unmountOnExit>
          <Box>
            <Header
              title='Change background'
              backButton={true}
              handleClose={handleClose}
            />
            <Divider variant='middle' />
            <Box sx={{ height: '100%', overflow: 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  p: '6px 16px',
                  minHeight: 'min-content',
                  overflow: 'auto',
                }}
              >
                {images.map((img, i) => (
                  <Thumbnail key={i} img={img} />
                ))}
              </Box>
            </Box>
          </Box>
        </Slide>
      </ClickAwayListener>
    </>
  );
};

export default PanelBackground;
