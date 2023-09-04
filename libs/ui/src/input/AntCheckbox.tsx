import './style.scss';
import { Checkbox, Form, FormItemProps, CheckboxProps } from 'antd';
import { ReactElement, ReactNode } from 'react';

export function AntCheckbox({
  name,
  label,
  required,
  formItemProps,
  fullWidth = true,
  showLabel = true,
  ...restProps
}: TAntCheckbox) {
  const handleChange = (e: any) => {
    console.log(`${label} checkbox is ${e.target.checked ? 'checked' : 'unchecked'}`);
  };
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please input your ${label}` }],
      }
    : { name, rules: [] };
  return (
    <Form.Item label={showLabel ? label : ''} {...requiredProps} {...formItemProps}>
      <Checkbox {...restProps} onChange={handleChange} />
    </Form.Item>
  );
}

type TAntCheckbox = {
  name?: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  showLabel?: boolean;
  formItemProps?: FormItemProps;
} & CheckboxProps;
