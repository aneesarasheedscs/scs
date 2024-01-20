import React, { useState } from 'react';
import { Col, Row, Card, Form, theme } from 'antd';
import { AntButton, AntDatePicker, AntInput } from '@scs/ui';
import { AntSelectDynamic } from '@scs/ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useGetAccountTitle } from '../queryOptions';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { TAddFollowUp } from '../types';
import { useAddFollowUp } from '../quries';

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

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Card style={{ width: '80vw', marginLeft: '3px', marginTop: '15px' }}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[10, 0]} justify={'space-between'}>
            <Col xl={9} className="formfield">
              <AntSelectDynamic
                bordered={false}
                label={t('account_title')}
                name="AccountTitleId"
                fieldLabel="AccountTitle"
                fieldValue="Id"
                query={useGetAccountTitle}
              />
            </Col>
            <Col xl={4} className="formfield">
              <AntDatePicker name="FollowUpDate" bordered={false} label={t('Fllow Up Date')} />
            </Col>
            <Col xl={5} className="formfield">
              <AntInput bordered={false} label={t('next_follow_up_days')} />
            </Col>
            <Col xl={4} className="formfield">
              <AntDatePicker name="PromiseDate" bordered={false} label={t('promise-date')} />
            </Col>
            <Col xl={9} className="formfield">
              <AntInput bordered={false} label={t('Comment Detail')} size="large" />
            </Col>
            <Col xxl={14} style={{ marginTop: '10px' }}>
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
        </Form>
      </Card>
    </div>
  );
}

export default HeaderSection;
