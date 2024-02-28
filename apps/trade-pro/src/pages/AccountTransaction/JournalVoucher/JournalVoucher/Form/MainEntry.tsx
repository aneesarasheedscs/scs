import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, FormInstance, Row } from 'antd';
import { AntDatePicker, AntInput } from '@tradePro/components';

function MainEntry({ form, validate }: TDynamicForm) {
  const { t } = useTranslation();
  useEffect(() => {
    form.setFieldValue('VoucherDate', dayjs(new Date()));
  }, ['VoucherDate']);

  return (
    <Card className="main_entry">
      <Row gutter={10} style={{ marginLeft: 10 }} justify={'space-between'}>
        <Col xl={6} xxl={5} sm={16} xs={23} md={12} className={validate ? 'formfield_required' : 'formfield'}>
          <AntDatePicker required={validate} autoFocus name="VoucherDate" label={t('voucher_date')} bordered={false} />
        </Col>

        <Col xl={12} xxl={10} lg={23} sm={16} xs={23} md={20} className="formfield">
          <AntInput name="Remarks" label={t('remarks')} bordered={false} />
        </Col>

        <Col xl={5} xxl={8} sm={6} xs={12} md={3}></Col>
        <AntInput bordered={false} label={''} name="VoucherAmount" style={{ width: '120%', display: 'none' }} />
      </Row>
    </Card>
  );
}
type TDynamicForm = { form: FormInstance; validate: boolean };

export default MainEntry;
