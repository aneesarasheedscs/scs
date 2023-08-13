import './style.scss';
import dayjs from 'dayjs';
import { DatePicker, Form, FormItemProps, DatePickerProps } from 'antd';

export function AntDatePicker({
  name,
  label,
  required,
  formItemProps,
  fullWidth = true,
  showLabel = true,
  disabledAfterCurrentDate = true,
  ...restProps
}: TAntDatePicker) {
  const requiredProps = required
    ? {
        name,
        rules: [{ required: true, message: `Please select ${label}` }],
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
  name?: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  showLabel?: boolean;
  disabledAfterCurrentDate?: boolean;
  formItemProps?: FormItemProps;
} & DatePickerProps;
