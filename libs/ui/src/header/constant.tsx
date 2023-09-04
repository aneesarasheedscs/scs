import { UserOutlined, FileOutlined, FileTextOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
export const getSidebarList = () => {
  const { t } = useTranslation();
  const headerList = [
    {
      path: '/signform',
      label: t('sign_in'),
    },
    {
      path: '/profile',
      label: t('student_profile'),
    },
    {
      path: '/syllabus1',
      label: t('student_syllabus'),
    },
    {
      path: '/syllabusfile',
      label: t('syllabus_status'),
    },
    {
      path: '/assessment',
      label: t('Assesment'),
    },
    {
      path: '/dashboard',
      label: t('Dashboard'),
    },
    {
      path: '/syllabusdivisionbytopic',
      label: t('syllabus_division_by_topic'),
    },
  ];
  return headerList;
};
