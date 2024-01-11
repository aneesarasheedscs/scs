import { Row, Col, Card, Typography, DatePicker, theme, Form, Modal } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import CashReceiptPaymentTables from './tables';
import { useGetCashReceiptPayment, useCashBankBalancesSummary, useGetDateType } from '../queries';
import './style.scss';
import dayjs from 'dayjs';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import React, { useEffect, useState } from 'react';
import GeneralLedgerReport from '../GeneralLedger';

const { Title, Text } = Typography;
const { useToken } = theme;
const { useForm, useWatch } = Form;

const UserDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();
const FromDate = dayjs(FinancialYear?.Start_Period);
const ToDate = dayjs(FinancialYear?.End_Period);

const CashBalances: React.FC<{ FromDateProp?: Date; ToDateProp?: Date; CompanyId?: number }> = (props) => {
  const { FromDateProp, ToDateProp, CompanyId } = props;
  const { t } = useTranslation();
  const [form] = useForm<TAccountDashboardCriteria>();
  const formvalues = useWatch<TAccountDashboardCriteria>([], form);
  const { setFieldValue, getFieldValue } = form;

  useEffect(() => {
    if (FromDateProp !== undefined && ToDateProp !== undefined) {
      form.setFieldValue('FromDate', dayjs(FromDateProp));
      form.setFieldValue('ToDate', dayjs(ToDateProp));
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
  }, []);

  const [formState, setformState] = useState<TAccountDashboardCriteria>({ FromDate: FromDateProp, ToDate: ToDateProp });

  const {
    data: Cash_ReceiptPayment,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = useGetCashReceiptPayment(
    false,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : UserDetail?.CompanyId,
    formState
  );

  const {
    data: CashSummaryData,
    isError: isSummaryError,
    isLoading: isSummaryLoading,
    refetch: RefetchSummary,
  } = useCashBankBalancesSummary(
    false,
    2,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : UserDetail?.CompanyId,
    formState
  );

  useEffect(() => {
    if (formState.FromDate !== undefined && formState.ToDate != undefined) {
      refetch();
      RefetchSummary();
    }
  }, [formState]);

  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
  const handleAccountCodeClick = (AccountId: number) => {
    setSelectedAccount(AccountId);
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();

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

  return (
    <div className="cash-balances-container-cash">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8} style={{ marginLeft: '15px', padding: '10px' }}>
          <Text className="breadcrumbs">{t('account_reports')}</Text>
          <Text className="breadcrumbs">{'>'}</Text>
          <Text className="breadcrumbs" strong>
            {t('cash_balances')}
          </Text>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify={'space-around'}>
        <Col xs={23} md={24} lg={24} xxl={23}>
          <Card className="">
            <Form form={form} onFinish={onFinish}>
              <Row gutter={[16, 16]} justify={'space-around'}>
                <Col xxl={6} xl={7} xs={24} sm={24} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('date_type')}
                    name="DateType"
                    fieldLabel="DateType"
                    fieldValue="Id"
                    defaultValue={FromDateProp !== undefined ? undefined : '5'}
                    query={useGetDateType}
                    onChange={(value) => handleDateChange(value)}
                  />
                </Col>
                <Col xxl={5} xl={6} xs={24} sm={12} className="formfield form-container">
                  <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                </Col>
                <Col xxl={5} xl={5} xs={24} sm={11} className="formfield form-container">
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                </Col>

                <Col xxl={2} xl={3} xs={12} sm={8} className="btn-margin-top">
                  <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      <CashReceiptPaymentTables
        PaymentReceiptData={Cash_ReceiptPayment?.data?.Data?.Result}
        SummaryData={CashSummaryData?.data?.Data?.Result}
        IsSummaryError={isSummaryError}
        IsSummaryLoading={isSummaryLoading}
        IsCashPaymentError={isError}
        IsCashPaymentLoading={isLoading}
        handleAccountCodeClick={handleAccountCodeClick}
      />

      <Modal
        width={1800}
        key={SelectedAccount}
        open={SelectedAccount !== undefined}
        onCancel={() => setSelectedAccount(undefined)}
        destroyOnClose={true}
        footer={null}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
          <GeneralLedgerReport
            FromDateProp={form.getFieldValue('FromDate')}
            ToDateProp={form.getFieldValue('ToDate')}
            AccountIdProp={SelectedAccount}
            CompanyId={CompanyId}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CashBalances;
export type TAccountDashboardCriteria = {
  FromDate?: Date;
  ToDate?: Date;
};
