import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

export function AntButton({
  label,
  isError,
  isLoading,
  type = 'primary',
  ...restProps
}: TAntButton) {
  const loading = isError ? false : isLoading;
  return (
    <Button loading={loading} type={type} {...restProps}>
      {label}
    </Button>
  );
}

type TAntButton = { label?: ReactNode; isError?: boolean; isLoading?: boolean } & ButtonProps;
