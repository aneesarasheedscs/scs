import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

export function BackButton() {
  const navigate = useNavigate();
  const handleBack = ({ label, isError, isLoading, fullWidth = true, type = 'primary', ...restProps }: any) => {
    navigate(-1); // Go back one step in the navigation history
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
