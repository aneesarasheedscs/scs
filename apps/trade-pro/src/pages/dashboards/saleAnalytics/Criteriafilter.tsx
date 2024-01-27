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
    <Row gutter={[6, 6]} justify={'center'}>
      <Col xxl={24} xl={24} xs={23} lg={24} sm={24} md={24}>
        <h2 style={{ padding: 10, marginLeft: 6 }}>{t('sales_analytical_dashboard')}</h2>

        <Card style={{ width: '97%', marginLeft: '1.5%', boxShadow: '2px 2px 10px 0px gray' }} hoverable>
          <Form form={form} onFinish={onFinish} initialValues={formValues}>
            <Col xxl={20} xl={20} lg={24} md={24} sm={24} xs={24}>
              <Row gutter={10} justify={'space-between'} style={{ width: '100%' }}>
                <Col xl={8} xs={24} sm={23} md={12} lg={12} xxl={5} className="formfield form-container">
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
                <Col xl={7} xs={24} sm={12} md={11} lg={11} xxl={4} className="formfield form-container">
                  <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                </Col>
                <Col xl={8} xs={24} sm={11} md={12} lg={12} xxl={4} className="formfield form-container">
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                </Col>
                <Col xl={16} xs={24} sm={23} md={11} lg={11} xxl={7} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('master_branch')}
                    name="MasterBranch"
                    fieldLabel="CompName"
                    fieldValue="Id"
                    query={useGetMasterBranchByUserId}
                  />
                </Col>

                <Col xl={8} xs={8} sm={5} md={3} lg={3} xxl={2} style={{ display: 'flex', justifyContent: 'start' }}>
                  <Row>
                    <Col span={24}>
                      <AntButton
                        label={t('show')}
                        htmlType="submit"
                        style={{ marginTop: 5 }}
                        // isError={isFromToDateError}
                        // isLoading={isFromToDateLoading}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
export default SalesAnalyticalCriteria;
