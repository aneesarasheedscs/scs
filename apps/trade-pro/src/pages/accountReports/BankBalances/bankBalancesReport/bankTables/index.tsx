import { AntTable } from '@scs/ui';
import { Card, Col, DatePicker, Divider, Row, Typography, theme } from 'antd';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { BankBalancesSummaryBank } from './SummaryColumns';
import { columnsBankBalance, columnsBankPayment } from './BankColumns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useToken } = theme;

const BankPaymentTables: React.FC<{
  PaymentReceiptData: any;
  SummaryData: any;
  IsReceiptPaymentError: boolean;
  IsReceiptPaymentLoading: boolean;
  IsSummaryError: boolean;
  IsSummaryLoading: boolean;
  handleAccountCodeClick: any;
}> = (props) => {
  const {
    PaymentReceiptData,
    SummaryData,
    IsReceiptPaymentError,
    IsReceiptPaymentLoading,
    IsSummaryError,
    IsSummaryLoading,
    handleAccountCodeClick,
  } = props;
  const { t } = useTranslation();

  const fillteredTableData = PaymentReceiptData?.filter((item: any) => item.TranType === 'Receipts');
  const fillteredTableData2 = PaymentReceiptData?.filter((item: any) => item.TranType === 'Payments');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Col xl={22} style={{ marginLeft: '3%', marginBottom: '0.5%' }}>
        {/* <Divider /> */}
      </Col>
      <Row gutter={[24, 24]}>
        <Col xl={23} xs={23} md={24} className="" style={{ marginLeft: '2%' }}>
          <Title className="section-title" level={4}>
            {t('summary')}
          </Title>
          <AntTable
            columns={BankBalancesSummaryBank(t, handleAccountCodeClick)}
            isError={IsSummaryError}
            isLoading={IsSummaryLoading}
            data={SummaryData || []}
            scroll={{ x: 'max-content' }}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify={'space-between'} style={{ marginLeft: 20, width: '97%' }}>
        <Col xl={12} xs={23} md={12} className="">
          <Title className="section-title" level={3}>
            {t('bank_receipt')}
          </Title>
          <AntTable
            columns={columnsBankBalance(t)}
            data={fillteredTableData}
            isError={IsReceiptPaymentError}
            isLoading={IsReceiptPaymentLoading}
            scroll={{ y: convertVhToPixels('35vh') }}
          />
        </Col>
        <Col xl={12} xs={23} md={12} className="">
          <Title className="section-title" level={3}>
            {t('bank_payment')}
          </Title>
          <AntTable
            columns={columnsBankPayment(t)}
            data={fillteredTableData2}
            isError={IsReceiptPaymentError}
            isLoading={IsReceiptPaymentLoading}
            scroll={{ y: convertVhToPixels('35vh') }}
          />
        </Col>
      </Row>
    </>
  );
};

export default BankPaymentTables;
