import { AntButton, AntDatePicker, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Col, Form, Radio, Row } from 'antd';
import { TStockReportsSearchCriteria } from '../types';
import {
  useGetItemCategory,
  useGetItemClassGroup,
  useGetItemName,
  useGetItemType,
  useGetParentCategory,
  useGetStockAccount,
  useGetStockReportHistory,
  useGetWarehouse,
} from '../query';
import { map, values } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { selectedItems } from './Atom';
import { storedFinancialYear } from '@tradePro/utils/storageService';
const { useForm, useWatch } = Form;
interface TReportType {
  Id: string;
  ReportType: string;
}

function SearchCriteriaForm() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TStockReportsSearchCriteria>();
  const formValues = useWatch<TStockReportsSearchCriteria>([], form);
  const [selectedItem, setSelectedItems] = useAtom(selectedItems);

  const {
    refetch,
    isFetching,
    isError: isStockReportError,
    isLoading: isStockReportLoading,
  } = useGetStockReportHistory(true, form.getFieldsValue());
  const { data: itemType } = useGetItemType();
  const { data: itemName } = useGetItemName();
  const { data: parentCategory } = useGetParentCategory();
  const { data: classGroup } = useGetItemClassGroup();
  const { data: itemCategory } = useGetItemCategory();
  const { data: wareHouse } = useGetWarehouse();

  const ReportType: TReportType[] = [
    { Id: 'ItemStockSummary', ReportType: 'Item Stock Summary' },
    { Id: 'WarehouseandItemStockSummary', ReportType: 'Warehouse and Item Stock Summary' },
    { Id: 'ItemandWarehouseStockSummary', ReportType: 'Item and WareHouse Stock Summary' },
    { Id: 'ItemandPackSizeStockSummary', ReportType: 'Item and PackSize Stock Summary' },
    { Id: 'ItemTypeandPackSizeStockSummary', ReportType: 'Item Type and PackSize Stock Summary' },
  ];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const financialYear = storedFinancialYear();
  const FStartPeriod = dayjs(financialYear?.Start_Period);

  const onFinish = (values: TStockReportsSearchCriteria) => {
    console.log(values);

    setSelectedItems(values);
    console.log(selectedItem);
    refetch().then(() => handleClose());
  };

  useEffect(() => {
    // const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'FromDate', value: FStartPeriod }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    form.setFieldsValue({ ActionId: 2 });
  }, []);

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
              options={map(itemName, (item: any) => ({
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
              required
              name="Activity"
              label={t('report_type')}
              fieldValue="Id"
              fieldLabel="name"
              options={map(ReportType, (item: TReportType) => ({
                value: item.Id,
                label: item.ReportType,
              }))}
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12} className="formfield">
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

          <Col xs={24} sm={24} md={4}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isStockReportError}
              isLoading={isStockReportLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteriaForm;
