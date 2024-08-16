import * as yup from 'yup';
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE_LIMIT = 2 * 1024 * 1024;

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least one uppercase, one lowercase, one number and one special character'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
  gender: yup.string().required(),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
    picture: yup
    .mixed()
    .test('fileSize', 'File is too large', value => {
      return value && (value as File).size <= FILE_SIZE_LIMIT;
    })
    .test('fileFormat', 'Unsupported Format', value => {
      return value && SUPPORTED_FORMATS.includes((value as File).type);
    })
    .required('Picture is required'),
  country: yup.string().required(),
});
