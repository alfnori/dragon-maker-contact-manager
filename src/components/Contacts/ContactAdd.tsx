import { Box, Button, FormHelperText, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/auth/useAuth';
import useForm, { FormErrors } from '../../hooks/useForm';
import { CepAddress, getAddressByCEP } from '../../services/apiService';
import { useContactService } from '../../services/contactService';
import { Contact } from '../../types/Contact';
import { FormElement, FormFieldInputProps } from '../../utils/forms';
import { validateCPF } from '../../utils/validation';

type ContactAddForm = Omit<Contact, 'id' | 'userId' | 'address'> &
  Contact['address'];

export const ContactAdd: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cepRegex = /^(\d{5})-?(\d{3})$/;
  const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short').required('Required'),
    cpf: Yup.string().matches(cpfRegex, 'CPF Invalid').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
      .matches(
        /^(?:\(?([1-9]{2})\)?\s?)?(?:(9\s?\d{4})(-|\s?)?(\d{4})|(\d{4})(-|\s?)?(\d{4}))$/,
        'Phone Invalid'
      )
      .required('Required'),
    cep: Yup.string().matches(cepRegex, 'CEP invalid').required('Required'),
    street: Yup.string().required('Required'),
    number: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string()
      .matches(/^[a-zA-Z]{2}$/, 'State invalid')
      .required('Required'),
    complement: Yup.string(),
    latitude: Yup.number(),
    longitude: Yup.number(),
  });

  const initialState: ContactAddForm = useMemo(() => {
    return {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      street: '',
      number: '',
      city: '',
      state: '',
      complement: '',
      latitude: 0,
      longitude: 0,
    };
  }, []);

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({} as FormErrors<ContactAddForm>);

  const { addContact } = useContactService();

  const handleSubmit = async (
    data: ContactAddForm,
    errors: FormErrors<ContactAddForm>
  ) => {
    console.log(formData);

    if (Object.entries(errors).length) {
      console.log(errors);
      return false;
    }

    const { name, email, cpf, phone, ...address } = formData;

    const success = await addContact(user!.id!, {
      name,
      email,
      cpf,
      phone,
      address,
    });

    if (success) {
      navigate('/contacts');
    } else {
      setErrors(prev => ({
        ...prev,
        __main: 'Failed to save contact',
      }));
    }

    return data;
  };

  const { register, formSubmit, setTouched } = useForm<ContactAddForm>({
    handleSubmit,
    validationSchema,
    handleFormState: {
      dataItem: formData,
      setDataItem: setFormData,
    },
    handleFormErrorState: {
      dataItem: errors,
      setDataItem: setErrors,
    },
  });

  const [dynamicCepProps, setDynamicCepProps] = useState({});

  const [lastCepData, setLastCepData] = useState<{
    cep: string;
    addressData: CepAddress;
  }>({
    cep: '',
    addressData: {
      cep: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
      estado: '',
      ddd: '',
    },
  });

  const handleCPFValidate = (cpf: string) => {
    const cpfError = validateCPF(cpf) ? '' : 'CPF invalid';
    setErrors(prev => ({
      ...prev,
      cpf: cpfError,
    }));
  };

  const handleCEPLookup = async (cep: string) => {
    if (!cep) return;

    setTouched(prev => ({
      ...prev,
      cep: true,
      street: true,
      city: true,
      state: true,
      complement: true,
    }));

    if (!cep.match(cepRegex)) {
      setFormData(prev => ({
        ...prev,
        street: '',
        city: '',
        state: '',
        complement: '',
        latitude: 0,
        longitude: 0,
      }));
      setErrors(prev => ({
        ...prev,
        cep: '',
        street: '',
        city: '',
        state: '',
      }));
      return;
    }

    if (cep === lastCepData.cep) {
      setFormData(prev => ({
        ...prev,
        street: lastCepData.addressData.logradouro,
        city: lastCepData.addressData.localidade,
        state: lastCepData.addressData.uf,
      }));
      return;
    }

    setDynamicCepProps({});

    try {
      const addressData = await getAddressByCEP(cep);

      let cepError = '';

      if (addressData && addressData.cep) {
        setLastCepData({ cep, addressData });
        setFormData(prev => ({
          ...prev,
          street: addressData.logradouro,
          city: addressData.localidade,
          state: addressData.uf,
        }));
        setErrors(prev => ({
          ...prev,
          cep: '',
          street: '',
          city: '',
          state: '',
        }));
      } else {
        cepError = 'CEP not found';
      }

      setErrors(prev => ({
        ...prev,
        cep: cepError,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setDynamicCepProps({});
    }
  };

  const formErrorMessage = errors['__main'];

  const additionalFieldProps: FormFieldInputProps<ContactAddForm> = {
    cpf: {
      onBlur: e => handleCPFValidate(e.target.value),
    },
    cep: {
      onBlur: e => handleCEPLookup(e.target.value),
      ...dynamicCepProps,
    },
    complement: {
      required: false,
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography component="h1" variant="h5">
        Added a new contact
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={formSubmit} noValidate>
        {...Object.entries(initialState).map(([field]) => {
          if (field !== 'latitude' && field !== 'longitude') {
            return (
              <FormElement
                key={`form-contact-${field}`}
                field={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                register={register}
                errors={errors}
                value={`${formData[field as keyof ContactAddForm]}`}
                inputProps={additionalFieldProps[field as keyof ContactAddForm]}
              />
            );
          }
        })}
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
          Create contact
        </Button>
      </Box>
    </Box>
  );
};
