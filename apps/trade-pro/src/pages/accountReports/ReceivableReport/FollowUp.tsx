import { Divider, Row, Col, Card, Typography, DatePicker, DatePickerProps, theme, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import HeaderSection from './HeaderSection';
import FollowUpTable from './table/FollowUpTable';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useToken } = theme;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const FollowUp = () => {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <div className="cash-balances-container">
      <HeaderSection />
      <FollowUpTable />
    </div>
  );
};

export default FollowUp;
