import React from 'react';
import { ILoginParams, ILoginValidation } from '../../../../models/auth';
import { isValidate, validateForm } from '../validate';

interface Props {
  onLogin: (params: ILoginParams) => void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;
  const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const onHandleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const onValidate = validateForm(formValues);
      setValidate(onValidate);
      if (!isValidate(onValidate)) return;
      onLogin(formValues);
    },
    [formValues],
  );
  return (
    <form style={{ maxWidth: '560px', width: '100%' }} onSubmit={onSubmit}>
      {errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={onHandleChange}
        />
        <div id="emailHelp" className="form-text">
          {validate?.email}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="exampleInputPassword1"
          aria-describedby="passwordHelp"
          onChange={onHandleChange}
        />
        <div id="passwordHelp" className="form-text">
          {validate?.password}
        </div>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="rememberMe"
          id="exampleCheck1"
          onChange={onHandleChange}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Remember me
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading && <div className="spinner-border text-primary" role="status" />}
        Login
      </button>
    </form>
  );
};

export default LoginForm;
