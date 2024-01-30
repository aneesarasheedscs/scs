import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetCompanies,
  useGetItemClassGroup,
  useGetMonthandQuarterWiseSaleReport,
  useGetParentCategory,
} from '../query';
import { map } from 'lodash';
import { TMonthandQuarterWiseSaleReport } from '../types';
import MonthlySalesGraph from '../graphs/MonthlySalesGraph';
import QuarterlySaleGraph from '../graphs/QuarterlySaleGraph';

const { useWatch, useForm } = Form;
function SearchCriteria() {
  const [form] = useForm<TMonthandQuarterWiseSaleReport>();
  const formValues = useWatch<TMonthandQuarterWiseSaleReport>([], form);
  const { t } = useTranslation();
  const { data } = useGetParentCategory();
  const { data: itemClassGroup } = useGetItemClassGroup();
  const {
    data: getMonthandQuarter,
    refetch,
    isSuccess,
    isFetching,
    isError,
    isLoading,
  } = useGetMonthandQuarterWiseSaleReport(true, form.getFieldsValue());
  const onFinish = (values: TMonthandQuarterWiseSaleReport) => {
    console.log(values);

    refetch();
  };
  return (
    <>
      <h2 className="monthly_heading">{t('month_and_quarter_wise_sale_report')} </h2>
      <Row gutter={[6, 6]} justify={'center'} style={{ marginBottom: '1%' }}>
        <Col span={24} style={{ border: '' }}>
          <Card style={{ width: '98%', marginLeft: '1%', boxShadow: '2px 2px 10px 0px gray' }}>
            <Form form={form} onFinish={onFinish}>
              <Row gutter={[10, 10]} justify={'space-between'} style={{}}>
                <Col xxl={5} xl={6} lg={12} md={12} sm={14} xs={20} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    fieldLabel="ReferenceName"
                    fieldValue="Id"
                    name="ParentCategoryId"
                    label={t('parent_category')}
                    options={map(data, (item: any) => ({
                      value: item.Id,
                      label: item.ReferenceName,
                    }))}
                  />
                </Col>
                <Col xxl={5} xl={5} lg={11} md={11} sm={14} xs={20} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('class_group')}
                    fieldLabel="ReferenceName"
                    fieldValue="Id"
                    name="ItemClassGroupId"
                    options={map(itemClassGroup, (item: any) => ({
                      value: item.Id,
                      label: item.ReferenceName,
                    }))}
                  />
                </Col>
                <Col xxl={6} xl={7} lg={12} md={12} sm={14} xs={20} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    fieldLabel="CompName"
                    fieldValue="Id"
                    name="CompanyIds"
                    label={t('companies')}
                    query={useGetCompanies}
                  />
                </Col>

                <Col xxl={7} xl={5} lg={11} md={11} sm={8}>
                  <Row justify={'start'} align={'middle'}>
                    <Col>
                      <AntButton
                        label={t('show')}
                        htmlType="submit"
                        isError={isError}
                        isLoading={isLoading || isFetching}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Card
          style={{ width: '98%', boxShadow: '2px 2px 10px 0px gray', marginBottom: '0.2%' }}
          cover={
            <>
              <h2
                style={{
                  padding: '5px',
                  textAlign: 'center',
                  borderBottom: '1px  solid lightgray',
                }}
              >
                {t('monthly_sale_report')}
              </h2>
            </>
          }
        >
          <Row gutter={[16, 16]} justify={'space-between'} style={{ marginTop: '-1%' }}>
            <Col span={24} style={{ border: '' }}>
              <MonthlySalesGraph
                getMonthandQuarter={getMonthandQuarter}
                refetch={refetch}
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            </Col>
          </Row>
        </Card>
        <Card
          style={{ width: '98%', boxShadow: '2px 2px 10px 0px gray' }}
          cover={
            <>
              <h2
                style={{
                  padding: '5px',
                  textAlign: 'center',
                  borderBottom: '1px  solid lightgray',
                }}
              >
                {t('quarterly_sale_report')}
              </h2>
            </>
          }
        >
          <Row gutter={[16, 16]} justify={'space-between'} style={{ marginTop: '-1%' }}>
            <Col span={24} style={{ border: '' }}>
              <QuarterlySaleGraph
                getMonthandQuarter={getMonthandQuarter}
                refetch={refetch}
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
}

export default SearchCriteria;
