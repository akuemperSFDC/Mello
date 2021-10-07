import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    common: {
      grey: '#F9FAFC',
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
  },
});

export default theme;
