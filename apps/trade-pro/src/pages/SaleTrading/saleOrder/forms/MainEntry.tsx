import { Col, FormInstance, Row, Typography } from 'antd';
import { useState } from 'react';
import { TPaymentTerms } from '../type';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetCustomerName, useGetShiptToAddress, useGetSubPartyAccount } from '../queryOptions';
import { map } from 'lodash';
import { useGetPaymentTerms } from '@tradePro/pages/purchaseTrading/purchaseOrder/queryOptions';

function MainEntry() {
  const [paymentTerm, setPaymentTerm] = useState('');
  interface TDeliveryTerm {
    Id: number;
    Cost: string;
  }

  const status: TDeliveryTerm[] = [
    {
      Id: 1,
      Cost: 'Cost',
    },
    {
      Id: 2,
      Cost: 'Cost & Freight',
    },
  ];
  interface TOrderStatus {
    Id: number;
    Open: string;
  }

  const Oderstatus: TOrderStatus[] = [
    {
      Id: 1,
      Open: 'Open',
    },
    {
      Id: 2,
      Open: 'Complete',
    },
    {
      Id: 3,
      Open: 'Cancel',
    },
  ];
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
          label="Customer Name"
          name="CompanyName"
          fieldLabel="CompanyName"
          query={useGetCustomerName}
        />
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

      <Col xs={9}>
        <AntInput name="RemarksHeader" label="Remarks" />
      </Col>
      <Col xs={4}>
        <AntSelectDynamic
          required
          name="DeliveryTerm"
          label="Delivery Term"
          fieldValue="DeliveryTerm"
          fieldLabel=""
          options={map(status, (item: any) => ({
            value: item.Id,
            label: item.Cost,
          }))}
        />
      </Col>
      <Col xs={4}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label="Ship to Address"
          name="ShipToAddress"
          query={useGetShiptToAddress}
          fieldLabel="CompanyName"
          onSelectChange={handlePaymentTermChange}
        />
      </Col>
      <Col xs={4}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label="Sub Party Account"
          name="SubPartyAccount"
          query={useGetSubPartyAccount}
          fieldLabel="CompanyName"
        />
      </Col>
      <Col xs={4}>
        <AntSelectDynamic
          required
          name=""
          label="Order Status"
          fieldValue=""
          fieldLabel=""
          options={map(Oderstatus, (item: any) => ({
            value: item.Id,
            label: item.Open,
          }))}
          defaultValue={1}
        />
      </Col>
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };
export default MainEntry;
