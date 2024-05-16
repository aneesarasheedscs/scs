import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, theme, Form, Checkbox, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@scs/ui';
import { useGetCityName, useGetGroupAccount } from '../queryOptions';
import { TPayablesReceivablesCriteria } from '../types';
import { useGetCustomGroup, useGetDateTypes } from '../../queries';
import { usePostPayablesReceivables } from '../quries';
import dayjs from 'dayjs';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import PayablesReceivablesTable from '../Table/tables';
import './style.scss';
import GeneralLedgerReport from '../../GeneralLedger';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
const { Title, Text } = Typography;
const { useToken } = theme;

const { useForm, useWatch } = Form;
const UserDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();
const FromDate = dayjs(FinancialYear?.Start_Period);
const ToDate = dayjs(FinancialYear?.End_Period);

const PayablesReceivables: React.FC<{
  AccountClassId?: number;
  FromDateProp?: Date;
  ToDateProp?: Date;
  CompanyIdProp?: number;
}> = (props) => {
  const { AccountClassId, FromDateProp, ToDateProp, CompanyIdProp } = props;
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  const [form] = useForm<TPayablesReceivablesCriteria>();
  const formvalues = useWatch<TPayablesReceivablesCriteria>([], form);
  const { setFieldValue } = form;

  useEffect(() => {
    if (FromDateProp !== undefined && ToDateProp !== undefined) {
      form.setFieldValue('FromDate', dayjs(FromDateProp));
      form.setFieldValue('ToDate', dayjs(ToDateProp));
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
    form.setFieldValue('OnlyDebitAmountAction', AccountClassId == 2 ? true : false);
    form.setFieldValue('OnlyCreditAmountAction', AccountClassId == 3 ? true : false);
  }, []);

  const [formState, setformState] = useState<TPayablesReceivablesCriteria>({
    FromDate: FromDateProp,
    ToDate: ToDateProp,
    BalanceFrom: 0,
    BalanceTo: 0,
    CityId: 0,
    Status: '',
    CustomGroupId: 0,
    IsApproved: false,
    ReportTypeId: AccountClassId == 2 ? 2 : AccountClassId == 3 ? 1 : 0,
    ApprovedFilter: 'All',
    DateType: 5,
    OnlyCreditAmountAction: AccountClassId == 3 ? true : false,
    OnlyDebitAmountAction: AccountClassId == 2 ? true : false,
  });

  const {
    data: dataSource,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = usePostPayablesReceivables(
    true,
    AccountClassId,
    CompanyIdProp !== undefined && CompanyIdProp > 0 ? CompanyIdProp : UserDetail?.CompanyId,
    formState
  );

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

  const onChangeTradeParties = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      if (AccountClassId == 2) setFieldValue('ReportTypeId', 2); // For Sale
      else {
        setFieldValue('ReportTypeId', 1); //For Purchase
      }
    } else {
      setFieldValue('ReportTypeId', 0);
    }
  };

  useEffect(() => {
    if (formState.FromDate !== undefined && formState.ToDate != undefined) {
      refetch();
    }
  }, [formState]);

  const onFinish = (_: TPayablesReceivablesCriteria) => {
    _.Status = _.Status.toString();
    setformState(_);
  };

  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
  const handleAccountCodeClick = (AccountId: number) => {
    setSelectedAccount(AccountId);
  };

  return (
    <div className="cash-balances-container">


      <Row style={{ marginTop: '1%', marginLeft: '10px' }}>
        <div>
          <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
            <Form name="basic" form={form} onFinish={onFinish} layout="inline">
              <Row gutter={CriteriaRowGutter} justify={'space-between'}>
                <Col xl={6} className="formfields" style={{}} >
                  <AntSelectDynamic
                    bordered={false}
                    label={t('date_type')}
                    name="DateType"
                    fieldLabel="DateType"
                    fieldValue="Id"
                    defaultValue={FromDateProp !== undefined ? undefined : '5'}
                    query={useGetDateTypes}
                    onChange={(value) => handleDateChange(value)}
                  />
                </Col>

                <Col xl={8} className="formfields" style={{}} offset={1}>
                  <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
                </Col>
                <Col xl={8} className="formfields" offset={1} style={{}}>
                  <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
                </Col>

                <Col span={11} style={{}} className="formfields">
                  <AntInput size="middle" label={t('balance_from')} name="BalanceFrom" bordered={false} />
                </Col>
                <Col span={12} style={{}} className="formfields" offset={1}>
                  <AntInput size="middle" label={t('balance_to')} name="BalanceTo" bordered={false} />
                </Col>

                <Col xl={11} style={{}} className="formfields">
                  <AntSelectDynamic
                    bordered={false}
                    mode="multiple"
                    size="middle"
                    label={t('group_account')}
                    name="Status"
                    fieldLabel="AccountTitle"
                    fieldValue="AccountCode"
                    query={() =>
                      useGetGroupAccount(
                        AccountClassId,
                        CompanyIdProp !== undefined ? CompanyIdProp : UserDetail?.CompanyId
                      )
                    }
                  />
                </Col>

                <Col xl={12} style={{}} className="formfields" offset={1}>
                  <AntSelectDynamic
                    bordered={false}
                    size="middle"
                    label={t('custom_group')}
                    name="CustomGroupId"
                    fieldLabel="AcLookUpsDescription"
                    fieldValue="Id"
                    query={() => useGetCustomGroup(CompanyIdProp !== undefined ? CompanyIdProp : UserDetail?.CompanyId)}
                  />
                </Col>

                <Col xl={11} style={{}} className="formfields">
                  <AntSelectDynamic
                    bordered={false}
                    size="middle"
                    label={t('city_name')}
                    name="CityId"
                    fieldLabel="CityName"
                    fieldValue="Id"
                    query={() => useGetCityName(CompanyIdProp !== undefined ? CompanyIdProp : UserDetail?.CompanyId)}
                  />
                </Col>
              </Row>

              <Col xs={12} sm={6} md={6} className="Col-margin-top">
                <Form.Item
                  name="OnlyCreditAmountAction"
                  valuePropName="checked"
                  initialValue={AccountClassId == 3 ? true : false}
                >
                  <Checkbox>{t('only_credit_amount')}</Checkbox>
                </Form.Item>
              </Col>

              <Col xs={12} sm={6} md={6} className="Col-margin-top">
                <Form.Item
                  name="OnlyDebitAmountAction"
                  valuePropName="checked"
                  initialValue={AccountClassId == 2 ? true : false}
                >
                  <Checkbox>{t('only_debit_amount')}</Checkbox>
                </Form.Item>
                {/* <Form.Item name="OnlyDebitAmountAction">
                  <Checkbox checked={form.getFieldValue('OnlyDebitAmountAction')} onChange={onChangeOnlyDebitAmount}>
                    {t('only_debit_amount')}
                  </Checkbox>
                </Form.Item> */}
              </Col>

              <Col xs={12} sm={6} md={5} className="Col-margin-top">
                <Form.Item name="ReportTypeId">
                  <Checkbox checked={form.getFieldValue('ReportTypeId')} onChange={onChangeTradeParties}>
                    {t('trade_parties')}
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col xs={12} sm={6} md={7} className="Col-margin-top">
                <Form.Item name="IsApproved" valuePropName="checked" initialValue={false}>
                  <Checkbox>{t('approved_transactions')}</Checkbox>
                </Form.Item>
              </Col>

        <Col xxl={24} style={{display:'flex',justifyContent:'end'}}>
      
                <Col xxl={3} xs={12} sm={6} md={24} className="Col-margin-top" >
                  <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                </Col>
              
        </Col>
            </Form>
          </SearchCriteriaWrapper>
        </div>
      </Row>

      <PayablesReceivablesTable
        Data={dataSource?.data?.Data?.Result}
        IsError={isError}
        IsLoading={isLoading}
        // refetch={refetch}
        handleAccountCodeClick={handleAccountCodeClick}
      />

      <Modal
        width={1300}
        key={SelectedAccount}
        open={SelectedAccount !== undefined}
        onCancel={() => setSelectedAccount(undefined)}
        destroyOnClose={true}
        footer={null}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '20px', marginRight: '20px' }}
      >
        <div style={{ maxHeight: '100%', overflowX: 'hidden' }}>
          <GeneralLedgerReport
            FromDateProp={form.getFieldValue('FromDate')}
            ToDateProp={form.getFieldValue('ToDate')}
            AccountIdProp={SelectedAccount}
            CompanyId={CompanyIdProp}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PayablesReceivables;
