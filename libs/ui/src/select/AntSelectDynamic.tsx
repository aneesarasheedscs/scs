import './style.scss';
import { find, map } from 'lodash';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';
import { NamePath } from 'antd/es/form/interface';
import { Form, FormItemProps, Select, SelectProps } from 'antd';
export function AntSelectDynamic({
  name,
  label,
  query,
  required,
  fieldValue,
  fieldLabel,
  optionsData,
  formItemProps,
  onSelectChange,
  fullWidth = true,
  showLabel = true,
  allowClear = true,
  showSearch = true,
  ...restProps
}: TAntSelectDynamic) {
  const queryResult = query ? query() : { data: null, isError: false, isLoading: false, isFetching: false };
  const { data, isError, isLoading, isFetching } = queryResult;
  const loading = isLoading || isFetching ? true : isError;
  const selectData = optionsData || data?.data?.Data?.Result;
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please select ${label}` }],
      }
    : { name, rules: [] };
  return (
    <Form.Item label={showLabel ? label : ''} {...requiredProps} {...formItemProps}>
      <Select
        loading={loading}
        allowClear={allowClear}
        showSearch={showSearch}
        className={fullWidth ? `fullWidth ${restProps?.className}` : restProps?.className}
        filterOption={(input, option: any) => {
          return (option?.label ?? '')?.toLowerCase()?.includes(input?.toLowerCase());
        }}
        options={map(selectData, (item) => ({ value: item?.[fieldValue], label: item?.[fieldLabel] })) || []}
        {...restProps}
        onChange={(value, option) => {
          if (onSelectChange) {
            const selectedObject = find(selectData, (item) => item?.Id === value);
            onSelectChange(selectedObject);
          }
          if (restProps?.onChange) {
            restProps?.onChange(value, option);
          }
        }}
      />
    </Form.Item>
  );
}
type TAntSelectDynamic = {
  label: string;
  name?: NamePath;
  required?: boolean;
  fieldValue: string;
  fieldLabel: string;
  showLabel?: boolean;
  fullWidth?: boolean;
  optionsData?: any[];
  onSelectChange?: (selectedObject: any) => void;
  query?: () => UseQueryResult<AxiosResponse<any, any>, unknown>;
  formItemProps?: FormItemProps;
} & SelectProps;
