import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, theme, Form, Checkbox } from 'antd';
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
const { Title, Text } = Typography;
const { useToken } = theme;
const { useForm, useWatch } = Form;
const UserDetail = storedUserDetail();
const PayablesReceivables: React.FC<{
  AccountClassId?: number;
  FromDateProp?: Date;
  ToDateProp?: Date;
  CompanyId?: number;
}> = (props) => {
  const { AccountClassId, FromDateProp, ToDateProp, CompanyId } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  const [form] = useForm<TPayablesReceivablesCriteria>();
  const formvalues = useWatch<TPayablesReceivablesCriteria>([], form);

  const FinancialYear = storedFinancialYear();
  const FromDate = dayjs(FinancialYear?.Start_Period);
  const ToDate = dayjs(FinancialYear?.End_Period);

  const { setFieldValue, getFieldValue } = form;
  const {
    token: { colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if ((FromDateProp !== undefined || FromDateProp !== null) && (ToDateProp !== undefined || ToDateProp !== null)) {
      const fromDate = getFieldValue('FromDate');
      const todate = getFieldValue('ToDate');
      if (
        (fromDate == null || fromDate == undefined || fromDate != FromDateProp) &&
        (todate == null || todate == undefined || todate != ToDateProp)
      ) {
        setFieldValue('FromDate', dayjs(FromDateProp));
        setFieldValue('ToDate', dayjs(ToDateProp));
      }
    }
    refetch();
  }, [props]);

  const {
    data: dataSource,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = usePostPayablesReceivables(
    false,
    AccountClassId,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : UserDetail?.CompanyId,
    form.getFieldsValue()
  );

  const onFinish = (_: TPayablesReceivablesCriteria) => {
    refetch().then(() => handleClose());
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

  const handleChange = (value: string[]) => {
    let statusList: string = '';
    for (let index = 0; index < value.length; index++) {
      statusList += value[index] + ',';
    }
    if (statusList.length > 0) {
      setFieldValue('status', statusList);
    } else {
      setFieldValue('status', '');
    }
    console.log(`selected ${statusList}`);
  };

  const onChangeOnlyCreditAmount = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('OnlyCreditAmountAction', true);
    } else {
      setFieldValue('OnlyCreditAmountAction', false);
    }
  };
  const onChangeOnlyDebitAmount = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('OnlyDebitAmountAction', true);
    } else {
      setFieldValue('OnlyDebitAmountAction', false);
    }
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

  const onChangeApprovedTransactions = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('IsApproved', true);
    } else {
      setFieldValue('IsApproved', false);
    }
  };

  return (
    <div className="cash-balances-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={8} xl={23} style={{ marginLeft: '15px', display: 'flex', alignItems: 'end' }}>
          <Text className="breadcrumb">{t('account_reports')}</Text>
          <Text className="breadcrumb">{'>'}</Text>
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Text strong>
              {t(
                AccountClassId == 2
                  ? 'receivables_report_accounts_classification_wise'
                  : 'payables_report_accounts_classification_wise'
              )}
            </Text>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: '20px', marginLeft: '10px' }}>
        <div>
          <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
            <Form name="basic" form={form} onFinish={onFinish} initialValues={formvalues} layout="inline">
              <Row gutter={16}>
                <Col xl={14} className="formfield" style={{ marginTop: '10px' }}>
                  <AntSelectDynamic
                    bordered={false}
                    label={t('date_type')}
                    name="DateType"
                    fieldLabel="DateType"
                    fieldValue="Id"
                    query={useGetDateTypes}
                    onChange={(value) => handleDateChange(value)}
                  />
                </Col>

                <Col xl={11} className="formfield" style={{ marginTop: '10px' }}>
                  <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
                </Col>
                <Col xl={12} className="formfield" offset={1} style={{ marginTop: '10px' }}>
                  <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
                </Col>

                <Col span={11} style={{ marginTop: '10px' }} className="formfield">
                  <AntInput size="middle" label={t('balance_from')} name="BalanceFrom" bordered={false} />
                </Col>
                <Col span={12} style={{ marginTop: '10px' }} className="formfield" offset={1}>
                  <AntInput size="middle" label={t('balance_to')} name="BalanceTo" bordered={false} />
                </Col>

                <Col xl={11} style={{ marginTop: '10px' }} className="formfield">
                  <AntSelectDynamic
                    bordered={false}
                    mode="multiple"
                    size="middle"
                    label={t('group_account')}
                    name="Status"
                    fieldLabel="AccountTitle"
                    fieldValue="AccountCode"
                    query={() => useGetGroupAccount(AccountClassId)}
                    onChange={handleChange}
                  />
                </Col>

                <Col xl={12} style={{ marginTop: '10px' }} className="formfield" offset={1}>
                  <AntSelectDynamic
                    bordered={false}
                    size="middle"
                    label={t('custom_group')}
                    name="CustomGroupId"
                    fieldLabel="AcLookUpsDescription"
                    fieldValue="Id"
                    query={useGetCustomGroup}
                  />
                </Col>

                <Col xl={14} style={{ marginTop: '10px' }} className="formfield">
                  <AntSelectDynamic
                    bordered={false}
                    size="middle"
                    label={t('city_name')}
                    name="CityId"
                    fieldLabel="CityName"
                    fieldValue="Id"
                    query={useGetCityName}
                  />
                </Col>
              </Row>

              <Col xs={12} sm={6} md={6} className="Col-margin-top">
                <Form.Item name="OnlyCreditAmountAction">
                  <Checkbox checked={form.getFieldValue('OnlyCreditAmountAction')} onChange={onChangeOnlyCreditAmount}>
                    {t('only_credit_amount')}
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col xs={12} sm={6} md={6} className="Col-margin-top">
                <Form.Item name="OnlyDebitAmountAction">
                  <Checkbox checked={form.getFieldValue('OnlyDebitAmountAction')} onChange={onChangeOnlyDebitAmount}>
                    {t('only_debit_amount')}
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col xs={12} sm={6} md={5} className="Col-margin-top">
                <Form.Item name="ReportTypeId">
                  <Checkbox checked={form.getFieldValue('ReportTypeId')} onChange={onChangeTradeParties}>
                    {t('trade_parties')}
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col xs={12} sm={6} md={7} className="Col-margin-top">
                <Form.Item name="IsApproved">
                  <Checkbox checked={form.getFieldValue('IsApproved')} onChange={onChangeApprovedTransactions}>
                    {t('approved_transactions')}
                  </Checkbox>
                </Form.Item>
              </Col>

              <Row gutter={24} justify={'center'}>
                <Col xs={12} sm={6} md={24} className="Col-margin-top">
                  <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                </Col>
              </Row>
            </Form>
          </SearchCriteriaWrapper>
        </div>
      </Row>

      <PayablesReceivablesTable Data={dataSource?.data?.Data?.Result} IsError={isError} IsLoading={isLoading} />
    </div>
  );
};

export default PayablesReceivables;
