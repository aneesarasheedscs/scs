import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useGetItems, useGetSuppliers, useGetWarehouseName, useGetGRNJobLot, useGetGRNCityName } from './queryOption';
import { useGRNDetailTable } from '../../query';
import { TGRNSearchCriteria } from '../../types';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TGRNSearchCriteria>();
  const formValues = useWatch<TGRNSearchCriteria>([], form);

  const {
    refetch,
    isFetching,
    isError: isPurchaseOrderError,
    isLoading: isPurchaseOrderLoading,
  } = useGRNDetailTable(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TGRNSearchCriteria) => {
    refetch().then(() => handleClose());
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={24} md={11} className="formfield">
            <AntDatePicker name="FromDate" bordered={false} label="From Date" />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntDatePicker name="ToDate" label="To Date" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntInputNumber name="FromDocNo" label="GRN From" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntInputNumber name="ToDocNo" label="GRN To" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label="Supplier Name"
              query={useGetSuppliers}
              fieldLabel="CompanyName"
              name="SupplierCustomerId"
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              name="ItemId"
              fieldValue="Id"
              label="Item Name"
              query={useGetItems}
              fieldLabel="ItemName"
              bordered={false}
            />
          </Col>
        </Row>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%', marginTop: 10 }}>
          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              name="WareHouseCode"
              label="Warehouse Name"
              fieldValue="Id"
              fieldLabel="WareHouseName"
              query={useGetWarehouseName}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              name="JobLotCode"
              label="Job Lot"
              fieldLabel="JobLotDescription"
              query={useGetGRNJobLot}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              name="Code"
              label="City Name"
              fieldLabel="CityName"
              query={useGetGRNCityName}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={4}>
            <AntButton
              label="Show"
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isPurchaseOrderError}
              isLoading={isPurchaseOrderLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
