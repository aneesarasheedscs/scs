import { useAtom } from 'jotai';
import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import { queryClient } from '@scs/configs';
import { AppHeader, AppTheme, PageLoader } from '@scs/ui';
import { BrowserRouter } from 'react-router-dom';
import { colorPrimaryAtom } from './globalAtoms';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Dashboard from './pages/revisionaryUser/Dashboard/Index';
import DashboardSubTopic from './pages/revisionaryUser/Dashboard/DashboardSubTopic';
import ClassSyllabusDivisionByTopic from './pages/Class_Management/ClassSyllabusDivisionByTopic';
import SubjectTopic from './pages/Class_Management/ClassSyllabusDivisionByTopic/SubjectTopic/ClassSubjectTopic';

function App() {
  const [colorPrimary] = useAtom(colorPrimaryAtom);

  return (
    <AppTheme colorPrimary={colorPrimary}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoader />}>
            <AppRoutes />
            {/* <ClassSyllabusDivisionByTopic /> */}
            {/* <SubjectTopic /> */}
          </Suspense>
          <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
