import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
export function AntButton3({ label, type = 'primary', ...restProps }: TAntButton) {
  return (
    <Button type={type} {...restProps}>
      Save
    </Button>
  );
}
type TAntButton = { label?: ReactNode } & ButtonProps;