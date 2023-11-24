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
} from '../queries/queries';
import { TInventryReportSearchCriteria } from './types';
import { map } from 'lodash';
import dayjs from 'dayjs';

const { useForm, useWatch } = Form;

const SearchCriteriaForm: React.FC<{
  FromdateProp?: Date | string;
  ToDateProp?: Date | string;
  WarehouseId?: number;
  ItemId?: number;
}> = (props) => {
  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TInventryReportSearchCriteria>();
  const { setFieldValue } = form;
  const formValues = useWatch<TInventryReportSearchCriteria>([], form);

  const { data: warehouse } = useGetInventryReportWareHouse();
  const { data: Items } = useGetInventryReportItems();
  const { data: supplierCustomer } = useGetInventryReportSupplierCustomer();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (WarehouseId === undefined && ItemId === undefined) {
      const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
      form.setFields([{ name: 'FromDate', value: januaryFirst }]);
      form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    } else {
      setFieldValue('FromDate', dayjs(FromdateProp));
      setFieldValue('ToDate', dayjs(ToDateProp));
      setFieldValue('WarehouseId', WarehouseId);
      setFieldValue('ItemId', ItemId);
    }
  }, []);

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
    height: '40px',
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntDatePicker name="FromDate" label={t('from_date')} required bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntDatePicker name="ToDate" label={t('to_date')} required bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
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

          <Col xs={24} sm={24} md={11} style={formfield}>
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

          <Col xs={24} sm={24} md={11} style={formfield}>
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

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntSelectDynamic
              bordered={false}
              name="DocumentTypeId"
              fieldValue="RefDocumentTypeId"
              fieldLabel="DocumentTypeDescription"
              label={t('document_type')}
              query={useGetInventryReportDocumentTypeCombo}
            />
          </Col>

          <Col xs={24} sm={24} md={8}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 4 }}
              isError={isInventryError}
              isLoading={isInventryLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
};

export default SearchCriteriaForm;
