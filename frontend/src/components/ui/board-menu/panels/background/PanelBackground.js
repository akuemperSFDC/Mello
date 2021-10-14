import { Box, ButtonBase, Divider, Paper } from '@mui/material';
import Header from '../../Header';

import { images } from '../../../../modals/create-board-modal-components/data.js';
import Thumbnail from './Thumbnail';

const PanelBackground = ({ handleClose }) => {
  return (
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
          {images.map((img) => (
            <Thumbnail img={img} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PanelBackground;
