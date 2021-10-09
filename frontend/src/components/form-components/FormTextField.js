import React from 'react';
import { TextField, outlinedInputClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '20rem',
  backgroundColor: theme.palette.common.grey,
  padding: 1,
  '& label': {
    color: theme.palette.text.disabled,
    fontSize: '.85rem',
    paddingTop: 2,
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: theme.palette.primary.light,
    },
}));

const FormTextField = ({
  type,
  label,
  name,
  setFormState,
  formState: { email, password },
  handleEnterKey,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <StyledTextField
      variant='outlined'
      size='small'
      type={type}
      label={label}
      required
      name={name}
      value={type === 'password' ? password : email}
      onChange={handleChange}
      onKeyPress={handleEnterKey}
    />
  );
};

export default FormTextField;
