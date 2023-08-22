import React, { useEffect } from 'react';
import FormFile from './ItemForm';
import { Card, Col, Form, Input, Row, theme } from 'antd';
import { AntButton, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { getItemCategory, getItemClass, getItemCode, getItemType } from './queries';
import { SyncOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { TPurchaseOrderEntry } from '@tradePro/pages/purchaseTrading/purchaseOrder/type';
import { map } from 'lodash';
import ItemCategory from './definitionScreens/ItemCategory';
import ItemType from './definitionScreens/ItemType';

const { useToken } = theme;
const { useForm, useWatch } = Form;

function ItemFormtoSave() {
  const [form] = useForm<any[]>();
  const formValues = useWatch<any[]>([], form);
  const { data, isError, isLoading, isSuccess } = getItemCode();
  const { token } = useToken();

  const onFinish = (values: any) => {
    console.log(values);
  };
  // useEffect(() => {
  //   form.setFieldValue(
  //     'ItemCode',
  //     map(data?.data?.Data?.Result, (item) => item.ItemCode)
  //   );
  // });
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
                    <AntButton danger ghost htmlType="reset" label="Reset" icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label="Save and add more" htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label="Save" htmlType="submit" icon={<SaveOutlined />} />
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
                      fieldValue="Id"
                      label={'Item Category'}
                      className="select"
                      placeholder="Select item Category"
                      fieldLabel="CategoryDescription"
                      name="ItemCategory"
                      style={{
                        width: '100%',
                        background: '#ffff',
                      }}
                      query={getItemCategory}
                      onSelectChange={() =>
                        form.setFieldValue(
                          'ItemCode',
                          map(data?.data?.Data?.Result, (item) => item.ItemCode)
                        )
                      }
                    />
                  </Col>
                  <Form.Item style={{ marginTop: 25, marginRight: 0 }}>
                    <ItemCategory />
                  </Form.Item>
                </Col>
                <Col xl={{ span: 4 }} xs={{ span: 10 }} style={{ marginRight: 10 }}>
                  <AntInputNumber
                    label={'Code'}
                    name="ItemCode"
                    className="input"
                    style={{ width: '100%', border: '1px dashed blue' }}
                    readOnly
                  />
                </Col>
                <Col xl={{ span: 9 }} xs={{ span: 10 }} className="column">
                  <Col xl={23} xs={24} sm={20}>
                    <AntSelectDynamic
                      required
                      fieldValue="Id"
                      label={'Item Type'}
                      className="select"
                      placeholder="Select item Type"
                      fieldLabel="TypeDescription"
                      name="ItemType"
                      style={{
                        width: '100%',
                        background: '#ffff',
                      }}
                      query={getItemType}
                    />
                  </Col>
                  <Form.Item style={{ marginTop: 25, marginRight: 10 }}>
                    <ItemType></ItemType>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Row>
          <FormFile />
        </Form>
      </Card>
    </>
  );
}

export default ItemFormtoSave;
