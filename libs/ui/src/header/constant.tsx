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
      path: '/subject-topics',
      label: t('Dashboard'),
    },
  ];
  return headerList;
};
