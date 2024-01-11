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
  const { data } = useGetAccountTitle();
  console.log('this is account', data);

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

  const onChangeIsActive = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('ActionId', 1);
    } else {
      setFieldValue('ActionId', 0);
    }
  };

  // const onChangeUnPost = (e: CheckboxChangeEvent) => {
  //   if (e.target.checked) {
  //     setFieldValue('IsApproved', false);
  //   } else {
  //     setFieldValue('IsApproved', true);
  //   }
  // };

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
              label={t('date_type')}
              query={useGetDateTypes}
              onChange={(value) => handleDateChange(value)}
              name="DateType"
            />
          </Col>

          <Col xs={24} sm={12} md={12} className="form_field">
            <Form.Item name="FromDate" initialValue={FromDate}>
              <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field" offset={1}>
            <Form.Item name="ToDate" initialValue={ToDate}>
              <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              label={t('account_title')}
              name="GroupAccountId"
              fieldValue="Id"
              fieldLabel="AccountTitle"
              query={useGetAccountTitle}
            />
          </Col>
          <Col xs={24} sm={12} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              label={t('city_name')}
              name="CityId"
              fieldLabel="CityName"
              fieldValue="Id"
              query={useGetCityName}
            />
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Item name="ActionId">
              <Checkbox checked={getFieldValue('ActionId') === 1} onChange={onChangeIsActive}>
                {t('is_active')}
              </Checkbox>
            </Form.Item>
          </Col>

          <Col xs={8} sm={4} md={4}>
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
  );
}

export default CriteriaTrialBalanceSelected;
