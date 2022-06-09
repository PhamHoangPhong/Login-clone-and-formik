import { ILoginParams, ILoginValidation } from '../../../models/auth';

function validateEmailRegex(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateEmail = (email: string) => {
  if (!email) return 'Vui lòng nhập địa chỉ email';
  if (!validateEmailRegex(email)) return 'Địa chỉ email không hợp lệ';
  return '';
};

const validatePassword = (password: string) => {
  if (!password) return 'Vui lòng nhập password';
  if (password.length < 4) return 'Mật khẩu tối thiểu 4 ký tự';
  return '';
};

export const validateForm = (formValues: ILoginParams) => ({
  email: validateEmail(formValues.email),
  password: validatePassword(formValues.password),
});

export const isValidate = (values: ILoginValidation) => !values.email && !values.password;
