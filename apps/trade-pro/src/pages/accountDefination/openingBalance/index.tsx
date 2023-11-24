import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@scs/ui';
import { Card, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import OpeningBalance from './openingBalance';

const { useForm } = Form;

const OpeningBalanceReport = () => {
  const onFinish = () => {
    // Handle form submission
  };

  const { t } = useTranslation();

  return (
    <div style={{ background: '#fff' }}>
      <OpeningBalance />
    </div>
  );
};

export default OpeningBalanceReport;
