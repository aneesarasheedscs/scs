import {
  useGetItems,
  useGetSuppliers,
  useGetOrderStatus,
  useGetPurchaseOrder,
  useGetApprovedStatus,
} from '../queries';
import { useState } from 'react';
import { Col, DatePicker, Form, Row } from 'antd';
import { TPurchaseOrderSearchCriteria } from '../type';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';

const { useForm, useWatch } = Form;
const { RangePicker } = DatePicker;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TPurchaseOrderSearchCriteria>();
  const { data, isError, isLoading } = useGetSuppliers();
  const { data: itemsData, isError: isItemsError, isLoading: isItemsLoading } = useGetItems();

  const {
    data: statusData,
    isError: isStatusError,
    isLoading: isStatusLoading,
  } = useGetOrderStatus();

  const {
    data: approvedStatusData,
    isError: isApprovedStatusError,
    isLoading: isApprovedStatusLoading,
  } = useGetApprovedStatus();

  const {
    refetch,
    isFetching,
    isError: isPurchaseOrderError,
    isLoading: isPurchaseOrderLoading,
  } = useGetPurchaseOrder(false, form.getFieldsValue());

  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    refetch().then(() => handleClose());
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} layout="vertical" initialValues={formValues}>
        <Form.Item name="date" label="From Date - To Date">
          <RangePicker className="fullWidth" />
        </Form.Item>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntInput name="FromDocNo" label="PO From" inputProps={{ type: 'number' }} />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntInput name="ToDocNo" label="PO To" inputProps={{ type: 'number' }} />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              isError={isError}
              isLoading={isLoading}
              label="Supplier Name"
              fieldLabel="CompanyName"
              name="SupplierCustomerId"
              data={data?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="ItemId"
              fieldValue="Id"
              label="Item Name"
              fieldLabel="ItemName"
              isError={isItemsError}
              isLoading={isItemsLoading}
              data={itemsData?.data?.Data?.Result}
            />
          </Col>
        </Row>
        <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              name="Status"
              label="Status"
              fieldValue="Id"
              fieldLabel="Status"
              isError={isStatusError}
              isLoading={isStatusLoading}
              data={statusData?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              fieldValue="Id"
              name="IsApproved"
              label="Is Approved"
              fieldLabel="Status"
              isError={isApprovedStatusError}
              isLoading={isApprovedStatusLoading}
              data={approvedStatusData?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntButton
              label="Show"
              onClick={handleClick}
              className="fullWidth"
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
