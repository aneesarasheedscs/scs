import { size } from 'lodash';
import { AppLayout } from '@tradePro/components';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '@tradePro/utils/isTokenExpired';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

function PrivateRoute() {
  const userDetail = storedUserDetail();
  const financialYearDetail = storedFinancialYear();

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
