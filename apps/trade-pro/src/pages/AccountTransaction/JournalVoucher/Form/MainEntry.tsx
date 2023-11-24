import { Checkbox, Col, Form, FormInstance, Row } from 'antd';
import { useEffect, useState } from 'react';
import { AntDatePicker, AntInput } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { totalValue } from './Atom';

function MainEntry({ form }: TDynamicForm) {
  const { t } = useTranslation();
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);

  useEffect(() => {
    form.setFieldValue('VoucherDate', dayjs(new Date()));
  }, ['VoucherDate']);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmounts);
  }, [totalDebitAmounts]);
  return (
    <Row gutter={10} style={{ marginLeft: 10 }} justify={'space-between'}>
      <Col xl={6} sm={16} xs={23} md={12} className="formfield">
        <AntDatePicker autoFocus required name="VoucherDate" label={t('document_date')} bordered={false} />
      </Col>

      <Col xl={12} lg={23} sm={16} xs={23} md={20} className="formfield">
        <AntInput name="Remarks" label={t('remarks')} bordered={false} />
      </Col>

      <Col xl={5} sm={6} xs={12} md={3}>
        <Row style={{ marginLeft: 10, marginTop: 10 }}>
          <Form.Item name="Preview" valuePropName="checked" initialValue={true}>
            <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'Preview')} checked={true}>
              {' '}
              Preview{' '}
            </Checkbox>
          </Form.Item>
        </Row>
      </Col>
      <AntInput bordered={false} label={''} name="VoucherAmount" style={{ width: '120%', display: 'none' }} />
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainEntry;
