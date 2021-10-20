import { Box } from '@mui/material';
import ActivityInformationParse from './ActivityInformationParse';

const ActivityInformation = (props) => {
  return (
    <Box ml={2} display='flex'>
      <ActivityInformationParse {...props} />
    </Box>
  );
};

export default ActivityInformation;
