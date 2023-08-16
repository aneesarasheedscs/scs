import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

export function AntButton({ label, type = 'primary', ...restProps }: TAntButton) {
  return (
    <Button type={type} {...restProps}>
      {label} 
    </Button>
  );
}

type TAntButton = { label?: ReactNode } & ButtonProps;
