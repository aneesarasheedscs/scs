import './style.scss';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, FormInstance, Row, Space, TimePicker, theme } from 'antd';
import { getItemCGSAccount, getItemPurchaseGLAccount, getItemSaleGLAccount, getItemUOM } from './queryOptions';
import { AntInput, AntSelectDynamic, AntInputNumber } from '@tradePro/components';
import './style.scss';

import { useState } from 'react';

const { useToken } = theme;

function DutyTiming({ form }: TDynamicForm) {
  const { setFields, getFieldValue } = form;

  const { token } = useToken();
  const [equivalent, setEquivalent] = useState<number>(0);
  const [rateEquivalent, setRateEquivalent] = useState<number>(0);
  const { data: filterCGS } = getItemCGSAccount();
  const { data: filterPurchase } = getItemPurchaseGLAccount();
  const { data: filterSale } = getItemSaleGLAccount();

  const { data } = getItemUOM();
  const handleSelectEquivalent = (fieldValue: any) => {
    if (data?.data?.Data?.Result) {
      const selectedOption = data?.data?.Data?.Result.find((option: any) => option.Id === fieldValue);
      if (selectedOption) {
        const equivalentValue = selectedOption.Equivalent;
        setEquivalent(equivalentValue);
        console.log(equivalentValue);
        form.setFieldsValue({ Equivalent: equivalentValue });
      } else {
        setEquivalent(0);
        form.setFieldsValue({ Equivalent: 0 });
      }
    }
  };
  const handleSelectRateEquivalent = (fieldValue: any) => {
    if (data?.data?.Data?.Result) {
      const selectedOption = data?.data?.Data?.Result.find((option: any) => option.Id === fieldValue);

      if (selectedOption) {
        const equivalentValue = selectedOption.Equivalent;
        setRateEquivalent(equivalentValue);
        console.log(equivalentValue);
        form.setFieldsValue({ RateEquivalent: equivalentValue });
      } else {
        setRateEquivalent(0);
        form.setFieldsValue({ RateEquivalent: 0 });
      }
    }
  };

  const onChange = () => {};
  const { t } = useTranslation();
  return (
    <>
      <>
        <Card className="card-container" style={{ marginTop: '-20%' }}>
          <h1>{t('duty_timing')}</h1>

          <Row style={{ marginTop: '10px' }}>
            <Col className="formfield">
              <label style={{ display: 'block', marginTop: '2px' }}>{t('start_time')}</label>
            </Col>
            <Col xl={{ span: 4 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
              <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
            </Col>

            <Col className="formfield">
              <label style={{ display: 'block', marginTop: '2px' }}>{t('start_break_time')}</label>
            </Col>
            <Col xl={{ span: 4 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
              <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
            </Col>

            <Col className="formfield">
              <label style={{ display: 'block', marginTop: '2px' }}>{t('end_break_time')}</label>
            </Col>
            <Col xl={{ span: 4 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
              <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
            </Col>
            <Col xl={{ span: 4 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
              <AntInput label={t('shit_hours')} bordered={false} placeholder="" />
            </Col>
            <Row style={{ marginTop: '15px' }}>
              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput disabled label={t('in_hours')} bordered={false} placeholder="" />
              </Col>

              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput label={t('out_hours')} bordered={false} placeholder="" />
              </Col>

              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput disabled label={t('total_hours')} bordered={false} placeholder="" />
              </Col>

              <Col xl={{ span: 7 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput disabled label={t('total_day_hours')} bordered={false} placeholder="" />
              </Col>
            </Row>
          </Row>
        </Card>
      </>
    </>
  );
}
type TDynamicForm = { form: FormInstance };
export default DutyTiming;
