import './style.scss';
import { Form, FormItemProps, Input, InputProps } from 'antd';
import { ReactElement, ReactNode } from 'react';

export function AntInput({
  name,
  label,
  required,
  formItemProps,
  fullWidth = true,
  showLabel = true,
  ...restProps
}: TAntInput) {
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please input your ${label}` }],
      }
    : { name, rules: [] };
  return (
    <Form.Item label={showLabel ? label : ''} {...requiredProps} {...formItemProps}>
      <Input
        {...restProps}
        className={fullWidth ? `fullWidth ${restProps?.className}` : restProps?.className}
      />
    </Form.Item>
  );
}

type TAntInput = {
  name?: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  showLabel?: boolean;
  formItemProps?: FormItemProps;
} & InputProps;
