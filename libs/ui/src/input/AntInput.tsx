import './style.scss';
import { NamePath } from 'antd/es/form/interface';
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
  label: string;
  name?: NamePath;
  required?: boolean;
  fullWidth?: boolean;
  showLabel?: boolean;
  formItemProps?: FormItemProps;
} & InputProps;
