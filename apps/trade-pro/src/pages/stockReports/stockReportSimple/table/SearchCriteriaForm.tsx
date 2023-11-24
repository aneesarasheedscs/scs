import { AntButton, AntDatePicker, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { useEffect, useState } from 'react';
import { Col, Form, Radio, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { selectedItems } from './Atom';
import { map } from 'lodash';
import dayjs from 'dayjs';
import { TStockReportSearchCriteria } from './types';
import {
  useGetStockReportItemCategory,
  useGetStockReportItemName,
  useGetStockReportItemTypes,
  useGetStockReportParentCategory,
  useGetStockReportSimpleTable,
  useGetStockReportWareHouse,
} from '../queries/queries';
import { useAtom } from 'jotai';

const { useForm, useWatch } = Form;

interface TReportType {
  Id: string;
  ReportType: string;
}

function SearchCriteriaForm() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TStockReportSearchCriteria>();
  const formValues = useWatch<TStockReportSearchCriteria>([], form);
  const [selectedItem, setSelectedItems] = useAtom(selectedItems);

  const {
    refetch,
    isFetching,
    isError: isStockReportError,
    isLoading: isStockReportLoading,
  } = useGetStockReportSimpleTable(true, form.getFieldsValue());

  const { data: warehouse } = useGetStockReportWareHouse();
  const { data: Items } = useGetStockReportItemName();
  const { data: parentCategorie } = useGetStockReportParentCategory();
  const { data: itemCategory } = useGetStockReportItemCategory();
  const { data: itemTypes } = useGetStockReportItemTypes();

  const ReportType: TReportType[] = [
    { Id: 'ItemStockSummary', ReportType: 'Item Stock Summary' },
    { Id: 'ItemandWarehouseStockSummary', ReportType: 'Item and Warehouse Stock Summary' },
    { Id: 'ItemandPackSizeStockSummary', ReportType: 'Item and Pack Size Stock Summary' },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (values: TStockReportSearchCriteria) => {
    console.log(values);
    setSelectedItems(values);
    console.log(selectedItem);
    refetch().then(() => handleClose());
  };

  useEffect(() => {
    const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'FromDate', value: januaryFirst }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    form.setFieldsValue({ stockUOM: 2 });
  }, []);

  const formfield = {
    borderBottom: '1px solid gray',
    padding: '0px',
    height: '40px',
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntDatePicker name="FromDate" required label={t('from_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntDatePicker name="ToDate" required label={t('to_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              name="ParentCategoryId"
              fieldValue="Id"
              label={t('parent_category')}
              fieldLabel="name"
              options={map(parentCategorie, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              name="ItemCategoryId"
              label={t('item_category')}
              fieldValue="Id"
              fieldLabel="name"
              options={map(itemCategory, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              label={t('item_type')}
              fieldLabel="name"
              name="ItemTypeId"
              options={map(itemTypes, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              name="ItemId"
              label={t('item_name')}
              fieldLabel="name"
              options={map(Items, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              name="WarehouseId"
              label={t('ware_house')}
              fieldLabel="name"
              options={map(warehouse, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              required
              bordered={false}
              fieldValue="Id"
              name="Activity"
              label={t('report_type')}
              fieldLabel="name"
              options={map(ReportType, (item: any) => ({
                value: item.Id,
                label: item.ReportType,
              }))}
            />
          </Col>

          <Col xs={24} sm={24} md={6}>
            <Radio.Group
              onChange={(e) => {
                form.setFieldsValue({ stockUOM: e.target.value });
              }}
              defaultValue={2}
            >
              <Radio value={1}> {t('stock_uom')}</Radio>
              <Radio value={2}> {t('rate_uom')}</Radio>
            </Radio.Group>
            <AntInput label="" name="ActionId" type="hidden" />
          </Col>

          <Col xs={24} sm={24} md={8}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 4 }}
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
