import * as Yup from 'yup';
import { parse, isDate } from 'date-fns';

export const loginFormSchema = Yup.object().shape({
  email: Yup.string().required('Field required'),
  password: Yup.string().required('Field required'),
});

export const ForgotPassFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Field required')
    .max(50)
    .email('Enter a valid email'),
});

export const CreatePassFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be at most 30 characters')
    .required('Field required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be at most 30 characters')
    .required('Field required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

export const createMultiAutoFormSchema = Yup.object().shape({
  date: Yup.date()
    .transform((value, originalValue) => {
      const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'dd/MM/y', new Date());

      return parsedDate;
    })
    .required('Field required'),
  expiry: Yup.number().required('Field required').min(1).max(2000),
});

export const filterMultiAutoFormSchema = Yup.object().shape({
  from: Yup.date().transform((value, originalValue) => {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, 'dd/MM/y', new Date());

    return parsedDate;
  }),
  to: Yup.date()
    .transform((value, originalValue) => {
      const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'dd/MM/y', new Date());

      return parsedDate;
    })
    .min(
      Yup.ref('from'),
      'To date should be greater than or equal to from date'
    ),
});

export const InviteUserFormSchema = Yup.object().shape({
  name: Yup.string().required('Field required'),
  email: Yup.string()
    .required('Field required')
    .max(50)
    .email('Enter a valid email'),
  role: Yup.string().required('Field required'),
});

export const CreateRoleFormSchema = Yup.object().shape({
  name: Yup.string().required('Field required'),
  permissions: Yup.array().min(1, 'Select atleast one permission'),
});
