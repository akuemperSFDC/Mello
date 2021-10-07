import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  width: '20rem',
  transition: 'all .25s',
  '&:hover': {
    backgroundColor: theme.palette.success.light,
  },
}));

const SuccessButton = ({
  children,
  onClick,
  formState: { email, password, firstName, lastName },
  formType,
}) => {
  return (
    <StyledButton
      variant='contained'
      fullWidth
      onClick={onClick}
      disabled={formType === 'register' && (!email || !password)}
    >
      {children}
    </StyledButton>
  );
};

export default SuccessButton;
