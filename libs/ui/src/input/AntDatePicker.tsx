import './style.scss';
import dayjs from 'dayjs';
import { NamePath } from 'antd/es/form/interface';
import { DatePicker, Form, FormItemProps, DatePickerProps } from 'antd';

export function AntDatePicker({
  name,
  label,
  required,
  formItemProps,
  fullWidth = true,
  showLabel = true,
  disabledAfterCurrentDate = true,
  defaultValue,
  ...restProps
}: TAntDatePicker) {
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `` }],
      }
    : { name, rules: [] };

  const disabledDate = (current: dayjs.Dayjs) => {
    if (!disabledAfterCurrentDate) return false;
    return current && current.isAfter(dayjs(), 'day');
  };

  return (
    <Form.Item label={showLabel ? label : ''} {...requiredProps} {...formItemProps}>
      <DatePicker
        {...restProps}
        format={restProps?.format || 'DD-MMM-YYYY'}
        disabledDate={restProps?.disabledDate || disabledDate}
        className={fullWidth ? `fullWidth ${restProps?.className}` : restProps?.className}
      />
    </Form.Item>
  );
}

type TAntDatePicker = {
  label: string;
  name?: NamePath;
  required?: boolean;
  fullWidth?: boolean;
  showLabel?: boolean;
  disabledAfterCurrentDate?: boolean;
  formItemProps?: FormItemProps;
} & DatePickerProps;
