import { size } from 'lodash';
import { AppLayout } from '@tradePro/components';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '@tradePro/utils/isTokenExpired';

function PrivateRoute() {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const financialYearDetail: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

  if (userDetail?.access_token && !isTokenExpired() && size(financialYearDetail) > 0) {
    return (
      
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }

  return <Navigate to="/" />;
}

export default PrivateRoute;
