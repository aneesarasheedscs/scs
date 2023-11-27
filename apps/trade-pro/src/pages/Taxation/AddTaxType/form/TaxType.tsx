import { Card, Col, Row, FormInstance, Form } from 'antd';
import { useState } from 'react';
import { TAddTaxTypeHistory } from '../type';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetGLAccount, useGetAddTaxTypeGetById } from '../queryOptions';
import { useAtom } from 'jotai';
import { selectedChildRowsAtom } from './Atom';
import { t } from 'i18next';
import { useEffect } from 'react';
import { isNumber } from 'lodash';
import { useTranslation } from 'react-i18next';
import { selectedRowsAtom } from './Atom';
const { useWatch } = Form;
const { useForm } = Form;
function AddTaxTypeForm({ selectedRecordId }: any, { form }: TDynamicForm) {
  const [paymentTerm, setPaymentTerm] = useState('');
  const [typeChange, setTypeChange] = useState(null);
  const [Name, setName] = useState('');
  const [forms] = useForm<TAddTaxTypeHistory>();
  const formValues = useWatch<TAddTaxTypeHistory>([], form);
  // const [form] = useForm<TaddOpeningBalance>(); // Use a generic form with the expected type
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  const handleTypeChange = (value: any) => {
    setTypeChange(value);
  };

  const handlNameChange = (e: any) => {
    const myValue = e.target.value;
    setName(myValue);
  };

  // const isDueFieldsDisabled = paymentTerm === 'Cash' ? true : false;

  const hardcodedOptions = [
    { Id: 1, TaxType: 'WithHolding' },
    { Id: 2, TaxType: 'SalesTax' },
  ];

  const transformedOptions = hardcodedOptions.map((option) => ({
    label: option.TaxType,
    value: option.Id,
  }));
  // console.log('data', transformedOptions);

  return (
    <Card className="antCard card-shadow" style={{ overflowX: 'auto' }}>
      <Row gutter={10}>
        <Col xs={8}>
          <AntInput name="TaxName" label="Name" value={Name} onChange={handlNameChange} />
        </Col>
        <Col xs={7}>
          <AntSelectDynamic
            // required
            fieldValue="Id"
            label="Type"
            name="Type"
            fieldLabel="TaxName"
            value={typeChange}
            onChange={handleTypeChange}
            options={transformedOptions}
          />
        </Col>

        <Col xs={7}>
          <AntSelectDynamic
            // required
            fieldValue="Id"
            label="GL Account"
            name="TaxGLAccountId"
            query={useGetGLAccount}
            fieldLabel="AccountTitle"
          />
        </Col>
      </Row>
    </Card>
  );
}
type TDynamicForm = {
  form: FormInstance<TAddTaxTypeHistory>; // Make sure it matches your form instance type
  // initialData: FormInstance<TItemTaxShedule>;
  // selectedRecord: TItemTaxShedule | null;
};
export default AddTaxTypeForm;
