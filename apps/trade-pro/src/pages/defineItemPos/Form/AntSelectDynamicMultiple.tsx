import { map } from 'lodash';
import { Form, FormItemProps, Select, SelectProps } from 'antd';

export function AntSelectDynamicMultiple({
  name,
  data,
  label,
  isError,
  required,
  isLoading,
  fieldValue,
  fieldLabel,
  formItemProps,
  allowClear = true,
  showSearch = true,
  ...restProps
}: TAntSelectDynamic) {
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please select ${label}` }],
      }
    : { name, rules: [] };

  const loading = isError ? false : isLoading;

  return (
    <Form.Item label={label} {...requiredProps} {...formItemProps}>
      <Select
        mode="multiple"
        loading={loading}
        allowClear={allowClear}
        showSearch={showSearch}
        filterOption={(input, option: any) => {
          return (option?.label ?? '')?.toLowerCase()?.includes(input?.toLowerCase());
        }}
        options={
          map(data, (item) => ({ value: item?.[fieldValue], label: item?.[fieldLabel] })) || []
        }
        {...restProps}
      />
    </Form.Item>
  );
}

type TAntSelectDynamic = {
  data: any[];
  name?: string;
  label?: string;
  isError?: boolean;
  required?: boolean;
  fieldValue: string;
  fieldLabel: string;
  isLoading?: boolean;
  formItemProps?: FormItemProps;
} & SelectProps;
