import React, { useState } from 'react';
import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { useTranslation } from 'react-i18next';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { TSearchCriteria } from '../types';
import { useGetItem, useGetSalesReportTable } from '../queries';
import { AntButton, AntDatePicker, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { map } from 'lodash';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TSearchCriteria>();
  const formValues = useWatch<TSearchCriteria>([], form);
  const { setFieldValue } = form;

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);
  const DateType = 5;
  const Status = 'Complete';
  const ApprovedStatus = 1;
  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useGetSalesReportTable(false, form.getFieldsValue());

  const onFinish = (_: TSearchCriteria) => {
    console.log(_);
    refetch().then(() => handleClose());
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dateTypes2, setdateTypes2] = useState<TDateType[]>([
    { key: 1, value: 'This Day' },
    { key: 2, value: 'This Week' },
    { key: 3, value: 'This Month' },
    { key: 4, value: 'This Year' },
    { key: 5, value: 'Financial Year' },
  ]);
  const [statusType, setstatusType] = useState([
    { key: 1, value: 'Open' },
    { key: 2, value: 'Complete' },
    { key: 3, value: 'Cancel' },
    { key: 4, value: 'All' },
  ]);
  const [approveType, setapproveType] = useState([
    { key: 1, value: 'Approved' },
    { key: 2, value: 'Not Approved' },
    { key: 3, value: 'All' },
  ]);
  const { t } = useTranslation();
  const handleDateTypeChange = (value: number) => {
    if (value === 1) {
      setFieldValue('FromDate', dayjs());
      setFieldValue('ToDate', dayjs());
    } else if (value === 2) {
      setFieldValue('FromDate', dayjs(new Date()).startOf('week'));
      setFieldValue('ToDate', dayjs(new Date()).endOf('week'));
    } else if (value === 3) {
      setFieldValue('FromDate', dayjs(new Date()).startOf('month'));
      setFieldValue('ToDate', dayjs(new Date()).endOf('month'));
    } else if (value === 4) {
      setFieldValue('FromDate', dayjs(new Date()).startOf('year'));
      setFieldValue('ToDate', dayjs(new Date()).endOf('year'));
    } else if (value === 5) {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    } else {
    }
  };
  return (
    <div>
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
          //   initialValues={formValues}
          initialValues={{ DateType, FromDate, ToDate, ApprovedStatus, Status }}
        >
          <Row gutter={CriteriaRowGutter} justify={'space-between'}>
            <Col xs={24} sm={24} md={8} xxl={8} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="DateType"
                label={t('date_type')}
                fieldValue="Id"
                fieldLabel="value"
                options={map(dateTypes2, (item) => ({
                  value: item.key,
                  label: item.value,
                }))}
                onChange={(value) => handleDateTypeChange(value)}
              />
            </Col>
            <Col xs={24} sm={24} md={8} xxl={8} className="formfield">
              <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
            </Col>

            <Col xs={24} sm={24} md={7} xxl={7} className="formfield">
              <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
            </Col>

            <Col xs={24} sm={24} md={8} xxl={8} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="ItemId"
                label={t('item_name')}
                fieldValue="Id"
                fieldLabel="ReferenceName"
                query={useGetItem}
              />
            </Col>

            <Col xs={24} sm={24} md={8} xxl={8} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="ApprovedStatus"
                label={t('approved_status')}
                fieldValue="Id"
                fieldLabel="Status"
                options={map(approveType, (item) => ({
                  value: item.key,
                  label: item.value,
                }))}
              />
            </Col>

            <Col xs={24} sm={24} md={7} xxl={7} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="Status"
                label="Status"
                fieldValue="Id"
                fieldLabel="Status"
                options={map(statusType, (item) => ({
                  value: item.value,
                  label: item.value,
                }))}
              />
            </Col>

            <Col xs={24} sm={24} md={24} xxl={24}>
              <Row justify={'end'}>
                <Col>
                  <AntButton
                    label="Show"
                    htmlType="submit"
                    style={{ marginTop: 2 }}
                    isError={isReportError}
                    isLoading={isReportLoading || isFetching}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </SearchCriteriaWrapper>
    </div>
  );
}

export default SearchCriteria;
interface TDateType {
  key: number;
  value: string;
}
