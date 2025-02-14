import {
  Dispatch as ReactDispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ObjectSchema, ValidationError } from 'yup';

export type FormErrors<T> = Record<keyof T, string> & { __main?: string };

export type Dispatch<T = unknown> = ReactDispatch<SetStateAction<T>>;

export type FormTouches<T> = Record<keyof T, boolean>;

export type FormFieldRegister<T> = (name: keyof T) => {
  name: string;
  id: string;
  value: string;
  error?: boolean;
  helperText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export interface FormProps<T> {
  submitCount: number;
  formSubmit: (event: React.FormEvent) => void;
  touched: FormTouches<T>;
  formData: T;
  setFormData: Dispatch<T>;
  errors: FormErrors<T>;
  setErrors: Dispatch<FormErrors<T>>;
  setTouched: Dispatch<FormTouches<T>>;
  register: FormFieldRegister<T>;
}

export type HandleSubmit<T> = (
  data: T,
  errors: Record<keyof T, string>,
  previousState?: T
) => Promise<T | boolean>;

export type HandleField<T> = Partial<{
  [key in keyof T]: (
    state: Partial<T> | undefined,
    touches: Record<keyof T, boolean>,
    setFormData?: Dispatch<T>,
    setErrors?: Dispatch<FormErrors<T>>,
    setTouched?: Dispatch<FormTouches<T>>
  ) => void;
}>;

export type HandleFieldState<T> = {
  dataItem: T;
  setDataItem: Dispatch<T>;
};

export interface UseFormProps<T extends Record<string, unknown>> {
  handleSubmit: HandleSubmit<T>;
  validationSchema?: ObjectSchema<T>;
  onFieldChange?: HandleField<T>;
  onFieldBlur?: HandleField<T>;
  handleFormState?: HandleFieldState<T>;
  handleFormErrorState?: HandleFieldState<FormErrors<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useForm<T extends Record<string, any>>({
  handleSubmit,
  validationSchema,
  onFieldChange,
  onFieldBlur,
  handleFormState,
  handleFormErrorState,
}: UseFormProps<T>): FormProps<T> {
  const [submitCount, setSubmitCount] = useState(0);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );

  const [formData, setUseFormData] = useState(
    (handleFormState?.dataItem || {}) as T
  );
  const [errors, setUseErrors] = useState(
    (handleFormErrorState?.dataItem || {}) as FormErrors<T>
  );

  const setFormData = (state: SetStateAction<T>) => {
    setUseFormData(state);
    handleFormState?.setDataItem(state);
  };

  const setErrors = (state: SetStateAction<FormErrors<T>>) => {
    setUseErrors(state);
    handleFormErrorState?.setDataItem(state);
  };

  useEffect(() => {
    if (!handleFormState) return;

    setUseFormData(handleFormState?.dataItem);
  }, [handleFormState, handleFormState?.dataItem]);

  useEffect(() => {
    if (!handleFormErrorState) return;

    setUseErrors(handleFormErrorState?.dataItem);
  }, [handleFormErrorState, handleFormErrorState?.dataItem]);

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

  const customSetFormData = (state: SetStateAction<T>) => {
    setFormData(state);

    const touchedEntries = Object.keys(state).map(key => [key, true]);
    if (!touchedEntries.length) return;

    const touchedObject = Object.fromEntries(touchedEntries);
    setTouched(prev => ({ ...prev, ...touchedObject }));
  };

  async function onSubmit(state: T) {
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
    validateElement(name, value);
    customSetFormData(prev => ({ ...prev, [name]: value }));

    if (!onFieldChange) return;

    if (onFieldChange[name]) {
      onFieldChange[name](formData, touched, customSetFormData);
    }
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

    if (!onFieldBlur) return;

    if (onFieldBlur[name]) {
      onFieldBlur[name](formData, touched, customSetFormData);
    }
  };

  const register: FormFieldRegister<T> = (name: keyof T) => ({
    id: name as string,
    name: name as string,
    onChange: handleChange,
    onBlur: handleBlur,
    value: `${formData[name] || ''}`,
    error: Boolean(errors[name as string]),
    helperText: errors[name as string],
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
    formSubmit,
    register,
    formData,
    setFormData,
    setErrors,
    setTouched,
  };
}

export default useForm;
