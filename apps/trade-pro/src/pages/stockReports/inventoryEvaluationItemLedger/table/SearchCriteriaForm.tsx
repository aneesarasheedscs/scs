import { AntButton, AntDatePicker, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Col, Form, Radio, Row } from 'antd';
import { TInventoryEvaluationLedgerSearchCriteria } from '../types';
import {
  useGetDocumentType,
  useGetItemCategory,
  useGetItemClassGroup,
  useGetItemName,
  useGetItemType,
  useGetParentCategory,
  useGetStockAccount,
  useGetWarehouse,
  useInventoryReportHistory,
} from '../query';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { useLocation } from 'react-router-dom';

const { useForm, useWatch } = Form;

const SearchCriteriaForm: React.FC<{
  FromdateProp?: Date | string;
  ToDateProp?: Date | string;
  WarehouseId?: number;
  ItemId?: number;
}> = (props) => {
  const { t } = useTranslation();
  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = props;
  const [open, setOpen] = useState(false);
  console.log();
  const [form] = useForm<TInventoryEvaluationLedgerSearchCriteria>();
  const formValues = useWatch<TInventoryEvaluationLedgerSearchCriteria>([], form);
  const { setFieldValue } = form;

  const {
    refetch,
    isFetching,
    isError: isInventoryReportError,
    isLoading: isInventoryReportLoading,
  } = useInventoryReportHistory(
    WarehouseId !== undefined && ItemId !== undefined ? true : false,
    form.getFieldsValue()
  );

  const location = useLocation();
  const { ItemIds } = location.state || {};

  const { data: itemType } = useGetItemType();
  const { data: Items, isLoading } = useGetItemName();
  const { data: parentCategory } = useGetParentCategory();
  const { data: classGroup } = useGetItemClassGroup();
  const { data: itemCategory } = useGetItemCategory();
  const { data: documentType } = useGetDocumentType();
  const { data: wareHouse } = useGetWarehouse();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (values: TInventoryEvaluationLedgerSearchCriteria) => {
    console.log(values);
    refetch().then(() => handleClose());
  };

  const financialYear = storedFinancialYear();
  const FStartPeriod = dayjs(financialYear?.Start_Period);

  useEffect(() => {
    if (!isLoading && ItemIds && Array.isArray(Items)) {
      const ItemName = Items.filter((item: any) => item.Id === parseInt(ItemIds));
      console.log(ItemName);
      form.setFields([{ name: 'ItemId', value: ItemName?.[0]?.Id }]);
    } else if (Array.isArray(Items)) {
      form.setFields([{ name: 'ItemId', value: null }]);
    }

    if (WarehouseId === undefined && ItemId === undefined) {
      // const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
      form.setFields([{ name: 'FromDate', value: FStartPeriod }]);
      form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    } else {
      setFieldValue('FromDate', dayjs(FromdateProp));
      setFieldValue('ToDate', dayjs(ToDateProp));
      setFieldValue('WarehouseId', WarehouseId);
      setFieldValue('ItemId', ItemId);
    }
  }, [!isLoading, Items]);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={24} md={11} className="formfield">
            <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label={t('class_group')}
              fieldLabel="name"
              name="ItemClassGroupId"
              options={map(classGroup, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label={t('parent_category')}
              fieldLabel="name"
              name="InventoryParentCategories"
              options={map(parentCategory, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label={t('item_name')}
              fieldLabel="name"
              name="ItemId"
              options={map(Items, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              name="ItemCategoryId"
              fieldValue="Id"
              label={t('item_category')}
              fieldLabel="name"
              options={map(itemCategory, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              name="ItemTypeId"
              fieldValue="Id"
              fieldLabel="name"
              label={t('item_type')}
              options={map(itemType, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              name="PurchaseGLAC"
              fieldValue="Id"
              label={t('stock_account')}
              fieldLabel="AccountTitle"
              query={useGetStockAccount}
              bordered={false}
            />
          </Col>
        </Row>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%', marginTop: 10 }}>
          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              name="WarehouseId"
              label={t('ware_house_name')}
              fieldValue="Id"
              fieldLabel="name"
              options={map(wareHouse, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              name="DocumentTypeId"
              label={t('document_type')}
              fieldValue="Id"
              fieldLabel="name"
              options={map(documentType, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Radio.Group
              onChange={(e) => {
                form.setFieldsValue({ ActionId: e.target.value });
              }}
              defaultValue={2}
            >
              <Radio value={1}> {t('sale_value')}</Radio>
              <Radio value={2}> {t('cgs_value')}</Radio>
            </Radio.Group>
            <AntInput label="" name="ActionId" type="hidden" />
          </Col>
          <Col xs={24} sm={24} md={4} xxl={3}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isInventoryReportError}
              isLoading={isInventoryReportLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
};

export default SearchCriteriaForm;
