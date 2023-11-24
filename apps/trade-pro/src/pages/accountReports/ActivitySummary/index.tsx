import { Col, Row, Typography, Card, Form, theme, Checkbox } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic, AntTable } from '@scs/ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Columns } from './Columns';
import { useGetActivitySummary, useGetDateTypes } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Tfilter } from './types';
import './style.scss';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect } from 'react';
const { Title, Text } = Typography;
const { useToken } = theme;
const financialYear = storedFinancialYear();

const ActivitySummaryReport: React.FC<{ FromDateProp?: Date; ToDateProp?: Date }> = (props) => {
  const { FromDateProp, ToDateProp } = props;
  const { useForm, useWatch } = Form;
  const [form] = useForm<Tfilter>();
  const formValues = useWatch<Tfilter>([], form);

  const { setFieldValue } = form;
  const { t } = useTranslation();

  useEffect(() => {
    setFieldValue('FromDate', dayjs(FromDateProp));
    setFieldValue('ToDate', dayjs(ToDateProp));
  });

  const {
    refetch,
    isFetching,
    data: ActivitySummary,
    isError: isActivitySummaryError,
    isLoading: isActivitySummaryLoading,
  } = useGetActivitySummary(
    FromDateProp !== undefined && ToDateProp !== undefined ? true : false,
    form.getFieldsValue()
  );

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onFinish = (_: Tfilter) => {
    refetch();
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

  const onChangeUnPost = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('ApprovedFilter', 'All');
    } else {
      setFieldValue('ApprovedFilter', null);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row>
        <Col
          xs={2}
          sm={4}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('acctivity_summary')}</h1>
          <span style={{ position: 'relative', left: '120%' }}>
            {' '}
            <b> {t('activity')}</b> &#9654; {t('summary')}
          </span>
        </Col>
      </Row>

      <Card style={{ width: '80vw', marginLeft: '30px' }}>
        <Form form={form} initialValues={{ FromDate, ToDate }} onFinish={onFinish}>
          {/* <Row gutter={[24, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify={'start'}> */}
          <Row gutter={[24, 24]}>
            <Col xl={5} className="formsfield" style={{ marginLeft: '10px' }}>
              <AntSelectDynamic
                bordered={false}
                fieldValue="Id"
                fieldLabel="DateType"
                defaultValue={'5'}
                label={t('date_type')}
                query={useGetDateTypes}
                onSelectChange={(obj) => handleDateChange(obj.Id)}
                name="DateType"
              />
            </Col>
            <Col xl={5} className="formsfield" offset={1}>
              <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
            </Col>
            <Col xl={5} className="formsfield" offset={1}>
              <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
            </Col>
            <Col xl={5}>
              <Form.Item name="ApprovedFilter">
                <Checkbox onChange={onChangeUnPost}>{t('include_unposted_vochers')}</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <AntButton
                label={t('show')}
                htmlType="submit"
                isError={isActivitySummaryError}
                isLoading={isActivitySummaryLoading || isFetching}
              />
            </Col>
          </Row>
        </Form>
      </Card>

      <div className="summary-table-container">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={24} className="summary-table-card">
            <AntTable
              rowKey={'AccountId'}
              columns={Columns(t)}
              data={ActivitySummary?.data?.Data?.Result || []}
              isError={isActivitySummaryError}
              isLoading={isActivitySummaryLoading}
              scroll={{ y: convertVhToPixels('50vh') }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ActivitySummaryReport;