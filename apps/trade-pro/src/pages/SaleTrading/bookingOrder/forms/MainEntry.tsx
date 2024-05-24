import { Card, Col, FormInstance, Row, Typography } from 'antd';
import { useState } from 'react';
import { TPaymentTerms, TPreBookingOrderDetailList, TSaleOrder, TSaleOrderDetail } from '../type';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { useTranslation } from 'react-i18next';
import AddItemsCards from '../table/ItemCards/addItemCards';
import AddItemTable from '../table/ItemCards/addItemTable';

function MainEntry({ form, selectedItem, setSelectedItem }: TDynamicForm) {
  console.log(FormRowGutter, 'gutter');
  const [paymentTerm, setPaymentTerm] = useState('');
  const { setFields, getFieldValue } = form;
  const [isOrderOpen, setIsOrderOpen] = useState(true);
  const { t } = useTranslation();

  const formValues = useWatch<TSaleOrder>([], form);
  // const [selectedItem, setSelectedItem]=useState<any[]>([])

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

  return (
    <Card style={{ boxShadow: '2px 4px 12px 1px gray' }}>
      <Col xxl={18}>
        <Row gutter={FormRowGutter} justify={'space-between'}></Row>
      </Col>

      <Row>
        <Col
          xxl={12}
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            height: '60vh',
            border: '1px solid',
            position: 'relative',
          }}
        >
          <AddItemsCards setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
        </Col>

        <Col
          xxl={12}
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            height: '60vh',
            border: '1px solid',
            position: 'relative',
          }}
        >
          <AddItemTable selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </Col>
      </Row>

    </Card>
  );
}
type TDynamicForm = {
  form: FormInstance;
  selectedItem: TPreBookingOrderDetailList[];
  setSelectedItem: (ary: TPreBookingOrderDetailList[]) => void;
};
export default MainEntry;
