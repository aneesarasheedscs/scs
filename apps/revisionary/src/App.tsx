import { useAtom } from 'jotai';
import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import { queryClient } from '@scs/configs';
import { AppHeader, AppTheme, PageLoader } from '@scs/ui';
import { BrowserRouter } from 'react-router-dom';
import { colorPrimaryAtom } from './globalAtoms';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Tab from './pages/Syllabus_Management/Tab';
// import ProfilePic from './pages/Syllabus_Management/Revisionary_ui/ProfilePic';
// import AppHeader1 from './pages/Syllabus_Management/Revisionary_ui/ReHeader';
// import ReHeader from './pages/Syllabus_Management/Revisionary_ui/ReHeader';
import Subject1 from './pages/Syllabus_Management/Revisionary_ui/Subject1';

import Assessment from './pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/SyllabusBooks';
import MainSyllabusFile from './pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/MainSyllabusFile';
import StudentProfile from './pages/Syllabus_Management/Revisionary_ui/StudentProfile';
import SignForm from './pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/Comp/SignForm';
import ComponentsRouting from './pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/ComponentsRouting';
import Tabs1 from './pages/Syllabus_Management/RT/Tab';

function App() {
  const [colorPrimary] = useAtom(colorPrimaryAtom);

  return (
    <AppTheme colorPrimary={colorPrimary}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoader />}>
            {/* <AppRoutes /> */}
            {/* <SignForm /> */}
            {/* <Subject1 /> */}
            {/* <StudentProfile /> */}
            {/* <ComponentsRouting /> */}
            {/* <MainSyllabusFile /> */}
            {/* <Subject1 /> */}
<Tabs1 />
            {/* <Tab /> */}
          </Suspense>
          <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
