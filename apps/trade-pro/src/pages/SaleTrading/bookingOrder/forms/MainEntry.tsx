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
import { FormRowGutter } from '@tradePro/globalAtoms';

function MainEntry({ form }: TDynamicForm) {
  console.log(FormRowGutter, 'gutter');
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
      <Col xxl={15}>
        <Row gutter={FormRowGutter} justify={'space-between'}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={9} className="formfields">
            <AntSelectDynamic
              bordered={false}
              required
              fieldValue="Id"
              label="Party Name"
              name="CompanyId"
              fieldLabel="CompanyName"
              query={useGetCustomerNameSalesManAgent}
            />
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={14} className="formfields">
            <AntInput name="RemarksHeader" label="Remarks" bordered={false} />
          </Col>
        </Row>
        {/* <Row style={{ marginTop: '15px' }}>
        <SalesPersonalInfo form={form} />
      </Row> */}
      </Col>
    </Card>
  );
}
type TDynamicForm = { form: FormInstance };
export default MainEntry;
