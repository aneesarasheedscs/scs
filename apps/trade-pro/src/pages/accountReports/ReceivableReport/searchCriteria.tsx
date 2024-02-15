import React, { useState, useEffect } from 'react';
import { Checkbox, Col, Form, Row, Select } from 'antd';
import dayjs from 'dayjs';
import type { CheckboxProps } from 'antd';

import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useGetCityNamecategory, useGetAccountTitle, useGetAccountTypeId, useGetApprovedStatus } from './queries';
import { ReceivableReportQueryHistory } from './tableQueries';
import { ReceivableReportTypeCriteria } from './type';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CheckBox } from '../GeneralLedger/tables/Atom';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;
const ReceivableFormCriteria = () => {
  const [AccountTypeId, setAccountTypeId] = useState<any>([]);
  const [AccountData, setAccountData] = useState<any>([]);

  const handleAccountTypeChange = (value: number) => {
    setAccountTypeId(value);
  };

  const { data: AccountTypes } = useGetAccountTypeId();
  const { data: accountTitleData } = useGetAccountTitle(AccountTypeId);

  useEffect(() => {
    if (accountTitleData) {
      setAccountData(accountTitleData);
    }
  }, [accountTitleData]);
  const [form] = useForm<ReceivableReportTypeCriteria>();
  const [open, setOpen] = useState(false);

  const formValues = useWatch<ReceivableReportTypeCriteria>([], form);
  const { setFieldValue } = form;

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);

  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = ReceivableReportQueryHistory(false, form.getFieldsValue());

  const onFinish = (values: ReceivableReportTypeCriteria) => {
    values.Status = Array.isArray(values.Status) ? values.Status.join(',') : values.Status;
    console.log(values.Status);
    refetch().then(() => handleClose());
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
          // initialValues={formValues}
          initialValues={{ FromDate, ToDate }}
        >
          <Row gutter={[16, 16]} justify={'space-between'}>
            <Col xs={20} sm={12} md={8} xxl={8} className="form_field">
              <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
            </Col>

            <Col xs={20} sm={11} md={7} xxl={7} className="form_field">
              <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
            </Col>
            <Col xs={20} sm={24} md={8} xxl={8} className="form_field">
              <AntSelectDynamic
                bordered={false}
                name="CityId"
                label={t('city_name')}
                fieldValue="Id"
                fieldLabel="CityName"
                query={useGetCityNamecategory}
              />
            </Col>
            <Col xs={20} sm={24} md={8} xxl={8} className="form_field">
              <AntInputNumber name="FromDocNo" label={t('balance_from')} bordered={false} />
            </Col>
            <Col xs={20} sm={12} md={7} xxl={7} className="form_field">
              <AntInputNumber name="ToDocNo" label={t('balance_to')} bordered={false} />
            </Col>
            <Col xs={20} sm={11} md={8} xxl={8} style={{ marginTop: 20 }}>
              <Checkbox onChange={onChange}>{t('only_trade_parties')}</Checkbox>
            </Col>
            <Col xs={20} sm={24} md={12} xxl={12} className="form_field">
              <AntSelectDynamic
                bordered={false}
                name="AccountId"
                label={t('reveiables_ac_type')}
                fieldValue="Id"
                fieldLabel="AccountType"
                options={map(AccountTypes, (item: any) => ({
                  value: item.Id,
                  label: item.AccountType,
                }))}
                onChange={(value) => handleAccountTypeChange(value)}
              />
            </Col>
            <Col xs={20} sm={24} md={11} xxl={11} className="form_field">
              <AntSelectDynamic
                bordered={false}
                mode="multiple"
                name="Status"
                label={t('reveiable_account')}
                fieldValue="AccountCode"
                fieldLabel="AccountTitle"
                options={map(AccountData, (Item: any) => ({
                  value: Item?.AccountCode,
                  label: Item?.AccountTitle,
                }))}
              />
            </Col>
            <Col xs={20} sm={24} md={12} xxl={12} className="form_field">
              <AntSelectDynamic
                bordered={false}
                name="CustomGroupId"
                label={t('custom_group')}
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetApprovedStatus}
              />
            </Col>
            <Col xs={20} sm={24} md={11} xxl={11} className="form_field">
              <AntSelectDynamic
                bordered={false}
                name="CustomGroupId"
                label={t('inventory_group')}
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetApprovedStatus}
              />
            </Col>

            <Col xs={6} sm={5} md={4} xxl={4}>
              <br />
              <AntButton
                label={t('show')}
                htmlType="submit"
                style={{ marginTop: 2 }}
                isError={isReportError}
                isLoading={isReportLoading || isFetching}
              />
            </Col>
          </Row>
        </Form>
      </SearchCriteriaWrapper>
    </div>
  );
};

export default ReceivableFormCriteria;
