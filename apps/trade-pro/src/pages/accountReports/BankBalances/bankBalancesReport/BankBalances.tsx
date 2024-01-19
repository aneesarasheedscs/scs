import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Form, theme, Modal } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import BankPaymentTables from './bankTables';
import { useForm, useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import '../style.scss';
import { useCashBankBalancesSummary, useGetBankBalancesReceiptPayment, useGetDateType } from '../../queries';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import GeneralLedgerReport from '../../GeneralLedger';
const { Title, Text } = Typography;
const { useToken } = theme;
const UserDetail = storedUserDetail();

const BankBalances: React.FC<{ DateType?: string; FromDateProp?: Date; ToDateProp?: Date; CompanyId?: number }> = (
  props
) => {
  const { FromDateProp, ToDateProp, CompanyId, DateType } = props;
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
      form.setFieldValue('DateType', DateType);
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
  }, [form, DateType]);

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

  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
  const handleAccountCodeClick = (AccountId: number) => {
    setSelectedAccount(AccountId);
  };

  return (
    <div className="cash-balances-container-bank">
      <Row>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('bank_balances')}</h1>
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]} justify={'space-around'}>
        <Col xs={24} md={24} lg={24} xxl={23} xl={23} sm={23}>
          <Card className="">
            <Form form={form} onFinish={onFinish}>
              <Row gutter={[4, 4]} justify={'space-around'}>
                <Col xxl={6} xl={7} xs={24} sm={24} lg={9} className="formfield form-container">
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
                <Col xxl={5} xl={6} xs={24} sm={12} lg={7} className="formfield form-container">
                  <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                </Col>
                <Col xxl={5} xl={6} xs={24} sm={11} lg={7} className="formfield form-container">
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                </Col>

                <Col xxl={2} xl={3} xs={8} lg={5} className="btn-margin-top">
                  <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row> */}
      <Col style={{ overflowX: 'hidden' }}>
        <Row gutter={[16, 16]} justify={'space-around'}>
          <Col xs={23} md={24} lg={24} xxl={23}>
            <Card className="">
              <Form form={form} onFinish={onFinish}>
                <Col xxl={16} xl={22} lg={24} md={24} sm={24}>
                  <Row gutter={[16, 16]} justify={'space-between'}>
                    <Col xxl={7} xl={6} lg={7} md={7} xs={24} sm={24} className="formfield form-container">
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
                    <Col xxl={6} xl={6} lg={7} md={7} xs={24} sm={12} className="formfield form-container">
                      <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} xs={24} sm={11} className="formfield form-container">
                      <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                    </Col>

                    <Col xxl={3} xl={3} lg={3} md={3} xs={12} sm={7} className="btn-margin-top">
                      <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Card>
          </Col>
        </Row>

        <BankPaymentTables
          PaymentReceiptData={Bank_ReceiptPayment?.data?.Data?.Result}
          SummaryData={BankSummaryData?.data?.Data?.Result}
          IsSummaryError={isSummaryError}
          IsSummaryLoading={isSummaryLoading}
          IsReceiptPaymentError={isError}
          IsReceiptPaymentLoading={isLoading}
          handleAccountCodeClick={handleAccountCodeClick}
        />
      </Col>

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

export default BankBalances;

export type TAccountDashboardCriteria = {
  FromDate?: Date;
  ToDate?: Date;
  DateType?: string;
};
