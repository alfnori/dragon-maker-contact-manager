import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import useForm, { FormErrors } from '../../hooks/useForm';
import { useAuth } from '../../contexts/useAuth';

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formError, setFormError] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
    confirmPassword: Yup.string()
      .min(6, 'Too Short!')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (
    data: RegisterFormState,
    errors: FormErrors<RegisterFormState>
  ) => {
    if (Object.entries(errors).length) {
      return false;
    }

    const { name, email, password } = data;
    const success = signUp(name, email, password);

    if (success) {
      navigate('/contacts');
    } else {
      setFormError('Email already registered');
    }

    return data;
  };

  const initialState: RegisterFormState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { errors, register, formSubmit } = useForm<RegisterFormState>(
    handleSubmit,
    initialState,
    validationSchema
  );

  const ErrorField = ({
    formProp,
  }: {
    formProp: keyof FormErrors<RegisterFormState>;
  }) => {
    return (
      <FormHelperText error={!!errors[formProp]} sx={{ width: '100%' }}>
        {errors[formProp]}
      </FormHelperText>
    );
  };

  const formErrorMessage = errors['__main'] || formError;

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={formSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          slotProps={{
            formHelperText: {
              error: !!errors.name,
            },
          }}
          helperText={<ErrorField formProp="name" />}
          {...register('name')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          slotProps={{
            formHelperText: {
              error: !!errors.email,
            },
          }}
          helperText={<ErrorField formProp="email" />}
          {...register('email')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          slotProps={{
            formHelperText: {
              error: !!errors.password,
            },
          }}
          helperText={<ErrorField formProp="password" />}
          {...register('password')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          slotProps={{
            formHelperText: {
              error: !!errors.confirmPassword,
            },
          }}
          helperText={<ErrorField formProp="confirmPassword" />}
          {...register('confirmPassword')}
        />
        <FormHelperText
          error={!!formErrorMessage}
          sx={{ width: '100%', fontSize: '1.2rem' }}
        >
          {formErrorMessage}
        </FormHelperText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Button fullWidth variant="outlined" onClick={() => navigate('/login')}>
          Back to Login
        </Button>
      </Box>
    </Box>
  );
};
