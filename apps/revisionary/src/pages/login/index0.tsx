import './style.scss';
import useLogin from './queries';
import { useEffect } from 'react';
import { TUserLogin } from './types';
import { LoginPage } from '@scs/pages';
import { useNavigate } from 'react-router-dom';
import { route } from '@revisionary/routes/constant';

function Login() {
  const navigate = useNavigate();
  const { mutate, isError, isLoading, isSuccess } = useLogin();

  const accessToken = localStorage.getItem('auth');
  const handleLogin = (values: TUserLogin) => mutate(values);

  useEffect(() => {
    if (isSuccess || accessToken) navigate(route.SYLLABUS_MANAGEMENT);
  }, [isSuccess, accessToken]);

  return (
    <LoginPage
      handleLogin={handleLogin}
      logo={<h1>Revisionary</h1>}
      isLoading={isError ? false : isLoading}
    />
  );
}

export default Login;
