import { Form, FormItemProps, Input, InputProps } from 'antd';
import { ReactElement, ReactNode } from 'react';

export function AntInput({
  name,
  label,
  required,
  formItemProps,
  inputProps,
  ...restProps
}: TAntInput) {
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please input your ${label}` }],
      }
    : { name, rules: [] };
  return (
    <Form.Item label={label} {...requiredProps} {...formItemProps}>
      <Input {...inputProps} {...restProps} />
    </Form.Item>
  );
}

type TAntInput = {
  name?: string;
  label?: string;
  required?: boolean;
  inputProps?: InputProps;
  formItemProps?: FormItemProps;
} & InputProps;
