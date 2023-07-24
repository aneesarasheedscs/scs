import { useAtom } from 'jotai';
import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import { queryClient } from '@scs/configs';
import { AppTheme, PageLoader } from '@scs/ui';
import { BrowserRouter } from 'react-router-dom';
import { colorPrimaryAtom } from './globalAtoms';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const [colorPrimary] = useAtom(colorPrimaryAtom);

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
