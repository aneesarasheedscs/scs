import React, { useEffect, useState } from 'react';
import ChartOfAccountReport from './COAsearchCriteria';

import { ChartOfAccountColumn } from './colomns';
import { AntButton, AntSelectDynamic, AntTable, BackButton } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Checkbox, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useChartOfReporttableQuery, useGetCompanyName } from './queries';
import { TChartOfAccountCriteria } from './type';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
const { useForm, useWatch } = Form;
const ChartOfAccountReportTable = () => {
  const [form] = useForm<TChartOfAccountCriteria>();
  const formValues = useWatch<TChartOfAccountCriteria>([], form);
  // const { data, refetch, isError, isLoading, isFetching } = useChartOfReporttableQuery();
  const { t } = useTranslation();

  const {
    data,
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useChartOfReporttableQuery(true, form.getFieldsValue());
  

  const { setFieldValue } = form;

 
  useEffect(() => {
    form.setFieldValue('CompanyId', 2);
    form.setFieldValue('IsApproved', true);
  }, [form]);


  const onFinish = () => {
    refetch();
  };
  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('chart_of_account_report')}</h1>
        </Col>

        <Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={true} />
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card>
            <Form form={form} onFinish={onFinish}>
              <Col xxl={10} xl={17} md={20} lg={24} xs={24}>
                <Row gutter={CriteriaRowGutter} justify={'space-between'}>
                  <Col xs={24} sm={24} md={17} xl={18} xxl={15} lg={14} className="formsfield">
                    <AntSelectDynamic
                      bordered={false}
                      name="CompanyId"
                      label={t('company')}
                      fieldValue="Id"
                      fieldLabel="CompName"
                      query={useGetCompanyName}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={3} xl={6} xxl={3} style={{ marginTop: '10px', height: '10px' }}>
                    <Form.Item name="IsApproved" valuePropName="checked">
                      <Checkbox defaultChecked={true}>{t('IsActive')}</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={5} xl={5} xxl={4} lg={4} >
                    <AntButton
                      label={t('show')}
                      htmlType="submit"
                      isError={isReportError}
                      isLoading={isReportLoading || isFetching}
                    />
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xl={23} xxl={23} lg={23} xs={23} sm={23} style={{ marginTop: '10px' }}>
          <AntTable
            refetch={refetch}
            isError={isReportError}
            numberOfSkeletons={12}
            isLoading={isReportLoading || isFetching}
            columns={ChartOfAccountColumn(t)}
            data={data?.data?.Data?.Result || []}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
            scroll={{ x: '', y: convertVhToPixels('45vh') }}
            rowKey="Id"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChartOfAccountReportTable;
