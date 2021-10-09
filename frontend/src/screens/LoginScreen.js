import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  loginUserAsync,
  selectCurrentUser,
} from '../features/auth/authSlice.js';
import AppleIcon from '@mui/icons-material/Apple';
import googleSmall from '../img/business-icons/googleSmall.svg';
import microsoftSmall from '../img/business-icons/microsoftSmall.svg';
import slackSmall from '../img/business-icons/slackSmall.svg';

import FormTextField from '../components/form-components/FormTextField.js';
import SuccessButton from '../components/form-components/SuccessButton.js';
import OAuthButton from '../components/form-components/OAuthButton.js';
import Spinner from '../components/utils/Spinner.js';
import Toast from '../components/utils/Toast.js';

const LoginScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const { user, loading, errors } = useSelector(selectCurrentUser);

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const images = [
    {
      type: 'img',
      src: googleSmall,
      alt: 'google-img',
      name: 'Google',
    },
    {
      type: 'img',
      src: microsoftSmall,
      alt: 'microsoft-img',
      name: 'Microsoft',
    },
    {
      type: 'icon',
      src: AppleIcon,
      alt: 'apple-img',
      name: 'Apple',
    },
    {
      type: 'img',
      src: slackSmall,
      alt: 'slack-img',
      name: 'Slack',
    },
  ];

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      dispatch(loginUserAsync(formState));
      if (errors) {
        setOpen(true);
      }
      history.push('/boards');
      setFormState({ email: '', password: '' });
    }
  };

  const handleLogin = async () => {
    await dispatch(loginUserAsync(formState));
    if (errors) {
      setOpen(true);
    }
    history.push('/boards');
    setFormState({ email: '', password: '' });
  };

  useEffect(() => {
    if (errors) {
      setOpen(true);
    }
  }, [errors]);

  useEffect(() => {
    if (user) {
      history.push('/boards');
    }
  }, [history, user]);

  return (
    <>
      {errors && (
        <Toast open={open} setOpen={setOpen}>
          {errors}
        </Toast>
      )}
      <Grid
        container
        direction='column'
        sx={{
          backgroundColor: theme.palette.common.grey,
          width: '100vw',
          height: '100vh',
        }}
      >
        <Grid item align='center' sx={{ mt: 4, mb: 1 }}>
          <Typography variant='h2'>Mello</Typography>
        </Grid>

        <Paper
          elevation={4}
          sx={{ height: '37.8em', width: '23em', mt: 2.5, mx: 'auto', p: 2 }}
        >
          <Grid
            item
            container
            direction='column'
            alignItems='center'
            spacing={2.25}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Grid item sx={{ mt: 3, mb: 1.5 }}>
                  <Typography
                    variant='p'
                    sx={{ fontWeight: 600, color: '#616161' }}
                  >
                    Log in to Mello
                  </Typography>
                </Grid>

                {/* Form Fields */}
                <Grid item sx={{ width: '100%' }} align='center'>
                  <FormTextField
                    type='email'
                    label='Enter email'
                    name='email'
                    formState={formState}
                    setFormState={setFormState}
                    handleEnterKey={handleEnterKey}
                  />
                </Grid>
                <Grid item sx={{ width: '100%' }} align='center'>
                  <FormTextField
                    type='password'
                    label='Enter password'
                    name='password'
                    formState={formState}
                    setFormState={setFormState}
                    handleEnterKey={handleEnterKey}
                  />
                </Grid>

                {/* Log in button */}
                <Grid item sx={{ width: '100%' }} align='center'>
                  <SuccessButton formState={formState} onClick={handleLogin}>
                    <Typography variant='body2'>Log in</Typography>
                  </SuccessButton>
                </Grid>

                <Grid item>
                  <Typography
                    variant='body1'
                    sx={{ fontSize: '.8rem', fontWeight: 300 }}
                  >
                    OR
                  </Typography>
                </Grid>

                {/* OAuth Buttons */}
                {images.map((img) => (
                  <Grid item sx={{ m: 0 }} key={img.alt}>
                    <OAuthButton>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justifyContent='center'
                        sx={{ p: 0.5 }}
                      >
                        {img.type === 'img' ? (
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{
                              height: '1.25rem',
                              width: '1.25rem',
                            }}
                          />
                        ) : (
                          <AppleIcon
                            sx={{
                              height: '1.25rem',
                              width: '1.25rem',
                            }}
                          />
                        )}
                        <Typography
                          variant='body2'
                          sx={{ color: 'black', pl: 1, mr: 1 }}
                        >
                          Continue with {img.name}
                        </Typography>
                      </Grid>
                    </OAuthButton>
                  </Grid>
                ))}

                {/* Break */}
                <Grid item sx={{ width: '100%', mt: 4 }} align='center'>
                  <Box
                    sx={{
                      border: 0.5,
                      borderBottom: 0.5,
                      borderColor: '#e0e0e0',
                      width: '20rem',
                    }}
                  />
                </Grid>

                {/* Links */}
                <Grid item sx={{ width: '100%' }}>
                  <Grid container justifyContent='center' alignItems='center'>
                    <Grid
                      item
                      component={Link}
                      to='/'
                      sx={{
                        textDecoration: 'none',
                        ':hover': { textDecoration: 'underline' },
                        ':visited': { color: 'inherit' },
                      }}
                    >
                      <Typography variant='link'>Can't log in?</Typography>
                    </Grid>
                    <Typography sx={{ fontSize: '2rem', mx: 1 }}>·</Typography>
                    <Grid
                      item
                      component={Link}
                      to='/register'
                      sx={{
                        textDecoration: 'none',
                        ':hover': { textDecoration: 'underline' },
                        ':visited': { color: 'inherit' },
                      }}
                    >
                      <Typography variant='link'>
                        Sign up for an account
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default LoginScreen;
