import { Row, Col, Card, Typography, DatePicker, theme, Form } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import CashReceiptPaymentTables from './tables';
import {
  useGetCashReceiptPayment,
  useCashBankBalancesSummary,
  useGetDateType,
  useGetBranchesByUserId,
  useGetMasterBranchByUserId,
} from '../queries';
import './style.scss';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import React, { useEffect } from 'react';

const { Title, Text } = Typography;
const { useToken } = theme;
const { useForm, useWatch } = Form;

const CashBalances: React.FC<{ FromDateProp?: Date; ToDateProp?: Date }> = (props) => {
  const { FromDateProp, ToDateProp } = props;
  const { t } = useTranslation();
  const [form] = useForm<TAccountDashboardCriteria>();
  const formvalues = useWatch<TAccountDashboardCriteria>([], form);
  const { setFieldValue } = form;

  useEffect(() => {
    setFieldValue('FromDate', dayjs(FromDateProp));
    setFieldValue('ToDate', dayjs(ToDateProp));
  });

  const {
    data: Cash_ReceiptPayment,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = useGetCashReceiptPayment(
    FromDateProp !== undefined && ToDateProp !== undefined ? true : false,
    form.getFieldsValue()
  );

  const {
    data: CashSummaryData,
    isError: isSummaryError,
    isLoading: isSummaryLoading,
    refetch: RefetchSummary,
  } = useCashBankBalancesSummary(
    FromDateProp !== undefined && ToDateProp !== undefined ? true : false,
    2,
    form.getFieldsValue()
  );

  const FinancialYear = storedFinancialYear();

  const FromDate = dayjs(FinancialYear?.Start_Period);
  const ToDate = dayjs(FinancialYear?.End_Period);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onFinish = (_: TAccountDashboardCriteria) => {
    refetch();
    RefetchSummary();
  };

  const handleDateChange = (Id: number) => {
    let fromDate, toDate;
    if (Id == 1) {
      fromDate = dayjs(new Date()); // Current date
      toDate = dayjs(new Date()); // Current date
    } else if (Id == 2) {
      //Week
      const sevenDaysAgo = dayjs(new Date()).subtract(7, 'day').toDate();
      fromDate = sevenDaysAgo;
      toDate = dayjs(new Date()); // Current date
    } else if (Id == 3) {
      //Month
      fromDate = dayjs(new Date()).startOf('month').toDate();
      toDate = dayjs(new Date()).endOf('month').toDate();
    } else if (Id == 4) {
      //Year
      fromDate = dayjs().year(new Date().getFullYear()).startOf('year').toDate();
      toDate = dayjs().year(new Date().getFullYear()).endOf('year').toDate();
    } else if (Id == 5) {
      // Financial Year
      fromDate = FromDate;
      toDate = ToDate;
    }
    setFieldValue('FromDate', dayjs(fromDate));
    setFieldValue('ToDate', dayjs(toDate));
  };

  return (
    <div className="cash-balances-container-cash">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={8} style={{ marginLeft: '15px' }}>
          <Text className="breadcrumbs">{t('account_reports')}</Text>
          <Text className="breadcrumbs">{'>'}</Text>
          <Text className="breadcrumbs" strong>
            {t('cash_balances')}
          </Text>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <div>
          <Col xs={24} md={24} lg={24}>
            <Card className="cash-balances-card">
              <Form form={form} onFinish={onFinish}>
                <Row gutter={16} justify={'space-evenly'}>
                  <Col xl={4} className="formfield">
                    <AntSelectDynamic
                      bordered={false}
                      label={t('date_type')}
                      name="DateType"
                      fieldLabel="DateType"
                      fieldValue="Id"
                      query={useGetDateType}
                      onChange={(value) => handleDateChange(value)}
                    />
                  </Col>
                  <Col xl={4} className="formfield">
                    <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                  </Col>
                  <Col xl={4} className="formfield">
                    <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                  </Col>
                  <Col xl={6} className="formfield">
                    <AntSelectDynamic
                      bordered={false}
                      label={t('master_branch')}
                      name="MasterBranch"
                      fieldLabel="CompName"
                      fieldValue="Id"
                      query={useGetMasterBranchByUserId}
                    />
                  </Col>

                  <Col xl={2}>
                    <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </div>
      </Row>

      <CashReceiptPaymentTables
        PaymentReceiptData={Cash_ReceiptPayment?.data?.Data?.Result}
        SummaryData={CashSummaryData?.data?.Data?.Result}
        IsSummaryError={isSummaryError}
        IsSummaryLoading={isSummaryLoading}
        IsCashPaymentError={isError}
        IsCashPaymentLoading={isLoading}
      />
    </div>
  );
};

export default CashBalances;
export type TAccountDashboardCriteria = {
  FromDate: Date;
  ToDate: Date;
};