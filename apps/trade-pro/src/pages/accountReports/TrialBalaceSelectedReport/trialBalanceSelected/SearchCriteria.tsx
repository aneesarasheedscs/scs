import React, { useState } from 'react';
import { Checkbox, Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { TtrialBalanceSelectedSearchCriteria } from './type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetAccountTitle, useGetCityName, useGetDateTypes, useGetTrialBalanceSelectedReport } from './queries';
import '../style.scss';
import { useTranslation } from 'react-i18next';
const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function CriteriaTrialBalanceSelected() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TtrialBalanceSelectedSearchCriteria>();
  const formValues = useWatch<TtrialBalanceSelectedSearchCriteria>([], form);
  const { setFieldValue, getFieldValue } = form;

  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useGetTrialBalanceSelectedReport(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TtrialBalanceSelectedSearchCriteria) => {
    refetch().then(() => handleClose());
  };

  const onChangeSkipZero = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('ZeroBalanceType', 1);
    } else {
      setFieldValue('ZeroBalanceType', 0);
    }
  };

  const onChangeUnPost = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('IsApproved', false);
    } else {
      setFieldValue('IsApproved', true);
    }
  };

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);

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
  const { t } = useTranslation();
  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={12} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              fieldLabel="DateType"
              defaultValue={'5'}
              label="Date Type"
              query={useGetDateTypes}
              onChange={(value) => handleDateChange(value)}
              name="DateType"
            />
          </Col>

          <Col xs={24} sm={12} md={12} className="form_field">
            <AntDatePicker defaultValue={FromDate} name="FromDate" label="From Date" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field" offset={1}>
            <AntDatePicker defaultValue={ToDate} name="ToDate" label="To Date" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={12} className="form_field">
            <AntInputNumber name="Debit" label="cl-Debit" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field" offset={1}>
            <AntInputNumber name="Credit" label="cl-Credit" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              label={t('account_title')}
              name=""
              fieldLabel="AccounTitle"
              fieldValue="AccountTitle"
              query={useGetAccountTitle}
            />
          </Col>
          <Col xs={24} sm={12} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              label={t('city_name')}
              name="CityName"
              fieldLabel="CityName"
              fieldValue="Id"
              query={useGetCityName}
            />
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Item name="ZeroBalanceType">
              <Checkbox checked={getFieldValue('ZeroBalanceType')} onChange={onChangeSkipZero}>
                Is Active
              </Checkbox>
            </Form.Item>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Item name="IsApproved">
              <Checkbox checked={getFieldValue('IsApproved')} onChange={onChangeUnPost}>
                Un Post
              </Checkbox>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
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
  );
}

export default CriteriaTrialBalanceSelected;
