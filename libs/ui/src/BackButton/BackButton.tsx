import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BackButton = ({ label, isError, isLoading, fullWidth = true, type = 'primary', ...restProps }: TBackButton) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back one step in the navigation history
  };
  const { t } = useTranslation();
  return (
    <>
      <Button
        className={fullWidth ? `fullWidth ${restProps?.className}` : restProps?.className}
        {...restProps}
        type="primary"
        onClick={handleBack}
        icon={<CaretLeftOutlined style={{ fontWeight: 'bold', fontSize: '14px' }} />}
        style={{ background: 'orange' }}
      >
        {t('back')}
      </Button>
    </>
  );
};
type TBackButton = {
  label?: ReactNode;
  isError?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  refetch?: boolean;
} & ButtonProps;

export default BackButton;
