import './style.scss';
import { Form, FormItemProps, InputNumber, InputNumberProps } from 'antd';

export function AntInputNumber({
  name,
  label,
  required,
  formItemProps,
  fullWidth = true,
  showLabel = true,
  ...restProps
}: TAntInputNumber) {
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please input your ${label}` }],
      }
    : { name, rules: [] };
  return (
    <Form.Item label={showLabel ? label : ''} {...requiredProps} {...formItemProps}>
      <InputNumber
        {...restProps}
        className={fullWidth ? `fullWidth ${restProps?.className}` : restProps?.className}
      />
    </Form.Item>
  );
}

type TAntInputNumber = {
  name?: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  showLabel?: boolean;
  formItemProps?: FormItemProps;
} & InputNumberProps;
