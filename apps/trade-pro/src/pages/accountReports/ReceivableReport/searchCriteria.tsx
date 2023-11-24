import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import {
  useGetCityNamecategory,
  // useGetItemCategory,
  useGetAccountTitle,
  useGetCustomGroup,
  useGetAccountTypeId,
  useGetApprovedStatus,
} from './queries';
import { ReceivableReportQueryHistory } from './tableQueries';
import { ReceivableReportTypeCriteria } from './type';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { map } from 'lodash';
import Item from 'antd/es/list/Item';
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

  return (
    <div>
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          // initialValues={formValues}
          initialValues={{ FromDate, ToDate }}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12} md={8}>
              <AntDatePicker name="FromDate" label="From Date" />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <AntDatePicker name="ToDate" label="To Date" />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <AntInputNumber name="FromDocNo" label="Sale Order From" />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntInputNumber name="ToDocNo" label="Sale Order To" />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="CityId"
                label="City Name"
                fieldValue="Id"
                fieldLabel="CityName"
                query={useGetCityNamecategory}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="AccountId"
                label="Receivable AC Type"
                fieldValue="Id"
                fieldLabel="AccountType"
                options={map(AccountTypes, (item: any) => ({
                  value: item.Id,
                  label: item.AccountType,
                }))}
                onChange={(value) => handleAccountTypeChange(value)}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                mode="multiple"
                name="Status"
                label="receivable account"
                fieldValue="AccountCode"
                fieldLabel="AccountTitle"
                options={map(AccountData, (Item: any) => ({
                  value: Item?.AccountCode,
                  label: Item?.AccountTitle,
                }))}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="CustomGroupId"
                label="custom group"
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetApprovedStatus}
              />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <br />
              <AntButton
                label="Show"
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
