import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, FormInstance, Row, Space, TimePicker, theme } from 'antd';
import { AntInput, AntSelectDynamic, AntInputNumber } from '@tradePro/components';

import { useState } from 'react';

const { useToken } = theme;

function InTimingOutTiming({ form }: TDynamicForm) {
  const { setFields, getFieldValue } = form;

  const { token } = useToken();
  const [equivalent, setEquivalent] = useState<number>(0);
  const [rateEquivalent, setRateEquivalent] = useState<number>(0);

  const onChange = () => {};
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card className="card-container" style={{ marginTop: '-9%' }}>
            <h1>{t('in_timing')}</h1>

            <Row style={{ marginTop: '10px' }}>
              <Col className="formfield">
                <label style={{ display: 'block', marginTop: '2px' }}>{t('late_start_time')}</label>
              </Col>
              <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
              </Col>
              <Col className="formfield">
                <label style={{ display: 'block', marginTop: '2px' }}>{t('late_end_time')}</label>
              </Col>
              <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
              </Col>

              <Row style={{ marginTop: '15px' }}>
                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('short_leave_start_time')}</label>
                </Col>
                <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>

                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('short_leave_end_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: -10 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>
              </Row>

              <Row style={{ marginTop: '15px' }}>
                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('half_day_start_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>

                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('half_day_end_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: -10 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>
              </Row>

              <Row style={{ marginTop: '15px' }}>
                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('absent_in_time')}</label>
                </Col>
                <Col xl={{ span: 12 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>
              </Row>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card className="card-container" style={{ marginTop: '-9%' }}>
            <h1>{t('out_timing')}</h1>

            <Row style={{ marginTop: '10px' }}>
              <Col className="formfield">
                <label style={{ display: 'block', marginTop: '2px' }}>{t('absent_before_out_time')}</label>
              </Col>
              <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
              </Col>

              <Row style={{ marginTop: '15px' }}>
                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('half_day_start_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>

                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('half_day_end_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: -10 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>
              </Row>

              <Row style={{ marginTop: '15px' }}>
                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('short_leave_start_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>

                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('short_leave_end_time')}</label>
                </Col>
                <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: -10 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>
              </Row>

              <Row style={{ marginTop: '15px' }}>
                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('departure_start_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: 15 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>

                <Col className="formfield">
                  <label style={{ display: 'block', marginTop: '2px' }}>{t('departure_end_time')}</label>
                </Col>
                <Col xl={{ span: 6 }} xs={{ span: 9 }} style={{ marginRight: -10 }} className="formfield">
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} bordered={false} placeholder="" />
                </Col>
              </Row>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
type TDynamicForm = { form: FormInstance };
export default InTimingOutTiming;
