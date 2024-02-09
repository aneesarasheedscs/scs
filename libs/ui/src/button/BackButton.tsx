import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

interface BackButtonProps {
  goToDashboard: boolean;
}

export function BackButton({ goToDashboard }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (goToDashboard) {
      navigate(0); // Navigate to route "0" (dashboard)
    } else {
      navigate(-1); // Navigate back one step in the history
    }
  };
  return (
    <>
      <Button
        type="primary"
        onClick={handleBack}
        icon={<CaretLeftOutlined style={{ fontWeight: 'bold', fontSize: '14px' }} />}
        style={{ background: 'orange' }}
      >
        {t('back')}
      </Button>
    </>
  );
}

// export function BackButton() {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1); // Navigate back one step in the history
//   };
//   return (
//     <>
//       <Button
//         type="primary"
//         onClick={handleBack}
//         icon={<CaretLeftOutlined style={{ fontWeight: 'bold', fontSize: '14px' }} />}
//         style={{ background: 'orange' }}
//       >
//         {t('back')}
//       </Button>
//     </>
//   );
// }
