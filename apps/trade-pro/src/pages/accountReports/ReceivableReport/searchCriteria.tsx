import React, { useState, useEffect } from 'react';
import { Checkbox, Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import type { CheckboxProps } from 'antd';

import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import {
  useGetCityNamecategory,
  useGetAccountTitle,
  useGetAccountTypeId,
  useGetApprovedStatus,
  ReceivableReportQueryHistory,
  useGetCustomerGroup,
} from './queries';
import { ReceivableReportTypeCriteria } from './type';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;
const ReceivableFormCriteria = () => {
  const [AccountTypeIds, setAccountTypeId] = useState<any>([]);
  const [AccountData, setAccountData] = useState<any>([]);

  const handleAccountTypeChange = (value: number) => {
    setAccountTypeId(value);
  };

  const { data: AccountTypes } = useGetAccountTypeId();
  const { data: accountTitleData } = useGetAccountTitle(AccountTypeIds);

  useEffect(() => {
    if (accountTitleData) {
      setAccountData(accountTitleData);
    }
  }, [accountTitleData]);

  const [form] = useForm<ReceivableReportTypeCriteria>();
  const [open, setOpen] = useState(false);

  const formValues = useWatch<ReceivableReportTypeCriteria>([], form);
  const { setFieldValue, setFields } = form;

  // const FromDate = dayjs(financialYear?.Start_Period);
  // const ToDate = dayjs(financialYear?.End_Period);
  // const ToDate = dayjs('2024-02-16');
  useEffect(() => {
    setFields([{ name: 'FromDate', value: dayjs(financialYear?.Start_Period) }]);
    setFields([{ name: 'ToDate', value: dayjs() }]);
    setFields([{ name: 'AccountId', value: 3 }]);
    setAccountTypeId(3);
  }, []);
  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = ReceivableReportQueryHistory(true, form.getFieldsValue());

  const onFinish = (values: ReceivableReportTypeCriteria) => {
    // values.AccountTypeIds = Array.isArray(values.AccountTypeIds)
    //   ? values.AccountTypeIds.join(',')
    //   : values.AccountTypeIds;
    // console.log(values.Status);
    // values?.AccountTypeIds?.toString();
    // console.log(values.AccountTypeIds.toString());
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
          // initialValues={{ FromDate, ToDate }}
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
                name="AccountType"
                label={t('reveiable_account')}
                fieldValue="AccountTypeId"
                fieldLabel="AccountTitle"
                options={map(AccountData, (Item: any) => ({
                  value: Item?.AccountClass,
                  label: Item?.AccountTitle,
                }))}
              />
            </Col>
            <Col xs={20} sm={24} md={12} xxl={12} className="form_field">
              <AntSelectDynamic
                bordered={false}
                name="Status"
                label={t('custom_group')}
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetApprovedStatus}
              />
            </Col>
            <Col xs={20} sm={24} md={11} xxl={11} className="form_field">
              <AntSelectDynamic
                bordered={false}
                // mode="multiple"
                name="CustomGroupId"
                label={t('inventory_group')}
                fieldValue="Id"
                fieldLabel="Description"
                query={useGetCustomerGroup}
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
