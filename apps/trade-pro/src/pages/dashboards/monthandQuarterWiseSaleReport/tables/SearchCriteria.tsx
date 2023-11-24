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
      <Card style={{ marginTop: 10 }}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '85%' }}>
            <Col xxl={7} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
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
            <Col xxl={6} xl={7} lg={10} md={11} sm={14} xs={20} className="formfield">
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
            <Col xxl={8} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntSelectDynamic
                bordered={false}
                fieldLabel="CompName"
                fieldValue="Id"
                name="CompanyIds"
                label={t('companies')}
                query={useGetCompanies}
              />
            </Col>

            <Col xl={2}>
              <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading || isFetching} />
            </Col>
          </Row>
        </Form>
      </Card>
      <MonthlySalesGraph
        getMonthandQuarter={getMonthandQuarter}
        refetch={refetch}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <QuarterlySaleGraph
        getMonthandQuarter={getMonthandQuarter}
        refetch={refetch}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default SearchCriteria;
