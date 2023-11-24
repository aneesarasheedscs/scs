import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useGetCompanies, useGetItemType, useGetParentCategory, useGetSalesComparisonReport } from '../query';
import { TSearchCriteriaSalesComparison } from '../types';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { useEffect, useState } from 'react';
import CustomersSalesGraph from '../graphs/CustomerSalesGraph';
import ItemSalesGraph from '../graphs/ItemSalesGraph';
import CitiesSalesGraph from '../graphs/CitiesSalesGraph';
import PackingSizeSalesGraph from '../graphs/PackSizeSalesGraph';
import SalesComparisonReportforTopCustomers, {
  SalesComparisonReportforTopCities,
  SalesComparisonReportforTopItems,
  SalesComparisonReportforTopPackSize,
} from './index';

const { useWatch, useForm } = Form;
function SearchCriteria() {
  const { t } = useTranslation();
  const financialYear = storedFinancialYear();
  const StartDate = financialYear?.Start_Period;
  const EndDate = financialYear?.End_Period;
  const [form] = useForm<TSearchCriteriaSalesComparison>();
  const formValues = useWatch<TSearchCriteriaSalesComparison>([], form);
  const [count, setCount] = useState<any>(0);

  const {
    data,
    refetch,
    isFetching,
    isError: isSaleReportError,
    isLoading: isSaleReportLoading,
  } = useGetSalesComparisonReport(true, form.getFieldsValue());
  const onFinish = (values: TSearchCriteriaSalesComparison) => {
    console.log(values);

    refetch();
  };
  useEffect(() => {
    form.setFields([{ name: 'FromDate', value: dayjs(StartDate) }]);
    form.setFields([{ name: 'ToDate', value: dayjs(EndDate) }]);
    form.setFieldsValue({ ApprovedFilter: 'Top' });
    form.setFieldsValue({ NoOfRecords: 10 });
  }, []);
  useEffect(() => {
    setCount(form.getFieldValue('NoOfRecords'));
  }, [form.getFieldValue('NoOfRecords')]);
  return (
    <>
      <Card className="salesComaprisonCard" hoverable>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '95%', marginLeft: 5 }}>
            <Col xxl={6} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
            </Col>
            <Col xxl={6} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
            </Col>
            <Col xxl={6} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntSelectDynamic
                bordered={false}
                fieldLabel="InvParentCateDescription"
                fieldValue="InventoryParentCategoriesId"
                name="ParentCategoryId"
                label={t('parent_category')}
                query={useGetParentCategory}
              />
            </Col>
            <Col xxl={5} xl={7} lg={10} md={11} sm={14} xs={20} className="formfield">
              <AntSelectDynamic
                bordered={false}
                label={t('item_type')}
                fieldLabel="TypeDescription"
                fieldValue="ItemTypeId"
                name="ItemTypeId"
                query={useGetItemType}
              />
            </Col>
            <Col xxl={8} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntSelectDynamic
                bordered={false}
                fieldLabel="CompName"
                fieldValue="Id"
                name="CompanyIds"
                label={t('company')}
                query={useGetCompanies}
              />
            </Col>
            <Col xxl={6} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntInput name="NoOfRecords" label={t('count')} bordered={false} />
            </Col>
            <Col xs={24} sm={24} md={6} xxl={4} style={{ marginTop: 10 }}>
              <Radio.Group
                onChange={(e) => {
                  form.setFieldsValue({ ApprovedFilter: e.target.value });
                }}
                defaultValue={'Top'}
              >
                <Radio value={'Top'}> {t('top')}</Radio>
                <Radio value={'Bottom'}> {t('bottom')}</Radio>
              </Radio.Group>
              <AntInput label="" name="ApprovedFilter" type="hidden" />
            </Col>
            <Col xl={2}>
              <AntButton
                label={t('show')}
                htmlType="submit"
                isError={isSaleReportError}
                isLoading={isSaleReportLoading || isFetching}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{}}>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%' }}>
          <Col xl={12} xxl={10} lg={12} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}>
              {t('top')} {count} {t('customers')}
            </h2>
            <Card hoverable style={{ height: '90%' }}>
              <CustomersSalesGraph data={data} />
            </Card>
          </Col>
          <Col xl={12} xxl={14} lg={11} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}>{t('tabular_view_top_customers')} </h2>
            <Card hoverable style={{ height: '90%' }}>
              <SalesComparisonReportforTopCustomers
                data={data}
                refetch={refetch}
                isFetching={isFetching}
                isSaleReportError={isSaleReportError}
                isSaleReportLoading={isSaleReportLoading}
              />
            </Card>
          </Col>
        </Row>
      </Card>
      <Card style={{}}>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%' }}>
          <Col xl={12} xxl={10} lg={12} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}>
              {t('top')} {count} {t('items')}
            </h2>
            <Card hoverable style={{ height: '90%' }}>
              <ItemSalesGraph data={data} />
            </Card>
          </Col>
          <Col xl={12} xxl={14} lg={11} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}> {t('tabular_view_top_items')} </h2>
            <Card hoverable style={{ height: '90%' }}>
              <SalesComparisonReportforTopItems
                data={data}
                refetch={refetch}
                isFetching={isFetching}
                isSaleReportError={isSaleReportError}
                isSaleReportLoading={isSaleReportLoading}
              />
            </Card>
          </Col>
        </Row>
      </Card>
      <Card style={{}}>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%' }}>
          <Col xl={12} xxl={10} lg={12} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}>
              {t('top')} {count} {t('cities')}
            </h2>
            <Card hoverable style={{ height: '90%' }}>
              <CitiesSalesGraph data={data} />
            </Card>
          </Col>
          <Col xl={12} xxl={14} lg={11} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}> {t('tabular_view_top_cities')} </h2>
            <Card hoverable style={{ height: '90%' }}>
              <SalesComparisonReportforTopCities
                data={data}
                refetch={refetch}
                isFetching={isFetching}
                isSaleReportError={isSaleReportError}
                isSaleReportLoading={isSaleReportLoading}
              />
            </Card>
          </Col>
        </Row>
      </Card>
      <Card style={{}}>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%' }}>
          <Col xl={12} xxl={10} lg={12} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}>
              {t('top')} {count} {t('pack_size')}
            </h2>
            <Card hoverable style={{ height: '90%' }}>
              <PackingSizeSalesGraph data={data} />
            </Card>
          </Col>
          <Col xl={12} xxl={14} lg={11} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}> {t('tabular_view_top_pack_sizes')} </h2>
            <Card hoverable style={{ height: '90%' }}>
              <SalesComparisonReportforTopPackSize
                data={data}
                refetch={refetch}
                isFetching={isFetching}
                isSaleReportError={isSaleReportError}
                isSaleReportLoading={isSaleReportLoading}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default SearchCriteria;
