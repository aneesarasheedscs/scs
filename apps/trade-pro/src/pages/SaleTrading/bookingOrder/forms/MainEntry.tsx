import { Card, Col, FormInstance, Row, Typography } from 'antd';
import { useState } from 'react';
import { TPaymentTerms, TSaleOrder, TSaleOrderDetail } from '../type';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { useTranslation } from 'react-i18next';
import AddItemsCards from '../table/ItemCards/addItemCards';
import AddItemTable from '../table/ItemCards/addItemTable';


function MainEntry({ form }: TDynamicForm) {
  console.log(FormRowGutter, 'gutter');
  const [paymentTerm, setPaymentTerm] = useState('');
  const { setFields, getFieldValue } = form;
  const [isOrderOpen, setIsOrderOpen] = useState(true);
  const { t } = useTranslation();

  const formValues = useWatch<TSaleOrder>([], form);
  const [selectedItem, setSelectedItem]=useState<any[]>([])

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

  return (
    <Card style={{ boxShadow: '2px 4px 12px 1px gray' }}>
      <Col xxl={18}>
        <Row gutter={FormRowGutter} justify={'space-between'}></Row>
      </Col>

      <Row>
        <Col xxl={12} style={{ overflow: 'scroll', height: '53vh', border: '1px solid' }}>
          <AddItemsCards setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
        </Col>
        <Col xxl={12} style={{ border: '1px solid' }}>
          <AddItemTable selectedItem={selectedItem} />
        </Col>
      </Row>

      <Row gutter={[10,10]}>
        <Col xxl={12} style={{paddingTop:'15px'}}>
          <Col xxl={24} style={{border:'1px solid grey',padding:'4%'}}></Col>
        </Col>
        <Col xxl={12} style={{paddingTop:'15px',display:'flex',justifyContent:'space-between'}}>
        <Col xxl={11} style={{border:'1px solid grey',padding:'10px'}}></Col>
        <Col xxl={12} style={{border:'1px solid grey',padding:'10px'}}>
          <p style={{textAlign:'center',color:'crimson'}}>Net Total</p>
          <h3 style={{textAlign:'center',color:'green'}}>34343.343</h3>
        </Col>
        </Col>
      </Row>
   
    </Card>
  );
}
type TDynamicForm = { form: FormInstance };
export default MainEntry;
