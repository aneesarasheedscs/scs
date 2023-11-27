import { Card, Checkbox, Col, Form, FormInstance, Row } from 'antd';
import { useState } from 'react';
import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { useGetTaxSheduleType } from '../queryOptions';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { useWatch } from 'antd/es/form/Form';
import { TAddTaxSheduleHistory } from '../type';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../../AddTaxType/form/Atom';
const AddTaxShedule = ({ form }: TDynamicForm) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const formValues = useWatch<TAddTaxSheduleHistory>([], form);
  const { setFieldValue, getFieldValue } = form;

  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);
  const Id = selectedRow?.[0]?.Id;

  const onChangeUnPost = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('PostState', true);
    } else {
      setFieldValue('PostState', false);
    }
    setIsActive(getFieldValue('PostState'));
  };
  return (
    <Card className="antCard card-shadow" style={{ overflowX: 'auto', margin: '10px 0px' }}>
      <Row gutter={10}>
        <Col xs={24} sm={24} md={7}>
          <AntDatePicker name="EffectedDate" label="Effected Date" />
        </Col>
        <Col xs={7}>
          <AntSelectDynamic
            required
            label="Tax Type"
            name="TaxNameId"
            fieldValue="Id"
            fieldLabel="TaxName"
            query={useGetTaxSheduleType}
          />
        </Col>
        <Col xs={4}>
          <AntInput label="Tax Percent" name="TaxPercent" />
        </Col>
        <Col xs={4}>
          <br />
          <Form.Item name="PostState">
            <Checkbox checked={isActive} onChange={onChangeUnPost}>
              Is Active
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};
type TDynamicForm = { form: FormInstance };
export default AddTaxShedule;
