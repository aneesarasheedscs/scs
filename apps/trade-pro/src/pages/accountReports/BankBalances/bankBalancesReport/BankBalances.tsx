import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Form, theme } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import BankPaymentTables from './bankTables';
import { useForm, useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import '../style.scss';
import { useCashBankBalancesSummary, useGetBankBalancesReceiptPayment, useGetDateType } from '../../queries';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
const { Title, Text } = Typography;
const { useToken } = theme;
const UserDetail = storedUserDetail();

const BankBalances: React.FC<{ FromDateProp?: Date; ToDateProp?: Date; CompanyId?: number }> = (props) => {
  const { FromDateProp, ToDateProp, CompanyId } = props;
  const { t } = useTranslation();
  const [form] = useForm<TAccountDashboardCriteria>();
  const { setFieldValue, getFieldValue } = form;
  const formvalues = useWatch<TAccountDashboardCriteria>([], form);

  const [formState, setformState] = useState<TAccountDashboardCriteria>({ FromDate: FromDateProp, ToDate: ToDateProp });

  const FinancialYear = storedFinancialYear();
  const FromDate = dayjs(FinancialYear?.Start_Period);
  const ToDate = dayjs(FinancialYear?.End_Period);

  useEffect(() => {
    if (FromDateProp !== undefined && ToDateProp !== undefined) {
      form.setFieldValue('FromDate', dayjs(FromDateProp));
      form.setFieldValue('ToDate', dayjs(ToDateProp));
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
  }, []);

  const {
    data: Bank_ReceiptPayment,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = useGetBankBalancesReceiptPayment(
    false,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : UserDetail?.CompanyId,
    formState
  );

  const {
    data: BankSummaryData,
    isError: isSummaryError,
    isLoading: isSummaryLoading,
    refetch: RefetchSummary,
  } = useCashBankBalancesSummary(
    false,
    15,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : UserDetail?.CompanyId,
    formState
  );

  useEffect(() => {
    if (formState.FromDate !== undefined && formState.ToDate != undefined) {
      refetch();
      RefetchSummary();
    }
  }, [formState]);

  const onFinish = (_: TAccountDashboardCriteria) => {
    setformState(form.getFieldsValue());
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

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div className="cash-balances-container-bank">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={8} style={{ marginLeft: '15px' }}>
          <Text className="breadcrumbss">{t('account_reports')}</Text>
          <Text className="breadcrumbss">{'>'}</Text>
          <Text className="breadcrumbss" strong>
            {t('bank_balances')}
          </Text>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <div>
          <Col xs={24} md={24} lg={24}>
            <Card className="bank-balances-card">
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

                  {/* <Col xl={6} className="formfield">
                    <AntSelectDynamic
                      bordered={false}
                      label={t('master_branch')}
                      name="MasterBranch"
                      fieldLabel="CompName"
                      fieldValue="Id"
                      query={useGetMasterBranchByUserId}
                    />
                  </Col> */}

                  <Col xl={2}>
                    <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </div>
      </Row>
      <BankPaymentTables
        PaymentReceiptData={Bank_ReceiptPayment?.data?.Data?.Result}
        SummaryData={BankSummaryData?.data?.Data?.Result}
        IsSummaryError={isSummaryError}
        IsSummaryLoading={isSummaryLoading}
        IsReceiptPaymentError={isError}
        IsReceiptPaymentLoading={isLoading}
      />
    </div>
  );
};

export default BankBalances;

export type TAccountDashboardCriteria = {
  FromDate?: Date;
  ToDate?: Date;
};
