import { Typography, useTheme } from '@mui/material';
import Moment from 'react-moment';

const DateFormatter = ({ createdAt }) => {
  const theme = useTheme();

  const past24Hours = () => {
    const now = new Date(Date.now());
    const created = new Date(createdAt);
    let diffTime = Math.abs(now - created);
    diffTime = diffTime / (1000 * 60 * 60);
    return diffTime;
  };

  return (
    <Typography
      component={'div'}
      sx={{
        fontSize: '12px',
        fontFamily: 'Varela Round sans-serif',
        color: theme.palette.grey[600],
      }}
    >
      {past24Hours(createdAt) >= 24 ? (
        <Moment format='MMM D [at] h:mm A'>{new Date(createdAt)}</Moment>
      ) : (
        <Moment fromNow>{createdAt}</Moment>
      )}
    </Typography>
  );
};

export default DateFormatter;
