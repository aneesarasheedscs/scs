import { AntButton, AntDatePicker, AntSelectDynamic, BackButton } from '@scs/ui';
import { formateDate } from '@tradePro/utils/formateDate';
import { Card, Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import './style.scss';
// import { useGetPurchaseAnalyticsReport, useGetPurchaseInvoiceReport, useSeasonYearSchedule } from './quries';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import dayjs from 'dayjs';
import _ from 'lodash';
import ItemGroup from './itemGroup';
import { TpuchaseAnalyticsItemGroupCriteria } from '../types';
import {  useGetPurchaseAnalyticsReport, useGetPurchaseInvoiceReport, useGetPurchaseInvoiceReportAB, useSeasonYearSchedule } from '../quries';

const { useForm, useWatch } = Form;
interface TSeason {
  IpcIds:number | null
  SortNo:number | null
}
function ItemGroupCriteria({ IpcIds, SortNo}:TSeason) {
  console.log(IpcIds)
  const { t } = useTranslation();
  const [showComponent, setShowComponent] = useState(false);
  const [form] = useForm<TpuchaseAnalyticsItemGroupCriteria>();
  const formValues = useWatch<TpuchaseAnalyticsItemGroupCriteria>([], form);
  const {
    data: seasondata,
    isError: isErrorSeason,
    isLoading: isLoadingSeason,
    isFetching: isFetchingSeason,
    isSuccess: isSuccessSeason,
  } = useSeasonYearSchedule();
  const StartDate = seasondata?.data?.Data?.Result?.[0]?.SeasonStartDate;
  const EndDate = seasondata?.data?.Data?.Result?.[0]?.SeasonEndDate;
  // const { data, isError, isLoading, isFetching, isSuccess, refetch } = useGetPurchaseAnalyticsReport(
  //   true,
  //   form.getFieldsValue(),
  //   StartDate,
  //   EndDate
  // );
  const { data:purchaseInvoice, isError:isErr, isLoading:isloadin, isFetching:isFetchin, isSuccess:isSucces, refetch:ref } = useGetPurchaseInvoiceReportAB(
    true,
    form.getFieldsValue(),
    StartDate,
    EndDate,
    IpcIds,
    
SortNo
  );
  // const SortNo = null; uncl
  const IpcId = null;
  // console.log(IpcId,'IpcId')
  // console.log(SortNo,'SortNo')

  
  //   const { data:purchaseInvoice, isError:isErr, isLoading:isloadin, isFetching:isFetchin, isSuccess:isSucces, refetch:ref } = useGetPurchaseInvoiceReport(
  //     true,
  //     form.getFieldsValue(),
  //     StartDate,
  //     EndDate
  //   );
 
  //   console.log(purchaseInvoice?.data?.Data?.Result, 'purch');

  useEffect(() => {
    const currentDate = dayjs(new Date());
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    form.setFieldValue('FromDate', dayjs(startOfMonth));
    form.setFieldValue('ToDate', dayjs(endOfMonth));
  }, []);

  const onFinish = (_: TpuchaseAnalyticsItemGroupCriteria) => {
    // _.FromDate = dayjs(_.FromDate).startOf('month');
    ref();
    setShowComponent(true);
  };

  return (
    <div style={{ paddingTop: 5, background: '#fff' }}>
      <Row justify={'space-around'}>
      <Col span={23} style={{ backgroundColor: '#fff', height: '',border:' ',marginBottom:'10px' }}>
          <Row justify={'space-between'}>
            <Col xs={10} sm={8} md={7} lg={7} xl={5} xxl={5} style={{border:''}}>
              <h2 className="report_heading" style={{ textAlign: 'left', marginLeft: '-4px' }}>
                {t('purchase_analytics_by_item')}
              </h2>
            </Col>
            <Col span={19} style={{ backgroundColor: '#fff' ,border:''}}>
          <Form onFinish={onFinish} form={form} initialValues={formValues}>
            <Row gutter={[16, 0]} align={'bottom'} style={{ border: '', marginLeft: 0, marginTop: 5 }}>
              <Col xxl={17} xl={15} lg={24} md={24} sm={24} xs={24} style={{ border: ' ' }}>
                <Row gutter={0} justify={'space-between'}>
                  <Col xxl={6} lg={8} md={8} sm={11} xs={11} className="form_field ">
                    <AntDatePicker placeholder="" name="FromDate" bordered={false} label={t('from_date')} />
                  </Col>
                  <Col xxl={5} lg={8} md={8} sm={12} xs={12} className="form_field ">
                    <AntDatePicker placeholder="" name="ToDate" bordered={false} label={t('to_date')} />
                  </Col>
                  <Col span={8} style={{ padding: '5px 0px', borderRadius: '5px',border:'' }}>
                        <p style={{ margin: 0, fontSize: '16px' }}>
                          <b>Season Date:</b>{' '}
                          <span style={{ marginLeft: '1%', fontSize: '14px' }}>
                            {formateDate(StartDate)} - {formateDate(EndDate)}{' '}
                          </span>
                        </p>
                      </Col>
                  <Col xs={24} lg={4} sm={6} md={4} xxl={3}>
                    <AntButton
                      label={t('show')}
                      htmlType="submit"
                      style={{ marginTop: 2 }}
                      // isError={isErrorPADDY9C}
                      // isLoading={isLoadingPADDY9C || isFechinG}
                    />
                  </Col>
                </Row>
                {/* <Row gutter={[0, 0]} align={'middle'} style={{ border: '', marginTop: 0 }}>
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
                </Row> */}
              </Col>
            </Row>
          </Form>
        </Col>
          </Row>
        </Col>
        <Col span={24} style={{ backgroundColor: '#fff' }}>
          <ItemGroup form={form} ItemGroupData={purchaseInvoice}  IpcId={IpcId}/>
        </Col>
      </Row>
      {/* }
      ></Card> */}
    </div>
  );
}

export default ItemGroupCriteria;
