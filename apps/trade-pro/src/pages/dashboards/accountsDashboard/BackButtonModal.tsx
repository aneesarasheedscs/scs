import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

export function BackButtonModal() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(0); // Navigate back one step in the history
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
