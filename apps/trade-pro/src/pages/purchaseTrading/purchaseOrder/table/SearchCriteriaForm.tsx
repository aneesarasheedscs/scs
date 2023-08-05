import { Col, DatePicker, Form, Row } from 'antd';
import { AntButton, AntInput, AntSelectDynamic } from '@tradePro/components';
import { useGetItems, useGetSuppliers, useGetOrderStatus, useGetApprovedStatus } from '../queries';

const { RangePicker } = DatePicker;

function SearchCriteria() {
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

  return (
    <Form layout="vertical" initialValues={{ remember: true }}>
      <Form.Item label="From Date - To Date">
        <RangePicker className="fullWidth" />
      </Form.Item>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12}>
          <AntInput label="PO From" inputProps={{ type: 'number' }} />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <AntInput label="PO To" inputProps={{ type: 'number' }} />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <AntSelectDynamic
            fieldValue="Id"
            isError={isError}
            isLoading={isLoading}
            label="Supplier Name"
            fieldLabel="CompanyName"
            data={data?.data?.Data?.Result}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <AntSelectDynamic
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
            label="Is Approved"
            fieldLabel="Status"
            isError={isApprovedStatusError}
            isLoading={isApprovedStatusLoading}
            data={approvedStatusData?.data?.Data?.Result}
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <AntButton label="Show" className="fullWidth" style={{ marginTop: 2 }} />
        </Col>
      </Row>
    </Form>
  );
}

export default SearchCriteria;
