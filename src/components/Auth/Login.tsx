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
import { useAuth } from '../../contexts/auth/useAuth';
import { ErrorField } from '../../utils/forms';

interface LoginFormState {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formError, setFormError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (
    data: LoginFormState,
    errors: FormErrors<LoginFormState>
  ) => {
    if (Object.entries(errors).length) {
      return false;
    }

    const { email, password } = data;
    const success = await login(email, password);

    if (success) {
      navigate('/contacts');
    } else {
      setFormError('Invalid credentials');
    }

    return data;
  };

  const initialState: LoginFormState = {
    email: '',
    password: '',
  };

  const { errors, register, formSubmit } = useForm<LoginFormState>(
    handleSubmit,
    initialState,
    validationSchema
  );

  const formErrorMessage = errors['__main'] || formError;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={formSubmit} noValidate>
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
          helperText={<ErrorField formProp="email" errors={errors} />}
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
          helperText={<ErrorField formProp="password" errors={errors} />}
          {...register('password')}
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
          Sign In
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};
