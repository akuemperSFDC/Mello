import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    common: {
      grey: '#F9FAFC',
      darkGrey: 'rgba(122, 131, 136, 0.8)',
      lightGrey: 'rgba(122, 131, 136, 0.61)',
    },
    primary: {
      main: '#236AA7',
      light: '#559EFE',
    },
    success: {
      main: '#5AAC45',
    },
    text: {
      link: '#4177D7',
    },
    action: {
      disabled: '#A8B1BD',
      disabledBackground: '#F4F5F7',
      10: 0.1,
      20: 0.2,
      30: 0.3,
      40: 0.4,
      50: 0.5,
      60: 0.6,
      70: 0.7,
      80: 0.8,
      90: 0.9,
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
      fontSize: '3.25rem',
    },
    button: {
      textTransform: 'none',
    },
    body2: {
      fontWeight: 700,
    },
    link: {
      color: '#3375D6',
      '& :visited': {
        color: 'inherit',
      },
      '& :hover': {
        textDecoration: 'underline',
      },
      fontSize: '.9rem',
      fontWeight: 300,
    },
    sidebarHeader: {
      fontSize: '.95rem',
      color: '#5E6C84',
      fontWeight: 500,
    },
    sidebar: {
      fontSize: '.9rem',
      fontWeight: 400,
      color: grey[700],
    },
  },
  mixins: {
    denseToolbar: {
      minHeight: '48px',
    },
  },
  components: {
    MuiMenuItem: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  durations: {
    shorter: '.1s',
    short: '.3s',
    medium: '.5s',
    long: '.8s',
    longer: '1.2s',
  },
});

export default theme;
