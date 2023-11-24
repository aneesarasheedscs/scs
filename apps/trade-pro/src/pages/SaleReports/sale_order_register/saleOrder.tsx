import React, { useState } from 'react';
import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';

import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import {
  useGetParentCategories,
  useGetItemCategory,
  useGetItemDescription,
  useGetItemNameCategories,
  useGetCustomerName,
  useGetApprovedStatus,
  useGetOrderStatus,
} from './queries';
import { useSalesReportTable } from './tableQueries';
import { SaleOrderRetailCriteria } from './type';
import { storedFinancialYear } from '@tradePro/utils/storageService';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function SaleOrderFormCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<SaleOrderRetailCriteria>();
  const formValues = useWatch<SaleOrderRetailCriteria>([], form);
  const { setFieldValue } = form;

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);

  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useSalesReportTable(false, form.getFieldsValue());

  const onFinish = (_: SaleOrderRetailCriteria) => {
    refetch().then(() => handleClose());
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const fieldVal = (fieldValue: any) => {
  //   console.log(`i select Id ${fieldValue}`);
  // };

  return (
    <div>
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          // initialValues={formValues}
          initialValues={{ FromDate, ToDate }}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12} md={8}>
              <AntDatePicker name="FromDate" label="From Date" />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <AntDatePicker name="ToDate" label="To Date" />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <AntInputNumber name="FromDocNo" label="Sale Order From" />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntInputNumber name="ToDocNo" label="Sale Order To" />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="InventoryParentCategories"
                label="Parent Category"
                fieldValue="Id"
                fieldLabel="InvParentCateDescription"
                query={useGetParentCategories}
                // onChange={fieldVal}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="ItemCategoryId"
                label="Item Category"
                fieldValue="Id"
                fieldLabel="CategoryDescription"
                query={useGetItemCategory}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="ItemTypeId"
                label="Type Item"
                fieldValue="Id"
                fieldLabel="TypeDescription"
                query={useGetItemDescription}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="ItemId"
                label="Item Name"
                fieldValue="Id"
                fieldLabel="ItemName"
                query={useGetItemNameCategories}
              />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="SupplierCustomerId"
                label="Customer Name"
                fieldValue="Id"
                fieldLabel="CompanyName"
                query={useGetCustomerName}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="IsApproved"
                label="Approved Status"
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetApprovedStatus}
              />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="Status"
                label="Status"
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetOrderStatus}
              />
            </Col>

            <Col xs={24} sm={24} md={8}>
              <br />
              <AntButton
                label="Show"
                htmlType="submit"
                style={{ marginTop: 2 }}
                isError={isReportError}
                isLoading={isReportLoading || isFetching}
              />
            </Col>
          </Row>
        </Form>
      </SearchCriteriaWrapper>
    </div>
  );
}

export default SaleOrderFormCriteria;
