import { Card, Col, Form, FormInstance, Row, Typography } from 'antd';
import { useState } from 'react';
import { TPaymentTerms, TSaleOrder, TSaleOrderDetail } from '../type';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetCustomerNameSalesManAgent, useGetShiptToAddress, useGetSubPartyAccount } from '../queryOptions';
import { map } from 'lodash';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';

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
  // const handleAddToTable = () => {
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
    // <Card style={{  boxShadow: '2px 4px 12px 1px gray',marginTop:'20px' }}>

    <Row gutter={[16, 16]} justify={'space-between'}>
      {' '}
      {/* <Row> */}
      {/* <h6
        style={{
          fontFamily: 'times-roman',
          fontSize: '20px',
          // marginBottom: '15px',
          marginTop: '0px',
          padding: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        Sales Personal Information
        {/* <Button onClick={toggler}>
            {' '}
            <DownOutlined />
          </Button> */}
      {/* </h6> */}
      {/* {toggle ? ( */}
      {/* <Card className="antCard card-shadow" style={{ overflowX: 'auto', width: '100%' }}>
          <Form.List name="SaleOrderDetailList" initialValue={[]}>
            {(fields, { add, remove }) => ( */}
      <>
        {/* {fields.map((field) => (
                  <div key={field.key} className="form-list-container"> */}
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

        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4} className="formfields">
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
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} className="formfields">
          <AntInput label="Commission Amount" bordered={false} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={12} className="formfields">
          <AntInput label="Commission Remarks" bordered={false} />
        </Col>
        {/* </div>
                ))} */}
      </>
      {/* )}
          </Form.List>
        </Card> */}
      {/* ) : (
          ''
        )} */}
      {/* </Row> */}
      <br></br>
    </Row>
    // </Card >
  );
}
type TDynamicForm = { form: FormInstance };
export default SalesPersonalInfo;
