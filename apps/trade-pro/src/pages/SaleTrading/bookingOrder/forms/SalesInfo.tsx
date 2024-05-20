import { Card, Col, Form, FormInstance, Row, Typography } from 'antd';
import { useState } from 'react';
import { TPaymentTerms, TSaleOrder, TSaleOrderDetail } from '../type';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetCustomerNameSalesManAgent, useGetShiptToAddress, useGetSubPartyAccount } from '../queryOptions';
import { map } from 'lodash';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { FormRowGutter } from '@tradePro/globalAtoms';

function SalesPersonalInfo({ form }: TDynamicForm) {
  const [paymentTerm, setPaymentTerm] = useState('');
  const { setFields, getFieldValue } = form;
  const [isOrderOpen, setIsOrderOpen] = useState(true);

  // const formValues = useWatch<TSaleOrder>([], form);

  // const status:TCommissionType[] = [
  //   {
  //     Id: 1,
  //     Flat: 'Flat',
  //   },
  //   {
  //     Id: 2,
  //     Flat: 'Percent',
  //   },
  // ];

  interface TCommissionType {
    Id: number;
    Flat: string;
  }

  const formValues = form.getFieldsValue() as TSaleOrder;

  const status: TCommissionType[] = [
    { Id: 1, Flat: 'Flat' },
    { Id: 2, Flat: 'Percent' },
  ];

  interface TCommissionType {
    Id: number;
    Flat: string;
  }

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

  //   const newData =
  //     formValues.SaleOrderDetailList?.map((item) => ({
  //       ...item,
  //       CommissionType: getFieldValue('CommissionType'),
  //     })) || [];

  //   // Assuming `updatedData` is declared somewhere in your component
  //   // const updatedData: UpdatedDataItem[] = /* Your logic to get or initialize updatedData */ [];

  //   const combinedData = [...newData, ...updatedData];

  //   console.log('New tableData:', combinedData);

  //   // Calculate commissionAmount based on commissionType
  //   const commissionType = getFieldValue('CommissionType');
  //   combinedData.forEach((item) => {
  //     if ('CommissionRate' in item) {
  //       if (commissionType === 'Percent') {
  //         item.CommissionAmount = (item.Amount * item.CommissionRate) / 100;
  //       } else if (commissionType === 'Flat') {
  //         item.CommissionAmount = item.CommissionRate;
  //       }
  //       // Add other conditions as needed
  //     }
  //   });

  //   return combinedData;
  // };

  return (
    <Row gutter={FormRowGutter} justify={'space-between'} style={{ width: '100%' }}>
      <>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={7} className="formfields">
          <AntSelectDynamic
            bordered={false}
            fieldValue="Id"
            label="Sales Man/Agent"
            // fieldLabel="ItemName"

            required
            // label="Customer Name"
            // name="CompanyId"
            fieldLabel="CompanyName"
            name="CompanyId"
            query={useGetCustomerNameSalesManAgent}

            // name={[field.name, 'CompanyId']}
            // onSelectChange={(obj) => handleItemChange(obj, field.name)}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={5} className="formfields">
          <AntSelectDynamic
            bordered={false}
            fieldValue="Id"
            label="Commission Type"
            fieldLabel="CommissionType"
            name="CommissionType"
            options={map(status, (item: any) => ({
              value: item.Id,
              label: item.Flat,
            }))}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={5} className="formfields">
          <AntInput label="Commission Rate" bordered={false} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={5} className="formfields">
          <AntInput label="Commission Amount:tt" bordered={false} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={13} className="formfields">
          <AntInput label="Commission Remarks" bordered={false} />
        </Col>
      </>

      <br></br>
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };
export default SalesPersonalInfo;
