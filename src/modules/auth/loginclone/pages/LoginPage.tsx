import React from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../../../../logo-420-x-108.png';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import { ILoginParams } from '../../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';
interface Props {}

const LoginPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const onLogin = React.useCallback(async (values: ILoginParams) => {
    setLoading(true);
    const data = await dispatch(
      fetchThunk(API_PATHS.signIn, 'post', {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe
      }),
    );
    setLoading(false)
    setErrorMessage(!values.rememberMe && data.message)
    if (data?.code === 200) dispatch(replace(ROUTES.home));
  }, [dispatch]);
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
