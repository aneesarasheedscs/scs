import { Card, Col, Form, Row, theme } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFilters } from '../types';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import {
  useGetOrdersDashboardStatus,
  useGetOrdersDashboardforBookingDemand,
  useGetOrdersDashboardforDeliveryInTransit,
  useGetOrdersDashboardforSalesBill,
  useGetPreBookingOutStandingOrdersDashboard,
} from '../quries';

const { useToken } = theme;
const { useForm, useWatch } = Form;

const financialYear = storedFinancialYear();

const FromDate = dayjs(financialYear?.Start_Period);
const ToDate = dayjs(financialYear?.End_Period);

function SearchCriteria() {
  const { t } = useTranslation();

  const [form] = useForm<TFilters>();
  const formValues = useWatch<TFilters>([], form);
  const { data, refetch } = useGetPreBookingOutStandingOrdersDashboard(true, form.getFieldsValue());
  const { refetch: refetchStatus } = useGetOrdersDashboardStatus(true, form.getFieldsValue());
  const { refetch: refetchDlvTransit } = useGetOrdersDashboardforDeliveryInTransit(true, form.getFieldsValue());
  const { refetch: refetchSalesBill } = useGetOrdersDashboardforSalesBill(true, form.getFieldsValue());

  const { data: bookingDemandData, refetch: refetchBookingDemand } = useGetOrdersDashboardforBookingDemand(
    true,
    form.getFieldsValue()
  );
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onFinish = (_: TFilters) => {
    refetch();
    refetchStatus();
    refetchBookingDemand();
    refetchDlvTransit();
    refetchSalesBill();
  };
  return (
    <>
      <Row justify={'start'} style={{ marginLeft: 10 }}>
        <Col span={24}>
          <Form form={form} initialValues={{ FromDate, ToDate }} onFinish={onFinish}>
            <Col span={24}>
              <Row gutter={CriteriaRowGutter} justify={'space-between'}>
                <Col xxl={16} xl={10} xs={12} md={9} lg={9} className="formfield">
                  <AntDatePicker placeholder="" name="FromDate" bordered={false} label={t('from_date')} />
                </Col>
                <Col xxl={16} xl={9} xs={11} md={9} lg={9} className="formfield">
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} placeholder="" />
                </Col>
                <Col xxl={7} xl={4} sm={6} lg={5} md={4}>
                  <Row justify={'start'}>
                    <Col>
                      <AntButton
                        label={t('show')}
                        htmlType="submit"
                        // isError={isActivitySummaryError}
                        //   isLoading={isActivitySummaryLoading || isFetching}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default SearchCriteria;
