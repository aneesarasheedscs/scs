import { AntTable } from '@scs/ui';
import { Col, DatePicker, Divider, Row, Typography, theme } from 'antd';
import { CashBalancesSummaryCash } from './SummaryColumns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columnsCashBalance, columnsCashPayment } from './CashColumns';
import { useTranslation } from 'react-i18next';
import React from 'react';
import './style.scss';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useToken } = theme;

const CashReceiptPaymentTables: React.FC<{
  PaymentReceiptData: any;
  SummaryData: any;
  IsCashPaymentError: boolean;
  IsCashPaymentLoading: boolean;
  IsSummaryError: boolean;
  IsSummaryLoading: boolean;
}> = (props) => {
  const {
    PaymentReceiptData,
    SummaryData,
    IsCashPaymentError,
    IsCashPaymentLoading,
    IsSummaryError,
    IsSummaryLoading,
  } = props;
  const { t } = useTranslation();

  const filteredTableData = PaymentReceiptData?.filter((item: any) => item.TranType === 'Receipts');
  const filteredTableData2 = PaymentReceiptData?.filter((item: any) => item.TranType === 'Payments');
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Col xl={22} style={{ marginLeft: '3%' }}>
        <Divider />
      </Col>
      <Row gutter={[24, 24]}>
        <Col xl={23} xs={24} md={24} className="summary-card" style={{ marginLeft: '2%' }}>
          <AntTable
            columns={CashBalancesSummaryCash(t)}
            isError={IsSummaryError}
            isLoading={IsSummaryLoading}
            data={SummaryData || []}
            scroll={{ x: 'max-content' }}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify={'space-between'} style={{ marginLeft: 20, width: '97%' }}>
        <Col xl={12} xs={24} md={12} className="section-card">
          <Title className="section-title" level={3}>
            {t('cash_receipt')}
          </Title>

          <AntTable
            columns={columnsCashBalance(t)}
            data={filteredTableData || []}
            isError={IsCashPaymentError}
            isLoading={IsCashPaymentLoading}
            scroll={{ y: convertVhToPixels('35vh') }}
          />
        </Col>
        <Col xl={12} xs={24} md={12} className="section-card">
          <Title className="section-title" level={3}>
            {t('cash_payment')}
          </Title>
          <AntTable
            columns={columnsCashPayment(t)}
            data={filteredTableData2 || []}
            isError={IsCashPaymentError}
            isLoading={IsCashPaymentLoading}
            scroll={{ y: convertVhToPixels('35vh') }}
          />
        </Col>
      </Row>
    </>
  );
};

export default CashReceiptPaymentTables;