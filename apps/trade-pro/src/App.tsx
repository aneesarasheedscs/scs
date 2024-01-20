import { useAtom } from 'jotai';
import { Suspense } from 'react';
import { PageLoader } from './components';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { colorPrimaryAtom } from './globalAtoms';
import { QueryClientProvider } from 'react-query';
import { queryClient, AppTheme } from '@tradePro/configs';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const [colorPrimary] = useAtom(colorPrimaryAtom);
  // const [colorSecondary] = useAtom(secondryPrimaryAtom);

  return (
    <AppTheme colorPrimary={colorPrimary}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoader />}>
            <AppRoutes />
          </Suspense>
          <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
