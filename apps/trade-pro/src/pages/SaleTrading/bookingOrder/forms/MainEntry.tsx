import { Card, Col, FormInstance, Row, Typography } from 'antd';
import { useState } from 'react';
import { TPaymentTerms, TSaleOrder, TSaleOrderDetail } from '../type';
import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { useGetCustomerNameSalesManAgent, useGetShiptToAddress, useGetSubPartyAccount } from '../queryOptions';
import { map } from 'lodash';
import { useGetPaymentTerms } from '@tradePro/pages/purchaseTrading/purchaseOrder/queryOptions';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
// import SalesPersonalInfo from './SalesInfo';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { saleOrderFormcolumns } from '../table/columns';
import { useTranslation } from 'react-i18next';
import AddItemsCards from '../table/ItemCards/addItemCards';

function MainEntry({ form }: TDynamicForm) {
  console.log(FormRowGutter, 'gutter');
  const [paymentTerm, setPaymentTerm] = useState('');
  const { setFields, getFieldValue } = form;
  const [isOrderOpen, setIsOrderOpen] = useState(true);
  const {t} =useTranslation()

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
    <Card style={{ boxShadow: '2px 4px 12px 1px gray',  }}>
      <Col xxl={18}>
        <Row gutter={FormRowGutter} justify={'space-between'}>
          {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={7} className="formfields">
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

          <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={16} className="formfields">
            <AntInput name="RemarksHeader" label="Remarks" bordered={false} />
          </Col> */}
        </Row>

    

      </Col>
      



      


<Row>
  <Col xxl={12} style={{overflow:'scroll',height:'60vh'}}>
    <AddItemsCards form={form}/></Col>
  <Col xxl={12} >
  {/* <Row gutter={[10, 10]}>
         <Col>
         <AntTable
            // refetch={addRefetch}
            // isError={addisError}
            columns={saleOrderFormcolumns(t)}
            numberOfSkeletons={12}
            // isLoading={addisLoading}
            // data={tableData || []}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
          />
        </Col>
      </Row> */}
  </Col>
</Row>
       {/* <Row gutter={[10, 10]}>
         <Col>
         <AntTable
            // refetch={addRefetch}
            // isError={addisError}
            columns={saleOrderFormcolumns(t)}
            numberOfSkeletons={12}
            // isLoading={addisLoading}
            // data={tableData || []}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
          />
        </Col>
      </Row> */}
      {/* </Col> */}
    </Card>
  );
}
type TDynamicForm = { form: FormInstance };
export default MainEntry;
