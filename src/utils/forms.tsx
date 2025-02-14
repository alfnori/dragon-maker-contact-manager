import {
  FormHelperText,
  FormHelperTextOwnProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { FormErrors, FormProps } from '../hooks/useForm';

export type FormState<T> = Record<keyof T, string> & { __main?: string };

export type FormFieldInputProps<T> = {
  [K in keyof T]?: TextFieldProps;
};

export const ErrorField = function <T>({
  formProp,
  errors,
  overrideHelperTextProps = {},
}: {
  formProp: keyof FormErrors<T>;
  errors: FormErrors<T>;
  overrideHelperTextProps?: FormHelperTextOwnProps;
}) {
  return (
    <span>
      <FormHelperText
        error={!!errors[formProp]}
        sx={{ width: '100%' }}
        {...overrideHelperTextProps}
      >
        {errors[formProp]}
      </FormHelperText>
    </span>
  );
};

export const FormElement = function <T>({
  label,
  field,
  register,
  value = '',
  inputProps = {},
  errors = {} as FormErrors<T>,
}: {
  label: string;
  field: string;
  register: FormProps<T>['register'];
  value?: string;
  errors?: FormErrors<T>;
  inputProps?: TextFieldProps;
}) {
  const key = field as keyof T;

  const {
    onChange,
    onBlur,
    error,
    value: asRegisterValue,
    ...registeredFields
  } = { ...register(key) };
  const {
    onChange: onChangeInput,
    onBlur: onBlurInput,
    ...parsedProps
  } = { ...(inputProps || {}) };

  const onChangeFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (onChangeInput) onChangeInput(e);
  };

  const onBlurFn = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    if (onBlurInput) onBlurInput(e);
  };

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={label}
      slotProps={{
        formHelperText: {
          error: errors && !!errors[key],
        },
      }}
      {...parsedProps}
      {...registeredFields}
      value={asRegisterValue || value}
      error={!!errors[key]}
      helperText={errors[key]}
      onChange={onChangeFn}
      onBlur={onBlurFn}
    />
  );
};
