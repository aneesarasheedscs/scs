import { size } from 'lodash';
import { useState } from 'react';
import { Card, Col, Form, FormInstance, Row } from 'antd';
// import { TDetailItem, TPurchaseOrderDetailEntry } from '../type';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
const { useWatch } = Form;
function DynamicForm({ form }: TDynamicForm) {
  const formValues = useWatch<any[]>('purchaseOrderDetailList', form);
  const initialValues = {};
  return (
    <div className="contravoucher-main">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ height: 'auto' }} className="antCard card-shadow contraVoucher">
            <Form.List name="purchaseOrderDetailList" initialValue={[initialValues]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Row gutter={[16, 16]}>
                        <Col
                          xs={22}
                          sm={22}
                          md={20}
                          lg={{ span: 11, offset: 0 }}
                          xl={{ span: 11, offset: 0 }}
                          className="formfield"
                        >
                          <AntSelectDynamic
                            label="Credit Account"
                            bordered={false}
                            className="select"
                            fieldValue=""
                            fieldLabel=""
                            name={''}
                          />
                        </Col>
                        <Col
                          xs={22}
                          sm={22}
                          md={20}
                          lg={{ span: 11, offset: 1 }}
                          xl={{ span: 11, offset: 1 }}
                          className="formfield"
                        >
                          <AntSelectDynamic
                            label="Debit Account"
                            bordered={false}
                            className="select"
                            fieldValue=""
                            fieldLabel=""
                            name={''}
                          />
                        </Col>
                        <Col
                          xs={22}
                          sm={22}
                          md={20}
                          lg={{ span: 11, offset: 0 }}
                          xl={{ span: 11, offset: 0 }}
                          className="formfield"
                        >
                          <AntInput label="Credit Comment" bordered={false} />
                        </Col>
                        <Col
                          xs={22}
                          sm={22}
                          md={20}
                          lg={{ span: 11, offset: 1 }}
                          xl={{ span: 11, offset: 1 }}
                          className="formfield"
                        >
                          <AntInput label="Debit Comment" bordered={false} />
                        </Col>
                        <Col
                          style={{ marginTop: '0.3%' }}
                          xs={{ span: 6, offset: 9 }}
                          sm={{ span: 5, offset: 10 }}
                          md={{ span: 4, offset: 10 }}
                          lg={{ span: 4, offset: 10 }}
                          xl={{ span: 4, offset: 10 }}
                        >
                          <Row>
                            <Col>
                              <AntButton
                                type="text"
                                onClick={() => add()}
                                icon={<PlusOutlined className="dynamic-add-button" />}
                              />
                            </Col>
                            <Col>
                              <AntButton
                                type="text"
                                icon={<MinusCircleOutlined className="dynamic-delete-button" />}
                                onClick={() => {
                                  if (size(fields) > 1) remove(field.name);
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
type TDynamicForm = { form: FormInstance };
export default DynamicForm;
