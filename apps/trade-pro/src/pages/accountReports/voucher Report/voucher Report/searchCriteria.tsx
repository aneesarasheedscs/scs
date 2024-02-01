import React, { useEffect, useState } from 'react';
import './style.scss';

import { Col, Form, Radio, Row, Space } from 'antd';
import dayjs from 'dayjs';

import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { TVoucherReportCriterias } from '../types';
import { useGetAccountTitle, useGetCustomGroup, useGetDocumentType, useGetVoucherReport } from './queries';
import { useTranslation } from 'react-i18next';
import './style.scss';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function SearchCriteriaVoucherReport(dataa: any) {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TVoucherReportCriterias>();
  const formValues = useWatch<TVoucherReportCriterias>([], form);

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);

  const {
    data: voucherReportData,
    refetch,
    isFetching,
    isError: isVoucherReportError,
    isLoading: isVoucherReportLoading,
  } = useGetVoucherReport(true, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TVoucherReportCriterias) => {
    refetch().then(() => handleClose());
  };
  const { data } = useGetCustomGroup();
  console.log('dataaa', data?.data?.Data?.Result);
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldValue('SelectedDocuments', 1);
  }, [form]);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={{ FromDate, ToDate }}>
        <Row gutter={[16, 16]} justify={'space-between'}>
          <Col xs={24} sm={12} md={12} className="form_field">
            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={12} className="form_field">
            <AntInputNumber name="FromDocNo" label={t('from_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field">
            <AntInputNumber name="ToDocNo" label={t('to_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} lg={12} xl={12} xxl={12} className="form_field">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              label={t('account_title')}
              query={useGetAccountTitle}
              fieldLabel="AccountTitle"
              name="AccountId"
            />
          </Col>

          <Col xs={24} sm={24} md={24} lg={11} xl={11} xxl={11} className="form_field">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              fieldLabel="AcLookUpsDescription"
              label={t('custom_group')}
              query={useGetCustomGroup}
              name="CustomerGroupId"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="form_field">
            <AntSelectDynamic
              bordered={false}
              mode="multiple"
              fieldValue="Id"
              label={t('document_type')}
              query={useGetDocumentType}
              fieldLabel="DocumentTypeDescription"
              name="SelectedDocuments"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={11} xl={11} className="form_field">
            <AntInput name="ManualBillNo" label={t('manual_number')} bordered={false}></AntInput>
          </Col>
          <Col xs={12} sm={12} md={12} offset={1}></Col>

          <Col xs={15} sm={12} md={12} xl={12}>
            <Form.Item name="ApprovedFilter" label={t('report_type')}>
              <Radio.Group defaultValue={'3'}>
                <Space direction="vertical">
                  <Radio value="1">{t('approved')}</Radio>
                  <Radio value="2">{t('un_approved')}</Radio>
                  <Radio value="3">{t('all')}</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={10} sm={24} lg={5} md={6} xl={4}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 15 }}
              isError={isVoucherReportError}
              isLoading={isVoucherReportLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteriaVoucherReport;
