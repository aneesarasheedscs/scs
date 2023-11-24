import { Card, Col, Form, Row } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { TSalesDashboardCriteria } from './types';
import { useGetDateType, useGetMasterBranchByUserId, usePostSalesAnalyticsDashboard } from './queries';
import { useState } from 'react';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
const { useForm, useWatch } = Form;
function SalesAnalyticalCriteria({ refetch, form }: any) {
  const { t } = useTranslation();
  // const [form] = useForm<TSalesDashboardCriteria>();
  const formValues = useWatch<TSalesDashboardCriteria>([], form);

  const { setFields, getFieldValue, setFieldValue } = form;
  const [selectedDateType, setSelectedDateType] = useState('day');
  const handleChangeDateType = (value: any) => {
    setSelectedDateType(value);
  };

  const onFinish = (_: TSalesDashboardCriteria) => {
    refetch();
  };

  const FinancialYear = storedFinancialYear();

  const FromDate = dayjs(FinancialYear?.Start_Period);
  const ToDate = dayjs(FinancialYear?.End_Period);

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
    <Row>
      <Card style={{ width: '100vw' }}>
        <Form form={form} onFinish={onFinish} initialValues={formValues}>
          <Row gutter={16} justify={'space-evenly'}>
            <Col xl={4} className="formfield">
              <AntSelectDynamic
                bordered={false}
                label={t('date_type')}
                name="DateType"
                fieldLabel="DateType"
                fieldValue="Id"
                query={useGetDateType}
                onChange={(value) => handleDateChange(value)}
              />
            </Col>
            <Col xl={4} className="formfield">
              <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
            </Col>
            <Col xl={4} className="formfield">
              <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
            </Col>
            <Col xl={6} className="formfield">
              <AntSelectDynamic
                bordered={false}
                label={t('master_branch')}
                name="MasterBranch"
                fieldLabel="CompName"
                fieldValue="Id"
                query={useGetMasterBranchByUserId}
              />
            </Col>

            <Col xl={2}>
              <AntButton
                label={t('show')}
                htmlType="submit"
                // isError={isFromToDateError}
                // isLoading={isFromToDateLoading}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </Row>
  );
}
export default SalesAnalyticalCriteria;
