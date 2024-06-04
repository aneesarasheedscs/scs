import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Radio, Row, Tabs } from 'antd';
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
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { map } from 'lodash';

const { useWatch, useForm } = Form;
function SearchCriteria() {
  const { t } = useTranslation();
  const financialYear = storedFinancialYear();
  const StartDate = financialYear?.Start_Period;
  const EndDate = financialYear?.End_Period;
  const [form] = useForm<TSearchCriteriaSalesComparison>();
  const formValues = useWatch<TSearchCriteriaSalesComparison>([], form);
  const [count, setCount] = useState<any>(0);
  const { data: ParentCategory } = useGetParentCategory();
  const { data: ItemType } = useGetItemType();

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
    // form.setFieldsValue({ CompanyIds: 2 });
  }, []);
  const TopOrBottom = form.getFieldValue('ApprovedFilter');
  useEffect(() => {
    setCount(form.getFieldValue('NoOfRecords'));
  }, [form.getFieldValue('NoOfRecords')]);
  return (
    <>
      <Card className="salesComaprisonCard" hoverable>
        <Form form={form} onFinish={onFinish}>
          <Row
            gutter={CriteriaRowGutter}
            justify={'space-between'}
            style={{ width: '95%', marginLeft: 5, border: '', marginBottom: '-1%' }}
          >
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
                options={map(ParentCategory, (item: any) => ({
                  value: item.Id,
                  label: item.ReferenceName,
                }))}
                // query={useGetParentCategory}
              />
            </Col>
            <Col xxl={5} xl={7} lg={10} md={11} sm={14} xs={20} className="formfield">
              <AntSelectDynamic
                bordered={false}
                label={t('item_type')}
                fieldLabel="TypeDescription"
                fieldValue="ItemTypeId"
                name="ItemTypeId"
                options={map(ItemType, (item: any) => ({
                  value: item.Id,
                  label: item.ReferenceName,
                }))}
                // query={useGetItemType}
              />
            </Col>
            <Col xxl={6} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntSelectDynamic
                bordered={false}
                fieldLabel="CompName"
                fieldValue="Id"
                name="CompanyId"
                label={t('company')}
                query={useGetCompanies}
              />
            </Col>
            <Col xxl={6} xl={7} lg={10} md={12} sm={14} xs={20} className="formfield">
              <AntInput name="NoOfRecords" label={t('count')} bordered={false} />
            </Col>
            <Col xs={24} sm={24} md={6} xxl={9} style={{ marginTop: 10, height: '4vh' }}>
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
                style={{ marginTop: 5 }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        style={{ boxShadow: '2px 2px 10px 0px gray', marginBottom: '0.5%' }}
        cover={
          <>
            <h2
              style={{
                padding: '5px',
                textAlign: 'center',
                borderBottom: '1px  solid lightgray',
              }}
            >
              {TopOrBottom === 'Top' ? (
                <>
                  {t('top')} &nbsp;{count} {t('customers')}
                </>
              ) : (
                <>
                  {t('bottom')} &nbsp;{count} {t('customers')}
                </>
              )}
            </h2>
          </>
        }
      >
        <Row justify={'space-between'}>
          <Col xxl={12} xl={22} lg={24} md={24} sm={24} xs={24} style={{ marginRight: 0 }}>
            <SalesComparisonReportforTopCustomers
              data={data}
              refetch={refetch}
              isFetching={isFetching}
              isSaleReportError={isSaleReportError}
              isSaleReportLoading={isSaleReportLoading}
            />{' '}
          </Col>
          <Col xxl={11} xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 'px' }}>
            {/* <Card hoverable style={{ height: 'auto' }}> */}
            <CustomersSalesGraph data={data} />
            {/* </Card> */}
          </Col>
        </Row>
      </Card>
      <Card
        style={{ boxShadow: '2px 2px 10px 0px gray', marginBottom: '0.5%' }}
        cover={
          <>
            <h2
              style={{
                padding: '5px',
                textAlign: 'center',
                borderBottom: '1px  solid lightgray',
              }}
            >
              {TopOrBottom === 'Top' ? (
                <>
                  {t('top')} &nbsp;{count} {t('items')}
                </>
              ) : (
                <>
                  {t('bottom')} &nbsp;{count} {t('items')}
                </>
              )}
            </h2>
          </>
        }
      >
        <Row justify={'space-between'}>
          <Col xxl={11} xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 'px' }}>
            <ItemSalesGraph data={data} />
          </Col>
          <Col xxl={12} xl={22} lg={24} md={24} sm={24} xs={24} style={{ marginRight: 0 }}>
            <SalesComparisonReportforTopItems
              data={data}
              refetch={refetch}
              isFetching={isFetching}
              isSaleReportError={isSaleReportError}
              isSaleReportLoading={isSaleReportLoading}
            />
          </Col>
        </Row>
      </Card>
      <Card
        style={{ boxShadow: '2px 2px 10px 0px gray', marginBottom: '0.5%' }}
        cover={
          <>
            <h2
              style={{
                padding: '5px',
                textAlign: 'center',
                borderBottom: '1px  solid lightgray',
              }}
            >
              {TopOrBottom === 'Top' ? (
                <>
                  {t('top')} &nbsp;{count} {t('pack_size')}
                </>
              ) : (
                <>
                  {t('bottom')} &nbsp;{count} {t('pack_size')}
                </>
              )}
            </h2>
          </>
        }
      >
        <Row justify={'space-between'}>
          <Col xxl={12} xl={22} lg={24} md={24} sm={24} xs={24} style={{ marginRight: 0 }}>
            <SalesComparisonReportforTopPackSize
              data={data}
              refetch={refetch}
              isFetching={isFetching}
              isSaleReportError={isSaleReportError}
              isSaleReportLoading={isSaleReportLoading}
            />
          </Col>
          <Col xxl={11} xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 'px' }}>
            <PackingSizeSalesGraph data={data} />
          </Col>
        </Row>
      </Card>
      <Card
        style={{ boxShadow: '2px 2px 10px 0px gray', marginBottom: '0.5%' }}
        cover={
          <>
            <h2
              style={{
                padding: '5px',
                textAlign: 'center',
                borderBottom: '1px  solid lightgray',
              }}
            >
              {TopOrBottom === 'Top' ? (
                <>
                  {t('top')} &nbsp;{count} {t('cities')}
                </>
              ) : (
                <>
                  {t('bottom')} &nbsp;{count} {t('cities')}
                </>
              )}
            </h2>
          </>
        }
      >
        <Row justify={'space-between'}>
          <Col xxl={11} xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 'px' }}>
            <CitiesSalesGraph data={data} />
          </Col>

          <Col xxl={12} xl={22} lg={24} md={24} sm={24} xs={24} style={{ marginRight: 0 }}>
            <SalesComparisonReportforTopCities
              data={data}
              refetch={refetch}
              isFetching={isFetching}
              isSaleReportError={isSaleReportError}
              isSaleReportLoading={isSaleReportLoading}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default SearchCriteria;
