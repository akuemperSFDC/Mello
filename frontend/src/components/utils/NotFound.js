import { Grid } from '@mui/material';
import notFound from '../../img/notFound.svg';

const NotFound = () => {
  return (
    <Grid
      container
      justifyContent='center'
      sx={{ width: '100vw', height: '100vh' }}
    >
      <Grid item sx={{ mt: 10 }}>
        <img
          src={notFound}
          alt='page-not-found'
          style={{ width: '50vw', height: '50vh' }}
        />
      </Grid>
    </Grid>
  );
};

export default NotFound;
