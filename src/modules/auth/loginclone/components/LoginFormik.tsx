import React from 'react';
import { ILoginParams } from '../../../../models/auth';
import { Formik, Form, FormikHelpers, FormikProps, Field } from 'formik';
import EmailField from './formik/EmailField';
import * as Yup from 'yup';

interface Props {
  onLogin: (params: ILoginParams) => void;
  loading: boolean;
  errorMessage: string;
}

interface MyFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginFormik = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  const initialValues: MyFormValues = { email: '', password: '', rememberMe: false };

  const validate = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Mat khau chua it nhat 4 ky tu').required('Vui long nhap mat khau'),
  });
  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, actions) => {
          onLogin(values);
          actions.setSubmitting(false);
        }}
      >
        {(props: FormikProps<MyFormValues>) => (
          <Form style={{ maxWidth: '560px', width: '100%' }}>
            <EmailField name="email" type="email" label="Email address" classInput="form-control" />
            <EmailField name="password" type="password" label="Password" classInput="form-control" />
            <EmailField name="rememberMe" type="checkbox" label="Remember me" classInput="form-check-input" />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading && <div className="spinner-border text-primary" role="status" />}
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginFormik;
