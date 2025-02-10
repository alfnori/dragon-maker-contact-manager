import { useState } from 'react';
import { ObjectSchema, ValidationError } from 'yup';

export type FormErrors<T> = Record<keyof T, string> & { __main?: string };

export interface FormProps<T> {
  formData: T;
  submitCount: number;
  formSubmit: (event: React.FormEvent) => void;
  touched: Record<keyof T, boolean>;
  errors: FormErrors<T>;
  register: (name: keyof T) => {
    name: keyof T;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
}

export type HandleSubmit<T> = (
  data: T,
  errors: Record<keyof T, string>,
  previousState?: T
) => Promise<T | boolean>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useForm<T extends Record<string, any>>(
  handleSubmit: HandleSubmit<T>,
  initialState: Awaited<T>,
  validationSchema?: ObjectSchema<T>
): FormProps<T> {
  const [submitCount, setSubmitCount] = useState(0);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors<T>>({} as FormErrors<T>);

  const validate = async (data: T) => {
    let errors = {};
    try {
      await validationSchema?.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach(error => {
          if (error.path) newErrors[error.path] = error.message;
        });
        errors = newErrors;
      }
    }
    return errors as Record<keyof T, string>;
  };

  const setFormError = (message: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      __main: message,
    }));
  };

  async function onSubmit(state: Awaited<T>) {
    try {
      const fieldValues = (await state) as T;

      setSubmitCount(count => count + 1);
      const errors = await validate(fieldValues);
      setErrors(errors);
      await handleSubmit(fieldValues, errors);
      return fieldValues;
    } catch (error) {
      const mainError =
        error instanceof Error ? error.message : 'An error occurred';
      setFormError(mainError);
      return state;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateElement = (name: keyof T, value: unknown) => {
    if (!validationSchema) return;

    const fieldSchema = validationSchema.pick([name]);

    fieldSchema
      .validate({ ...formData, [name]: value })
      .then(() => setErrors(currErrors => ({ ...currErrors, [name]: '' })))
      .catch(err =>
        setErrors(currErrors => ({ ...currErrors, [name]: err.message }))
      );
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateElement(name, value);
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const register = (name: keyof T) => ({
    id: name as string,
    name,
    onChange: handleChange,
    onBlur: handleBlur,
    value: formData[name],
    error: Boolean(errors[name as string] && touched[name as string]),
    helperText: touched[name as string] ? errors[name as string] : undefined,
  });

  const formSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    Object.entries(formData).forEach(([key, value]) => {
      validateElement(key, value);
      setTouched(prev => ({ ...prev, [key]: true }));
    });

    setFormError('');

    onSubmit(formData);
  };

  return {
    submitCount,
    touched,
    errors,
    formData,
    formSubmit,
    register,
  };
}

export default useForm;
