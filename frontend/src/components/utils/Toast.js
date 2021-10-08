import { useState, useEffect } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

function SlideTransition(props) {
  return <Slide {...props} direction='left' />;
}

const Toast = ({ children, open, setOpen }) => {
  const vertical = 'top',
    horizontal = 'right';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      message={children}
      key={vertical + horizontal}
      autoHideDuration={3000}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      TransitionComponent={SlideTransition}
      disableWindowBlurListener={true}
    >
      <Alert severity='error' sx={{ width: '100%' }} onClick={handleClose}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
