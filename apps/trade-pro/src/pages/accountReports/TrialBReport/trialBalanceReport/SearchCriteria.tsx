import React, { useState } from 'react';

import { Checkbox, Col, Form, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { TrialBalanceSearchCriteria } from './type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetDateTypes, useGetLanguages, useGetTrialBalanceReport } from './queries';
import '../style.scss';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function searchCriteriaTrialBalanceReport() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TrialBalanceSearchCriteria>();
  const formValues = useWatch<TrialBalanceSearchCriteria>([], form);
  const { setFieldValue, getFieldValue } = form;

  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useGetTrialBalanceReport(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TrialBalanceSearchCriteria) => {
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

          {/* <Col xs={24} sm={12} md={12} className="form_field">
            <AntDatePicker defaultValue={FromDate} name="FromDate" label="From Date" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field" offset={1}>
            <AntDatePicker defaultValue={ToDate} name="ToDate" label="To Date" bordered={false} />
          </Col> */}
          <Col xs={24} sm={12} md={12} className="form_field">
            <Form.Item name="FromDate" initialValue={FromDate}>
              <AntDatePicker name="FromDate" label="From Date" bordered={false} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field" offset={1}>
            <Form.Item name="ToDate" initialValue={ToDate}>
              <AntDatePicker name="ToDate" label="To Date" bordered={false} />
            </Form.Item>
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
              fieldValue="Id"
              fieldLabel="LanguageDescription"
              label="Language"
              query={useGetLanguages}
              name="LanguageId"
            />
          </Col>

          <Col xs={4} sm={6} md={6}>
            <Form.Item name="ZeroBalanceType">
              <Checkbox onChange={onChangeSkipZero}>Skip Zero</Checkbox>
            </Form.Item>
          </Col>

          <Col xs={4} sm={6} md={6}>
            <Form.Item name="IsApproved">
              <Checkbox checked={getFieldValue('IsApproved')} onChange={onChangeUnPost}>
                Un Post
              </Checkbox>
            </Form.Item>
          </Col>

          {/* <Col xs={4} sm={6} md={6}>
            <Form.Item name="ZeroBalanceType">
              <Radio checked={getFieldValue('ZeroBalanceType')} onChange={onChangeSkipZero}>
                Four Col
              </Radio>
            </Form.Item>
          </Col>

          <Col xs={4} sm={6} md={6}>
            <Form.Item name="IsApproved">
              <Radio checked={getFieldValue('IsApproved')} onChange={onChangeUnPost}>
                Six Col
              </Radio>
            </Form.Item>
          </Col> */}

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

export default searchCriteriaTrialBalanceReport;
