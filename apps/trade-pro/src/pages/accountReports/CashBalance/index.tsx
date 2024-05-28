import { Row, Col,  Typography,theme, Form, Modal } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic, BackButton } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import CashReceiptPaymentTables from './tables';
import { useGetCashReceiptPayment, useCashBankBalancesSummary, useGetDateType } from '../queries';
import './style.scss';
import dayjs from 'dayjs';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import React, { useEffect, useState } from 'react';
import GeneralLedgerReport from '../GeneralLedger';
import { useAtom } from 'jotai';
import { useatomBackButton } from 'libs/ui/src/button/atom';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';

const { Title, Text } = Typography;
const { useToken } = theme;
const { useForm, useWatch } = Form;

const UserDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();
const FromDate = dayjs(FinancialYear?.Start_Period);
const ToDate = dayjs(FinancialYear?.End_Period);

const CashBalances: React.FC<{ DateType?: string; FromDateProp?: Date; ToDateProp?: Date; CompanyId?: number }> = (
  props
) => {
  const { FromDateProp, ToDateProp, CompanyId, DateType } = props;
  const { t } = useTranslation();
  const [form] = useForm<TAccountDashboardCriteria>();
  const formvalues = useWatch<TAccountDashboardCriteria>([], form);
  const { setFieldValue, getFieldValue } = form;
  const [backbtn, setBackbtn] = useAtom(useatomBackButton);

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
  console.log('DateType', DateType);
  const [formState, setformState] = useState<TAccountDashboardCriteria>({ FromDate: FromDateProp, ToDate: ToDateProp });

  const {
    data: Cash_ReceiptPayment,
    isError: isError,
    isLoading: isLoading,
    refetch,
    isFetching: isFetchingCashReceipt,
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
    isFetching: isFetchingCashSummary,
  } = useCashBankBalancesSummary(
    true,
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
  const setBackbtnFun = () => {
    setBackbtn(0);
  };
  return (
    <div className="cash-balances-container-cash" style={{paddingTop:5}}>
    <Row justify={'space-between'}>
      <Col xxl={24}>
      <Row justify={'space-between'} align={'middle'} >
        <Col xs={10} sm={10} md={12} lg={8} xl={14} xxl={3} style={{marginLeft:15}}>
          <h1 className="report_heading">{t('cash_balances')}</h1>
        </Col>
        <Col xs={23} md={24} lg={24} xxl={19} style={{padding:5}}> 
        <Form form={form} onFinish={onFinish}>
          <Col xxl={16} xl={22} lg={24} md={24} sm={24} style={{marginLeft:0,}} >
            <Row gutter={CriteriaRowGutter} justify={'space-between'}>
            <Col xs={24} sm={24} md={17} xl={18} xxl={15} lg={14} className="formfield form-container">
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
              <Col xxl={6} xl={6} lg={6} md={7} xs={24} sm={12} className="formfield form-container">
                <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
              </Col>
              <Col xxl={6} xl={6} lg={6} md={6} xs={24} sm={11} className="formfield form-container">
                <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
              </Col>

              <Col xxl={3} xl={3} lg={3} md={3} xs={12} sm={7} style={{marginTop:4}}>
                <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
              </Col>
            </Row>
          </Col>
        </Form>
   
    </Col>
        <Col xxl={1}  style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={true} />
        </Col>
      </Row>
      </Col>
    </Row>
      <Col style={{ overflowX: 'hidden', }}>
        <Row gutter={CriteriaRowGutter} justify={'space-around'}>
          {/* <Col xs={23} md={24} lg={24} xxl={23} style={{border:'1px solid'}}>
        
              <Form form={form} onFinish={onFinish}>
                <Col xxl={16} xl={22} lg={24} md={24} sm={24}>
                  <Row gutter={[16, 16]} justify={'space-between'}>
                    <Col xxl={7} xl={7} lg={9} md={10} xs={24} sm={24} className="formfield form-container">
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
                    <Col xxl={6} xl={6} lg={8} md={7} xs={24} sm={12} className="formfield form-container">
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
         
          </Col> */}
        </Row>

        <CashReceiptPaymentTables
          PaymentReceiptData={Cash_ReceiptPayment?.data?.Data?.Result}
          SummaryData={CashSummaryData?.data?.Data?.Result}
          IsSummaryError={isSummaryError}
          IsSummaryLoading={isSummaryLoading}
          IsCashPaymentError={isError}
          IsCashPaymentLoading={isLoading}
          RefetchSummary={RefetchSummary}
          refetch={refetch}
          isFetchingCashSummary={isFetchingCashSummary}
          isFetchingCashReceipt={isFetchingCashReceipt}
          handleAccountCodeClick={handleAccountCodeClick}
        />
      </Col>

      <Modal
        width={1300}
        key={SelectedAccount}
        open={SelectedAccount !== undefined}
        onCancel={() => setSelectedAccount(undefined)}
        destroyOnClose={true}
        footer={null}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div style={{ maxHeight: '100%', overflowX: 'hidden' }}>
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
  DateType?: string;
};
