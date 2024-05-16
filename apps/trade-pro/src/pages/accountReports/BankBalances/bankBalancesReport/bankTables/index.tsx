import { AntTable } from '@scs/ui';
import { Col, Row, Typography, theme } from 'antd';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { BankBalancesSummaryBank } from './SummaryColumns';
import { columnsBankBalance, columnsBankPayment } from './BankColumns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const { Title } = Typography;

const BankPaymentTables: React.FC<{
  PaymentReceiptData: any;
  SummaryData: any;
  IsReceiptPaymentError: boolean;
  IsReceiptPaymentLoading: boolean;
  IsSummaryError: boolean;
  IsSummaryLoading: boolean;
  handleAccountCodeClick: any;
  RefetchSummary: any;
  refetch: any;
  isFetchingBankSummary: any;
  isFetchingBankRecipt: any;
}> = (props) => {
  const {
    PaymentReceiptData,
    SummaryData,
    IsReceiptPaymentError,
    IsReceiptPaymentLoading,
    IsSummaryError,
    IsSummaryLoading,
    handleAccountCodeClick,
    RefetchSummary,
    refetch,
    isFetchingBankSummary,
    isFetchingBankRecipt,
  } = props;
  const { t } = useTranslation();

  const fillteredTableData = PaymentReceiptData?.filter((item: any) => item.TranType === 'Receipts');
  const fillteredTableData2 = PaymentReceiptData?.filter((item: any) => item.TranType === 'Payments');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const CriteriaString =()=>{
    return(
      <Row style={{border: '1px solid #25A7DF',padding:5,borderRadius:5}}>
        {SummaryData?.[0]?.ReportParamCSV}
      </Row>
    )
  }

  return (
    <>
      <Col xl={22} style={{ marginLeft: '3%', marginBottom: '0.5%' }}></Col>
      <Row gutter={[24, 24]}>
        <Col xl={23} xs={23} md={24} className="" style={{ marginLeft: '2%' }}>
          <Title className="section-title" level={4}>
            {t('summary')}
          </Title>
          <AntTable
            columns={BankBalancesSummaryBank(t, handleAccountCodeClick)}
            isError={IsSummaryError}
            isLoading={IsSummaryLoading || isFetchingBankSummary}
            data={SummaryData || []}
        searchCriteriaReport={SummaryData?.[0]?.ReportParamCSV? <CriteriaString/>:''}
            scroll={{ y: convertVhToPixels('45vh') }}
            refetch={RefetchSummary}
            numberOfSkeletons={12}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify={'space-between'} style={{ marginLeft: 20, width: '97%' }}>
        <Col xl={12} xs={23} md={12} className="">
          <Title className="section-title" level={4}>
            {t('bank_receipt')}
          </Title>
          <AntTable
            columns={columnsBankBalance(t)}
            data={fillteredTableData}
            isError={IsReceiptPaymentError}
            isLoading={IsReceiptPaymentLoading || isFetchingBankRecipt}
            scroll={{ y: convertVhToPixels('35vh') }}
            refetch={refetch}
          />
        </Col>
        <Col xl={12} xs={23} md={12} className="">
          <Title className="section-title" level={4}>
            {t('bank_payment')}
          </Title>
          <AntTable
            columns={columnsBankPayment(t)}
            data={fillteredTableData2}
            isError={IsReceiptPaymentError}
            isLoading={IsReceiptPaymentLoading || isFetchingBankRecipt}
            scroll={{ y: convertVhToPixels('35vh') }}
            refetch={refetch}
          />
        </Col>
      </Row>
    </>
  );
};

export default BankPaymentTables;
