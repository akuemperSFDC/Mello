import { Box, Divider } from '@mui/material';
import Header from '../../Header';

const PanelBackground = ({ handleClose }) => {
  return (
    <Box>
      <Header
        title='Change background'
        backButton={true}
        handleClose={handleClose}
      />
      <Divider variant='middle' />
    </Box>
  );
};

export default PanelBackground;
