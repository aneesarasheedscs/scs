import React, { useEffect, useState } from 'react';
import ChartOfAccountReport from './COAsearchCriteria';

import { ChartOfAccountColumn } from './colomns';
import { AntButton, AntSelectDynamic, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Checkbox, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useChartOfReporttableQuery, useGetCompanyName } from './queries';
import { TChartOfAccountCriteria } from './type';
const { useForm, useWatch } = Form;
const ChartOfAccountReportTable = () => {
  const [form] = useForm<TChartOfAccountCriteria>();
  const formValues = useWatch<TChartOfAccountCriteria>([], form);
  // const { data, refetch, isError, isLoading, isFetching } = useChartOfReporttableQuery();
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [removeFirstValue, setRemoveFirstValue] = useState(true);
  const {
    data,
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useChartOfReporttableQuery(true, form.getFieldsValue());

  const { setFieldValue } = form;

  const onFinish = () => {
    refetch();
  };
  useEffect(() => {
    form.setFieldValue('CompanyId', 2);
  }, [form]);
  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('chart_of_account_report')}</h1>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card>
            <Form form={form} onFinish={onFinish}>
              <Col xxl={10} xl={24} lg={24} xs={24}>
                <Row gutter={[16, 16]} justify={'space-between'}>
                  <Col xs={24} sm={24} md={17} xl={17} xxl={15} className="formsfield">
                    <AntSelectDynamic
                      bordered={false}
                      name="CompanyId"
                      label={t('company')}
                      fieldValue="Id"
                      fieldLabel="CompName"
                      query={useGetCompanyName}
                      // value={selectedValue}
                      // onChange={setSelectedValue}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={6} xl={6} xxl={3} style={{ marginTop: '10px' }}>
                    <Form.Item name="IsApproved" valuePropName="checked">
                      <Checkbox defaultChecked={true}>{t('IsActive')}</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={5} xl={5} xxl={4} style={{ marginTop: '10px' }}>
                    <AntButton
                      label={t('show')}
                      htmlType="submit"
                      style={{ marginTop: 2 }}
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
        <Col xl={23}>
          <br />
          <AntTable
            refetch={refetch}
            isError={isReportError}
            numberOfSkeletons={12}
            isLoading={isReportLoading || isFetching}
            columns={ChartOfAccountColumn()}
            data={data?.data?.Data?.Result || []}
            // searchCriteriaForm={<ChartOfAccountReport />}
            scroll={{ x: '', y: convertVhToPixels('50vh') }}
            rowKey="Id"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChartOfAccountReportTable;
