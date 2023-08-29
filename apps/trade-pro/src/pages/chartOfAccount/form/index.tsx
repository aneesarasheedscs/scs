import { AntButton, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useGetParentAccount } from '../queryOptions';
import { map } from 'lodash';

const { useToken } = theme;
const { useForm, useWatch } = Form;

function ChartAccountForm() {
  const [form] = useForm<any>();
  const { t } = useTranslation();
  const { data } = useGetParentAccount();
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row gutter={10} align="middle"></Row>
            </Col>

            <Col>
              <Form.Item>
                <Row align="middle" gutter={10}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save_and_add_more')} htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" justify="space-between">
            <Card style={{ marginBottom: -5, width: '100%' }} className="antCard card-shadow">
              <Row style={{ width: '100%', height: 70 }} className="row">
                <Col xl={{ span: 10 }} xs={{ span: 10 }} className="column">
                  <Col xl={22} xs={24} sm={20}>
                    <AntSelectDynamic
                      required
                      label="Parent Account"
                      className="select"
                      placeholder="Parent Account"
                      fieldValue="Id"
                      fieldLabel="AccountTitle"
                      name="AccountCode"
                      style={{
                        width: '100%',
                        background: '#ffff',
                      }}
                      query={useGetParentAccount}
                      onSelectChange={() =>
                        form.setFieldValue('AccountClassName', data?.data?.Data?.Result?.AccountClassName)
                      }
                    />
                  </Col>
                </Col>
                <Col xl={{ span: 4 }} xs={{ span: 10 }} style={{ marginRight: 10 }}>
                  <AntInputNumber
                    label="Account Class"
                    name="AccountClassName"
                    className="input"
                    style={{ width: '100%', border: '1px dashed blue' }}
                    readOnly
                  />
                </Col>
                <Col xl={{ span: 9 }} xs={{ span: 23 }} className="column">
                  <Col xl={23} xs={24} sm={20}>
                    <AntSelectDynamic
                      required
                      fieldValue="Id"
                      label="Account Level"
                      className="select"
                      placeholder="Select item Type"
                      fieldLabel="Account_Level"
                      name="Account_Level"
                      style={{
                        width: '100%',
                        background: '#ffff',
                      }}
                      //   query={getItemType}
                    />
                  </Col>
                </Col>
              </Row>
            </Card>
          </Row>
          {/* <FormFile /> */}
        </Form>
      </Card>
    </>
  );
}

export default ChartAccountForm;
