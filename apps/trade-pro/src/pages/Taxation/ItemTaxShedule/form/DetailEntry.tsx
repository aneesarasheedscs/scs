import { isNumber, size } from 'lodash';
import { useEffect, useState } from 'react';
import { Card, Col, Form, FormInstance, Row, Checkbox } from 'antd';
import { TItemTaxShedule } from '../type';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { useGetItemTaxSheduleGetById, useGetItemTaxSheduleItamName, useGetItemTaxSheduleType } from '../queryOptions';
import { AntDatePicker, AntSelectDynamic } from '@tradePro/components';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../table/Atom';
import { useItemTaxSheduleSave } from '../queries';
import dayjs from 'dayjs';
const { useWatch, useForm } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  // const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  // console.log('selectedRecord :-', selectedRecord);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [forms] = useForm<TItemTaxShedule>();
  const formValues = useWatch<TItemTaxShedule>([], form);
  const { setFieldValue, getFieldValue } = form;
  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);
  const Id = selectedRow?.[0]?.Id;
  // const Id = form.getFieldValue('ItemId');
  // const { data, isError, isLoading, isSuccess } = useGetItemTaxSheduleGetById(true, Id);

  const onChangeUnPost = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('IsActive', true);
    } else {
      setFieldValue('IsActive', false);
    }
    setIsActive(getFieldValue('IsActive'));
  };
  const handleItemChange = (obj: TItemTaxShedule, index: string | null) => {};
  // const handleOnchageValue = (e: any) => {
  //   // const val = e.target.value;
  //   if (Id > 0) {
  //     form.setFields([{ name: 'ItemId', value: selectedRow?.[0]?.ItemId }]);
  //     form.setFields([{ name: 'TaxTypeId', value: selectedRow?.[0]?.TaxTypeId }]);
  //     form.setFields([{ name: 'EffectedDate', value: dayjs(selectedRow?.[0]?.EffectedDate) }]);
  //   }
  // };
  return (
    <Card className="antCard card-shadow" style={{ overflowX: 'auto' }}>
      <Row gutter={10}>
        <Col xs={6}>
          <AntSelectDynamic
            required
            label="Name"
            name="ItemId"
            // value={selectedRecord?.ItemId}
            fieldValue="Id"
            fieldLabel="ItemName"
            query={useGetItemTaxSheduleItamName}
            // onChange={handleOnchageValue}
            onSelectChange={(obj) => handleItemChange(obj, 'ItemId')}
          />
        </Col>
        <Col xs={6}>
          <AntSelectDynamic
            required
            label="Tax Type."
            name="TaxTypeId"
            // value={selectedRecord?.TaxTypeId}
            fieldValue="Id"
            fieldLabel="TaxName"
            query={useGetItemTaxSheduleType}
            onSelectChange={(obj) => handleItemChange(obj, 'TaxTypeId')}
          />
        </Col>
        <Col xs={24} sm={24} md={6}>
          <AntDatePicker
            name="EffectedDate"
            label="Effected Date"
            // value={selectedRecord ? dayjs(selectedRecord.EffectedDate) : null}
            // onSelectChange={(obj) => handleItemChange(obj, 'EffectedDate')}
          />
        </Col>
        <Col xs={4}>
          <br />
          <Form.Item name="IsActive">
            <Checkbox checked={isActive} onChange={onChangeUnPost} value="IsActive">
              Is Active
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

type TDynamicForm = {
  form: FormInstance; // Make sure it matches your form instance type
  // initialData: FormInstance<TItemTaxShedule>;
  // selectedRecord: TItemTaxShedule | null;
};

export default DynamicForm;
