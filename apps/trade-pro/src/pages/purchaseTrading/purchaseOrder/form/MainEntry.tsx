import { Col, Row } from 'antd';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';

function MainEntry({}: TMainEntry) {
  return (
    <Row gutter={10}>
      <Col xs={4}>
        <AntDatePicker required name="DocDate" label="Document Date" />
      </Col>

      <Col xs={7}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label="Supplier Name"
          // queryOptions={getSuppliers}/
          fieldLabel="CompanyName"
          name="SupplierCustomerId"
        />
      </Col>

      <Col xs={9}>
        <AntInput name="" label="Remarks" />
      </Col>

      <Col xs={4}>
        <AntSelectDynamic required fieldValue="" fieldLabel="" name="" label="Payment Term" />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="" label="Due Days" />
      </Col>

      <Col xs={4}>
        <AntDatePicker required name="" label="Due Date" />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="" label="Supplier Ref No." />
      </Col>

      <Col xs={4}>
        <AntSelectDynamic required fieldValue="" fieldLabel="" name="" label="Delivery Term" />
      </Col>

      <Col xs={4}>
        <AntDatePicker required name="" label="Deliver Start Date" />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="" label="Delivery Days" />
      </Col>
    </Row>
  );
}

type TMainEntry = {};

export default MainEntry;
