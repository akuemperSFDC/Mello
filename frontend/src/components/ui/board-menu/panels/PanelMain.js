import { Divider, List } from '@mui/material';
import { Box } from '@mui/system';
import AboutButton from '../buttons/AboutButton';
import ChangeBackgroundButton from '../buttons/ChangeBackgroundButton';
import DeleteButton from '../buttons/DeleteButton';
import Header from '../Header';

const PanelMain = ({ handleClose }) => {
  return (
    <Box>
      <Header title='Menu' handleClose={handleClose} />
      <Divider variant='middle' />
      <List sx={{ p: '12px 6px 12px 12px' }}>
        <AboutButton />
        <ChangeBackgroundButton />
      </List>
      <Divider variant='middle' />
      <List sx={{ p: '12px 6px 12px 12px' }}>
        <DeleteButton />
      </List>
    </Box>
  );
};

export default PanelMain;
