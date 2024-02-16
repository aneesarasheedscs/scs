import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Form, theme } from 'antd';
import { AntButton, AntDatePicker, AntInput } from '@scs/ui';
import { AntSelectDynamic } from '@scs/ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { TAddFollowUp } from './type';
import { useAddFollowUp, useGetAccountTitlee } from './queries';
import { useGetAccountTitle } from '../queries';

function HeaderSection() {
  const [form] = Form.useForm<TAddFollowUp>();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const { mutate: addFollowUp, isSuccess: isDataByIdSuccess, isLoading: isDataLoading } = useAddFollowUp();
  const { t } = useTranslation();
  const onFinish = (values: TAddFollowUp) => {
    console.log(values);
    addFollowUp(values);
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();
  console.log(dayjs(new Date()));
  useEffect(() => {
    form.setFieldValue('FollowUpDate', dayjs());
    form.setFieldValue('PromiseDate', dayjs());
  }, []);
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row>
        <Col>
          <Card>
            <Form form={form} onFinish={onFinish}>
              <Col xxl={23}>
                <Row gutter={[10, 0]} justify={'space-between'}>
                  <Col xl={10} lg={12} xxl={8} className="formfield">
                    <AntSelectDynamic
                      bordered={false}
                      label={t('account_title')}
                      name="AccountTitleId"
                      fieldLabel="AccountTitle"
                      fieldValue="Id"
                      query={useGetAccountTitlee}
                    />
                  </Col>
                  <Col xl={7} lg={11} xxl={5} className="formfield">
                    <AntDatePicker name="FollowUpDate" bordered={false} label={t('Fllow Up Date')} />
                  </Col>
                  <Col xl={6} lg={12} xxl={5} className="formfield">
                    <AntInput bordered={false} label={t('next_follow_up_days')} />
                  </Col>
                  <Col xl={10} lg={5} xxl={5} className="formfield">
                    <AntDatePicker name="PromiseDate" bordered={false} label={t('promise-date')} />
                  </Col>
                  <Col xl={13} lg={12} className="formfield">
                    <AntInput bordered={false} label={t('Comment Detail')} size="large" />
                  </Col>
                  <Col xxl={10} style={{ marginTop: '15px' }}>
                    <Form.Item>
                      <Row align="middle" gutter={10}>
                        <Col>
                          <AntButton danger ghost htmlType="reset" label="Reset" icon={<SyncOutlined />} />
                        </Col>

                        <Col>
                          <AntButton ghost label="Save" htmlType="submit" icon={<SaveOutlined />} />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderSection;
