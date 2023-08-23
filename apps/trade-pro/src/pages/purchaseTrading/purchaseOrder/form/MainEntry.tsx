import { Col, Row } from 'antd';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetDeliveryTerms, useGetPaymentTerms, useGetSupplierCustomer } from '../queryOptions';

function MainEntry() {
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
          name="OrderSupCustId"
          fieldLabel="CompanyName"
          query={useGetSupplierCustomer}
        />
      </Col>

      <Col xs={9}>
        <AntInput name="RemarksHeader" label="Remarks" />
      </Col>

      <Col xs={4}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label="Payment Term"
          name="PaymentTermsId"
          query={useGetPaymentTerms}
          fieldLabel="TermsDescription"
        />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="OrderDueDays" label="Due Days" />
      </Col>

      <Col xs={4}>
        <AntDatePicker required name="OrderDueDate" label="Due Date" />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="SupplierRefNo" label="Supplier Ref No." />
      </Col>

      <Col xs={4}>
        <AntSelectDynamic
          required
          name="DeliveryTerm"
          label="Delivery Term"
          fieldValue="DeliveryTerm"
          fieldLabel="DeliveryTerm"
          query={useGetDeliveryTerms}
        />
      </Col>

      <Col xs={4}>
        <AntDatePicker name="DeliveryStartDate" label="Deliver Start Date" />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="DeliveryDays" label="Delivery Days" />
      </Col>
    </Row>
  );
}

export default MainEntry;
