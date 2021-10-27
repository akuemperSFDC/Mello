import { Typography } from '@mui/material';
import Moment from 'react-moment';

const DateFormatter = ({ createdAt, board, createdBoardFlag }) => {
  const past24Hours = () => {
    const now = new Date(Date.now());
    const created = new Date(createdAt);
    let diffTime = Math.abs(now - created);
    diffTime = diffTime / (1000 * 60 * 60);
    return diffTime;
  };

  return (
    <Typography
      sx={{
        lineHeight: '20px',
        fontSize: '12px',
        color: '#5E6C84',
        fontFamily: 'Varela Round sans-serif',
      }}
    >
      {past24Hours(createdAt) >= 24 ? (
        <Moment format='MMM D [at] h:mm A'>{new Date(createdAt)}</Moment>
      ) : (
        <Moment fromNow>{createdAt}</Moment>
      )}
      {!createdBoardFlag && (
        <span>
          {' - '}on board{' '}
          <span style={{ fontWeight: 700, textDecoration: 'underline' }}>
            {board.title}
          </span>
        </span>
      )}
    </Typography>
  );
};

export default DateFormatter;
