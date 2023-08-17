import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
export function AntButton2({ label, type = 'primary', ...restProps }: TAntButton) {
  return (
    <Button type={type} {...restProps}>
      Cancel
    </Button>
  );
}
type TAntButton = { label?: ReactNode } & ButtonProps;