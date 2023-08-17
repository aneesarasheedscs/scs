import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
export function AntButton4({ label, type = 'primary', ...restProps }: TAntButton) {
  return (
    <Button type={type} {...restProps}>
      Save and add more
    </Button>
  );
}
type TAntButton = { label?: ReactNode } & ButtonProps;