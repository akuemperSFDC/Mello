import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const OAuthButton = ({ children }) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    width: '20rem',
    transition: 'all .25s',
    '&:hover': {
      backgroundColor: theme.palette.common.grey,
    },
    color: 'red',
  }));

  return (
    <StyledButton fullWidth variant='contained'>
      {children}
    </StyledButton>
  );
};

export default OAuthButton;
