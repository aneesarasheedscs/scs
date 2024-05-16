import { AntButton, AntDatePicker, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetInventryReportDocumentTypeCombo,
  useGetInventryReportItems,
  useGetInventryReportSupplierCustomer,
  useGetInventryReportTable,
  useGetInventryReportWareHouse,
} from '../queries';
import { InventoryReport, TInventryReportSearchCriteria } from './types';
import { map } from 'lodash';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';

const { useForm, useWatch } = Form;

const SearchCriteriaForm: React.FC<{
  FromdateProp?: Date | string;
  ToDateProp?: Date | string;
  WarehouseId?: number;
  ItemId?: number;
}> = (props) => {
  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = props;
  const { t } = useTranslation();

  const location = useLocation();
  const { ItemIds } = location.state || {};

  const [open, setOpen] = useState(false);
  const [form] = useForm<TInventryReportSearchCriteria>();
  const { setFieldValue } = form;
  const formValues = useWatch<TInventryReportSearchCriteria>([], form);

  const { data: warehouse } = useGetInventryReportWareHouse();
  const { data: Items, isLoading } = useGetInventryReportItems();
  const { data: supplierCustomer } = useGetInventryReportSupplierCustomer();
  console.log(Items);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(ItemIds);

  const financialYear = storedFinancialYear();
  const FStartPeriod = dayjs(financialYear?.Start_Period);
  useEffect(() => {
    if (!isLoading && ItemIds && Array.isArray(Items)) {
      const ItemName = Items.filter((item: InventoryReport) => item.Id === parseInt(ItemIds));
      console.log(ItemName);
      form.setFields([{ name: 'ItemId', value: ItemName?.[0]?.Id }]);
    } else if (Array.isArray(Items)) {
      form.setFields([{ name: 'ItemId', value: null }]);
    }
    if (WarehouseId === undefined && ItemId === undefined) {
      // const januaryFirst = dayjs().subtract(1, 'year').set('month', 0).set('date', 1);
      form.setFields([{ name: 'FromDate', value: FStartPeriod }]);
      form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    } else {
      setFieldValue('FromDate', dayjs(FromdateProp));
      setFieldValue('ToDate', dayjs(ToDateProp));
      setFieldValue('WarehouseId', WarehouseId);
      setFieldValue('ItemId', ItemId);
    }
  }, [!isLoading, Items]);

  const {
    refetch,
    isFetching,
    isError: isInventryError,
    isLoading: isInventryLoading,
  } = useGetInventryReportTable(
    WarehouseId !== undefined && ItemId !== undefined ? true : false,
    form.getFieldsValue()
  );

  const onFinish = (values: TInventryReportSearchCriteria) => {
    console.log(values);
    refetch().then(() => handleClose());
  };

  const formfield = {
    borderBottom: '1px solid gray',
    padding: '0px',
    height: '30px',
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={CriteriaRowGutter} justify={'space-between'}>
          <Col xs={20} sm={24} md={11} style={formfield}>
            <AntDatePicker name="FromDate" label={t('from_date')} required bordered={false} />
          </Col>

          <Col xs={20} sm={24} md={11} style={formfield}>
            <AntDatePicker name="ToDate" label={t('to_date')} required bordered={false} />
          </Col>

          <Col xs={12} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              name="SupplierCustomerId"
              fieldValue="Id"
              label={t('party_name')}
              fieldLabel="Supplier_Customer"
              options={map(supplierCustomer, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={13} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              name="ItemId"
              label={t('item_name')}
              fieldValue="Id"
              fieldLabel="name"
              options={map(Items, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={12} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              name="WarehouseId"
              fieldValue="Id"
              fieldLabel="name"
              label={t('ware_house')}
              options={map(warehouse, (item: any) => ({
                value: item.Id,
                label: item.name,
              }))}
            />
          </Col>

          <Col xs={13} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              name="DocumentTypeId"
              fieldValue="RefDocumentTypeId"
              fieldLabel="DocumentTypeDescription"
              label={t('document_type')}
              query={useGetInventryReportDocumentTypeCombo}
            />
          </Col>
        </Row>
        <Col xxl={24} style={{ display: 'flex', justifyContent: 'end' }}>
          <Col xs={12} sm={4} md={4} xxl={3}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 6 }}
              isError={isInventryError}
              isLoading={isInventryLoading || isFetching}
            />
          </Col>
        </Col>
      </Form>
    </SearchCriteriaWrapper>
  );
};

export default SearchCriteriaForm;
