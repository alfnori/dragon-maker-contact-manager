import { FormHelperText, FormHelperTextOwnProps } from '@mui/material';
import { FormErrors } from '../hooks/useForm';

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
    <FormHelperText
      error={!!errors[formProp]}
      sx={{ width: '100%' }}
      {...overrideHelperTextProps}
    >
      {errors[formProp]}
    </FormHelperText>
  );
};
