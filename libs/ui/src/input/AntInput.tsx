import { Form, FormItemProps, Input, InputProps } from 'antd';

export function AntInput({ name, label, required, formItemProps, inputProps }: TAntInput) {
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please input your ${label}` }],
      }
    : {};
  return (
    <Form.Item {...requiredProps} {...formItemProps}>
      <Input {...inputProps} />
    </Form.Item>
  );
}

type TAntInput = {
  name?: string;
  label?: string;
  required?: boolean;
  inputProps?: InputProps;
  formItemProps?: FormItemProps;
};
