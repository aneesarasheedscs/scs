import { Col, Row } from 'antd';
import { useState } from 'react';
import { TPaymentTerms } from '../type';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetDeliveryTerms, useGetPaymentTerms, useGetSupplierCustomer } from '../queryOptions';

function MainEntry() {
  const [paymentTerm, setPaymentTerm] = useState('');
  const handlePaymentTermChange = (obj: TPaymentTerms) => setPaymentTerm(obj?.TermsDescription);

  const isDueFieldsDisabled = paymentTerm === 'Cash' ? true : false;

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
          onSelectChange={handlePaymentTermChange}
        />
      </Col>

      <Col xs={4}>
        <AntInputNumber
          label="Due Days"
          name="OrderDueDays"
          disabled={isDueFieldsDisabled}
          required={!isDueFieldsDisabled}
        />
      </Col>

      <Col xs={4}>
        <AntDatePicker
          label="Due Date"
          name="OrderDueDate"
          disabled={isDueFieldsDisabled}
          required={!isDueFieldsDisabled}
        />
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
