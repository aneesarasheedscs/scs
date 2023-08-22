import { Form, DatePicker, FormItemProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

export function AntRangePicker({
  name1,
  name2,
  label,
  required,
  formItemProps,
  rangePickerProps,
}: TAntRangePicker) {
  const requiredProps = required
    ? {
        name: 'Date',
        rules: [{ required: true, message: `Please select Dates` }],
      }
    : { name: 'Date', rules: [] };

  return (
    <>
      <Form.Item label={label} {...requiredProps} {...formItemProps}>
        <RangePicker {...rangePickerProps} />
      </Form.Item>

      <Form.Item name={name1} style={{ display: 'none' }} />
      <Form.Item name={name2} style={{ display: 'none' }} />
    </>
  );
}

type TAntRangePicker = {
  name1?: string;
  name2?: string;
  label?: string;
  required?: boolean;
  formItemProps?: FormItemProps;
  rangePickerProps?: RangePickerProps;
};
