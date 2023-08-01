import { AppLayout } from '@tradePro/components';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '@tradePro/utils/isTokenExpired';

function PrivateRoute() {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  if (userDetail?.access_token && !isTokenExpired()) {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }

  return <Navigate to="/" />;
}

export default PrivateRoute;
