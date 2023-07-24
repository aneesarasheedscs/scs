import { map } from 'lodash';
import { lazy } from 'react';
import PrivateRoute from './PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from './routeList';

const NotFoundPage = lazy(() => import('@revisionary/pages/404'));

function AppRoutes() {
  return (
    <Routes>
      {map(publicRoutes, ({ path, element }, index) => (
        <Route path={path} element={element} key={`${index}-${path}`} />
      ))}

      <Route element={<PrivateRoute />}>
        {map(protectedRoutes, ({ path, element }, index) => (
          <Route path={path} element={element} key={`${index}-${path}`} />
        ))}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
