import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from '@revisionary/components';

function PrivateRoute() {
  const accessToken = localStorage.getItem('auth');

  if (!accessToken) return <Navigate to="/" />;

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default PrivateRoute;
