import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, FormInstance, Row, Space, TimePicker, theme } from 'antd';
import { AntInput, AntSelectDynamic, AntInputNumber } from '@tradePro/components';

import { useState } from 'react';

const { useToken } = theme;

function OutTiming({ form }: TDynamicForm) {
  const { setFields, getFieldValue } = form;

  const { token } = useToken();
  const [equivalent, setEquivalent] = useState<number>(0);
  const [rateEquivalent, setRateEquivalent] = useState<number>(0);

  const onChange = () => {};
  const { t } = useTranslation();
  return (
    <>
      <>
        <Card className="card-container">
          <h1>In Timing</h1>
          {/* <Row> */}
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
            <Row style={{ marginTop: '15px' }}>
              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput label={t('shit_hours')} bordered={false} placeholder="" />
              </Col>

              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput disabled label={t('in_hours')} bordered={false} placeholder="" />
              </Col>

              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput label={t('out_hours')} bordered={false} placeholder="" />
              </Col>

              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <AntInput disabled label={t('total_hours')} bordered={false} placeholder="" />
              </Col>
              <Row style={{ marginTop: '15px' }}>
                <Col xl={{ span: 24 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                  <AntInput disabled label={t('total_day_hours')} bordered={false} placeholder="" />
                </Col>
              </Row>
            </Row>
            <Col xl={{ span: 8 }} sm={{ span: 10 }}>
              {/* <AntInput
                  required
                  label={t('item_specification')}
                  name="ItemSpecification"
                  className="input"
                  style={{ width: '100%' }}
                /> */}
            </Col>
          </Row>

          {/* <Col span={23} style={{ marginRight: 0 }}>
              <DetailList form={form} />
            </Col> */}
          {/* </Row> */}
        </Card>
      </>
    </>
  );
}
type TDynamicForm = { form: FormInstance };
export default OutTiming;
