import { AntTable } from '@scs/ui';
import { Col, DatePicker, Divider, Row, Typography, theme } from 'antd';
import { CashBalancesSummaryCash } from './SummaryColumns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columnsCashBalance, columnsCashPayment } from './CashColumns';
import { useTranslation } from 'react-i18next';
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
  handleAccountCodeClick: any;
  refetch: any;
  RefetchSummary: any;
  isFetchingCashSummary: any;
  isFetchingCashReceipt: any;

}> = (props) => {
  const {
    PaymentReceiptData,
    SummaryData,
    IsCashPaymentError,
    IsCashPaymentLoading,
    IsSummaryError,
    IsSummaryLoading,
    handleAccountCodeClick,
    RefetchSummary,
    refetch,
    isFetchingCashSummary,
    isFetchingCashReceipt,
  } = props;
  const { t } = useTranslation();

  const filteredTableData = PaymentReceiptData?.filter((item: any) => item.TranType === 'Receipts');
  const filteredTableData2 = PaymentReceiptData?.filter((item: any) => item.TranType === 'Payments');
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const CriteriaString = () => {
    return(
      <Row style={{border: '1px solid #25A7DF',padding:7,borderRadius:5}}>
        <h5>{SummaryData?.[0]?.ReportParamCSV}</h5>
      </Row>
    )
  }

  return (
    <>
      <Col xl={22} style={{ marginLeft: '3%', marginBottom: '0.5%' }}>
        {/* <Divider /> */}
      </Col>
      <Row gutter={[24, 24]}>
        <Col xl={23} xs={23} md={24} style={{ marginLeft: '2%' }}>
          <Title className="section-title" level={4}>
            {t('summary')}
          </Title>
          <AntTable
            rowKey={'AccountId'}
            columns={CashBalancesSummaryCash(t, handleAccountCodeClick)}
            isError={IsSummaryError}
            isLoading={IsSummaryLoading || isFetchingCashSummary}
            searchCriteriaReport={SummaryData?.[0]?.ReportParamCSV? <CriteriaString/>:''}
            data={SummaryData || []}
            // scroll={{ x: 'max-content' }}
            scroll={{ y: convertVhToPixels('20vh') }}
            refetch={RefetchSummary}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify={'space-between'} style={{ marginLeft: 20, width: '97%' }}>
        <Col xl={12} xs={23} md={12} className="">
          <Title className="section-title" level={4}>
            {t('cash_receipt')}
          </Title>

          <AntTable
            columns={columnsCashBalance(t)}
            data={filteredTableData || []}
            isError={IsCashPaymentError}
            isLoading={IsCashPaymentLoading || isFetchingCashReceipt}
            scroll={{ y: convertVhToPixels('35vh') }}
            refetch={refetch}
          />
        </Col>
        <Col xl={12} xs={23} md={12} className="">
          <Title className="section-title" level={4}>
            {t('cash_payment')}
          </Title>
          <AntTable
            columns={columnsCashPayment(t)}
            data={filteredTableData2 || []}
            isError={IsCashPaymentError}
            isLoading={IsCashPaymentLoading}
            refetch={refetch}
            scroll={{ y: convertVhToPixels('37vh') }}
          />
        </Col>
      </Row>
    </>
  );
};

export default CashReceiptPaymentTables;
