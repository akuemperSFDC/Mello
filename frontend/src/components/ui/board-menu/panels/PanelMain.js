import { Divider, List } from '@mui/material';
import { Box } from '@mui/system';
import AboutButton from '../buttons/AboutButton';
import ChangeBackgroundButton from '../buttons/ChangeBackgroundButton';
import DeleteButton from '../buttons/DeleteButton';
import Header from '../Header';
import ActivitySection from './ActivitySection';

const listStyles = {
  p: '12px 6px 12px 12px',
};

const PanelMain = ({ handleClose }) => {
  return (
    <Box sx={{ overflow: 'auto', height: '100%', mb: 6 }}>
      <Header title='Menu' handleClose={handleClose} />
      <Divider variant='middle' />

      {/* ----------------------------- About button ----------------------------- */}
      <List sx={{ ...listStyles }}>
        <AboutButton />
        <ChangeBackgroundButton />
      </List>
      <Divider variant='middle' />

      {/* --------------------------- Background button -------------------------- */}
      <List sx={{ ...listStyles }}>
        <DeleteButton />
      </List>
      <Divider variant='middle' />

      {/* --------------------------- Activity section --------------------------- */}
      <List sx={{ ...listStyles }}>
        <ActivitySection />
      </List>
    </Box>
  );
};

export default PanelMain;
