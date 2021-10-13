import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../../Header';
import BoardOwner from './BoardOwner';
import DescriptionSection from './DescriptionSection';

const PanelAbout = ({ handleClose }) => {
  return (
    <Box>
      <Header
        title='About this board'
        backButton={true}
        handleClose={handleClose}
      />
      <Divider variant='middle' />
      <BoardOwner />
      <DescriptionSection />
    </Box>
  );
};

export default PanelAbout;
