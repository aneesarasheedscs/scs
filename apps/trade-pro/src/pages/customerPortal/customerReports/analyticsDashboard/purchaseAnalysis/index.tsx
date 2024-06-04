import { AntButton, AntDatePicker, AntSelectDynamic, BackButton } from '@scs/ui';
import { formateDate } from '@tradePro/utils/formateDate';
import { Card, Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';
import PurchaseAnalyticsDetail from './purchaseAnalyticsDetail';
import { useGetPurchaseAnalyticsReport, useGetPurchaseInvoiceReport, useSeasonYearSchedule } from './quries';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import dayjs from 'dayjs';
import { TpuchaseAnalyticsCriteria } from './types';
import _ from 'lodash';
import PurchaseAnalytic from './purchaseAnalyticsDetail';

const { useForm, useWatch } = Form;
function PurchaseAnalytics() {
  const { t } = useTranslation();
  const [showComponent, setShowComponent] = useState(false);
  const [form] = useForm<TpuchaseAnalyticsCriteria>();
  const formValues = useWatch<TpuchaseAnalyticsCriteria>([], form);
  const {
    data: seasondata,
    isError: isErrorSeason,
    isLoading: isLoadingSeason,
    isFetching: isFetchingSeason,
    isSuccess: isSuccessSeason,
  } = useSeasonYearSchedule();
  const StartDate = seasondata?.data?.Data?.Result?.[0]?.SeasonStartDate;
  const EndDate = seasondata?.data?.Data?.Result?.[0]?.SeasonEndDate;

  const { data, isError, isLoading, isFetching, isSuccess, refetch } = useGetPurchaseAnalyticsReport(
    true,
    form.getFieldsValue(),
    StartDate,
    EndDate
  );
  const { data:purchaseInvoice, isError:isErr, isLoading:isloadin, isFetching:isFetchin, isSuccess:isSucces, refetch:ref } = useGetPurchaseInvoiceReport(
    true,
    form.getFieldsValue(),
    StartDate,
    EndDate
  );

  console.log(purchaseInvoice?.data?.Data?.Result, 'purch');

 

  useEffect(() => {
    const currentDate = dayjs(new Date());
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    form.setFieldValue('FromDate', dayjs(startOfMonth));
    form.setFieldValue('ToDate', dayjs(endOfMonth));


  }, []);



  const onFinish = (_: TpuchaseAnalyticsCriteria) => {
        _.FromDate = dayjs(_.FromDate).startOf('month');
    refetch();
    setShowComponent(true)
  };
//   const onFinish = async (_: TpuchaseAnalyticsCriteria) => {
//     _.FromDate = dayjs(_.FromDate).startOf('month');
//     await refetch();
//     setShowComponent(true);
// };

  return (
    <div style={{ paddingTop: 5, background: '#fff' }}>
      {/* <Card
        style={{ height: '100%' }}
        cover={ */}
      <Row justify={'space-around'}>
        <Col span={23} style={{ backgroundColor: '#fff', height: '' }}>
          <Row justify={'space-between'}>
            <Col xs={10} sm={8} md={7} lg={7} xl={5} xxl={5}>
              <h1 className="report_heading" style={{ textAlign: 'left', marginLeft: '-4px' }}>
                {t('purchase_analytics_detail')}
           
              </h1>
            </Col>

            {/* <Col xxl={1} xl={1} md={1} lg={2} sm={2} xs={3} style={{ marginRight: '30px', marginTop: 10 }}>
              <BackButton goToDashboard={false} />
            </Col> */}
          </Row>
        </Col>
        <Col span={23} style={{ backgroundColor: '#fff' }}>
          <Form onFinish={onFinish} form={form} initialValues={formValues}>
            <Row gutter={[16, 0]} align={'bottom'} style={{ border: '', marginLeft: 0, marginTop: 5 }}>
              <Col xxl={10} xl={15} lg={24} md={24} sm={24} xs={24} style={{ border: ' ' }}>
                <Row gutter={0} justify={'space-between'}>
                  <Col xxl={9} lg={8} md={8} sm={11} xs={11} className="form_field ">
                    <AntDatePicker placeholder="" name="FromDate" bordered={false} label={t('from_date')} />
                  </Col>
                  <Col xxl={9} lg={8} md={8} sm={12} xs={12} className="form_field ">
                    <AntDatePicker placeholder="" name="ToDate" bordered={false} label={t('to_date')} />
                  </Col>

                  <Col xs={24} lg={4} sm={6} md={4} xxl={4}>
                    <AntButton
                      label={t('show')}
                      htmlType="submit"
                      style={{ marginTop: 2 }}
                      // isError={isError}
                      // isLoading={isLoading || isFetching}
                    />
                  </Col>
                </Row>
                <Row gutter={[0, 0]} align={'middle'} style={{ border: '', marginTop: 0 }}>
                  <Col xxl={24} xl={12} lg={20} md={20} sm={24} xs={24} style={{ border: ' ' }}>
                    <Row gutter={0} justify={'space-between'}>
                      <Col span={24} style={{ padding: '5px 0px', borderRadius: '5px' }}>
                        <p style={{ margin: 0, fontSize: '16px' }}>
                          <b>Season Date:</b>{' '}
                          <span style={{ marginLeft: '1%', fontSize: '14px' }}>
                            {formateDate(StartDate)} - {formateDate(EndDate)}{' '}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24} style={{ backgroundColor: '#fff' }}>
          <PurchaseAnalytic form={form} data={data} purchaseInvoice={purchaseInvoice} />
        </Col>
      </Row>
      {/* }
      ></Card> */}
    </div>
  );
}

export default PurchaseAnalytics;
