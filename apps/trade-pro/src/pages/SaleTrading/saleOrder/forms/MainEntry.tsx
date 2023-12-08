import { Card, Col, FormInstance, Row, Typography } from 'antd';
import { useState } from 'react';
import { TPaymentTerms, TSaleOrder, TSaleOrderDetail } from '../type';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetCustomerNameSalesManAgent, useGetShiptToAddress, useGetSubPartyAccount } from '../queryOptions';
import { map } from 'lodash';
import { useGetPaymentTerms } from '@tradePro/pages/purchaseTrading/purchaseOrder/queryOptions';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import SalesPersonalInfo from './SalesInfo';

function MainEntry({ form }: TDynamicForm) {
  const [paymentTerm, setPaymentTerm] = useState('');
  const { setFields, getFieldValue } = form;
  const [isOrderOpen, setIsOrderOpen] = useState(true);

  const formValues = useWatch<TSaleOrder>([], form);


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

  const handleDueDaysChange = (value: any) => {
    console.log(value);
    if (value !== null && value !== undefined) {
      const docDate = getFieldValue('DocDate');
      if (docDate) {
        const dueDate = new Date(docDate);
        dueDate.setDate(dueDate.getDate() + value);
        console.log(dueDate);
        setFields([{ name: 'OrderDueDate', value: dayjs(dueDate) }]);
      }
    }
  };
  // const handlePaymentTermChange = (obj: TPaymentTerms) => setPaymentTerm(obj?.TermsDescription);

  const isDueFieldsDisabled = paymentTerm === 'Cash' ? true : false;

  const handlePaymentTermChange = (obj: TPaymentTerms) => {
    setPaymentTerm(obj?.TermsDescription);

    if (obj?.TermsDescription === 'Cash') {
      setFields([{ name: 'OrderDueDays', value: null }]);
      setFields([{ name: 'OrderDueDate', value: null }]);
    }
  };

  const handleOrderStatusChange = (value: number) => {
    setIsOrderOpen(value === 1);
  };
  // const currentDate = new Date();
  // const formattedCurrentDate = dayjs(currentDate).format('YYYY-MM-DD');

  // // Set the default value for the DocDate field
  // form.setFieldsValue({ DocDate: formattedCurrentDate });



  

  return (
    <Card style={{ boxShadow: '2px 4px 12px 1px gray', marginTop: '20px' }}>
      <Row gutter={[16, 16]} justify={'space-between'}>


        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={7} className="formfields">
          <AntSelectDynamic
            bordered={false}
            required
            fieldValue="Id"
            label="Customer Name"
            name="CompanyId"
            fieldLabel="CompanyName"
            query={useGetCustomerNameSalesManAgent}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={5} className="formfields">
          <AntSelectDynamic
            bordered={false}
            required
            fieldValue="Id"
            label="Payment Term"
            name="PaymentTermsId"
            query={useGetPaymentTerms}
            fieldLabel="TermsDescription"
            onSelectChange={handlePaymentTermChange}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={5} className="formfields">
          <AntInputNumber
            bordered={false}
            label="Due Days"
            name="OrderDueDays"
            disabled={isDueFieldsDisabled}
            required={!isDueFieldsDisabled}
            onChange={(value) => handleDueDaysChange(value)}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={5} className="formfields">
          <AntDatePicker
            bordered={false}
            placeholder=""
            label="Due Date"
            name="OrderDueDate"
            disabled={isDueFieldsDisabled}
            required={!isDueFieldsDisabled}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={7} className="formfields">
          <AntSelectDynamic
            bordered={false}
            required
            fieldValue="Id"
            label="Ship to Address"
            name="ShiptoAddress"
            query={useGetShiptToAddress(formValues?.CompanyId)}
            fieldLabel="CompanyName"
            onSelectChange={handlePaymentTermChange}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={5} className="formfields">
          <AntSelectDynamic
            bordered={false}
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

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={5} className="formfields">
          <AntSelectDynamic
            bordered={false}
            required
            fieldValue="Id"
            label="Sub Party Account"
            name="SubPartyAccount"
            query={useGetSubPartyAccount(formValues?.CompanyId)}
            fieldLabel="CompanyName"
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={5} className="formfields">
          <AntSelectDynamic
            bordered={false}
            required
            name=""
            label="Order Status"
            fieldValue=""
            fieldLabel=""
            options={map(Oderstatus, (item: TOrderStatus) => ({
              value: item.Id,
              label: item.Open,
              disabled: item.Id !== 1,
            }))}
            // defaultValue={1}
            onSelectChange={handleOrderStatusChange}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={13} className="formfields">
          <AntInput name="RemarksHeader" label="Remarks" bordered={false} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <SalesPersonalInfo form={form} />
      </Row>
    </Card>
  );
}
type TDynamicForm = { form: FormInstance };
export default MainEntry;
