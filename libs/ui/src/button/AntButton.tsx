import './style.scss';
import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

export function AntButton({ label, isError, isLoading, fullWidth = true, type = 'primary', ...restProps }: TAntButton) {
  const loading = isError ? false : isLoading;
  return (
    <Button
      type={type}
      loading={loading}
      className={fullWidth ? `fullWidth ${restProps?.className}` : restProps?.className}
      {...restProps}
    >
      {label}
    </Button>
  );
}

type TAntButton = {
  label?: ReactNode;
  isError?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  refetch?: boolean;
} & ButtonProps;
