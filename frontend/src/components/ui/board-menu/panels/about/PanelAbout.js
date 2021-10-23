import { ClickAwayListener, Divider, Slide } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../../Header';
import BoardOwner from './BoardOwner';
import DescriptionSection from './DescriptionSection';

const PanelAbout = ({ handleClose }) => {
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Slide direction='left' in={true} mountOnEnter unmountOnExit>
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
        </Slide>
      </ClickAwayListener>
    </>
  );
};

export default PanelAbout;
