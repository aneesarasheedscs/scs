import './style.scss';
import image from './OIP.jpg';
import { map, values } from 'lodash';
import { TItemHistoryTable } from '../type';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import ItemCategory from './definitionScreens/ItemCategory';
import {
  getCompaniesNames,
  getItemCategory,
  getItemClass,
  getItemCode,
  getItemLedger,
  getItemType,
  getItemUOM,
} from './queries';
import {
  AntButton,
  AntInput,
  AntSelectDynamic,
  AntInputNumber,
  AntCheckbox,
  AntSelectDynamicMultiple,
} from '@tradePro/components';
import { Button, Card, Checkbox, Col, Form, Input, Row, Space, Tooltip, theme } from 'antd';
import { CloseOutlined, PlusOutlined, FileAddOutlined, DeleteFilled } from '@ant-design/icons';
import ItemType from './definitionScreens/ItemType';

const { useToken } = theme;
const { useForm, useWatch } = Form;
//convert image
const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); //built in function
    reader.onload = () => resolve(reader.result);
    reader.onabort = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
//handle image
const handleImage = (e: any) => {
  const file = e.target.files[0];
  getBase64(file).then((base64) => {
    localStorage['img'] = base64;
    console.debug('File Store', base64);
  });
};

function FormFile() {
  const [form] = useForm<any[]>();
  const formValues = useWatch<any[]>([], form);
  const { data, isError, isLoading, isSuccess } = getItemCode();
  const { token } = useToken();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <>
      <>
        <Card style={{ display: 'flex', marginBottom: 10, marginTop: 0 }} className="antCard card-shadow">
          <Row style={{ width: '100%' }}>
            <Row style={{ width: '100%', height: 70 }} className="row">
              <Col xl={{ span: 6 }} xs={{ span: 20 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="ClassId"
                    label={'Item Class'}
                    className="select"
                    placeholder="Select item Class"
                    fieldLabel="ClassDescription"
                    name="ItemClass"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemClass}
                  />
                </Col>
                <Form.Item style={{ marginTop: 25, marginRight: 10 }}>
                  <AntButton label={''} icon={<PlusOutlined />} />
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} sm={{ span: 10 }} style={{ marginRight: 10 }}>
                <AntInput
                  required
                  label={'Item Name'}
                  name="ItemName"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>{' '}
              <Col xl={{ span: 5 }} sm={{ span: 10 }} style={{ marginRight: 10 }}>
                <AntInput
                  label={'Item Other Name'}
                  name="ItemOtherName"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xl={{ span: 8 }} sm={{ span: 10 }}>
                <AntInput
                  required
                  label={'Item Specification'}
                  name="ItemSpecification"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <Row style={{ width: '100%', height: 70, marginTop: 0 }} className="row">
              <Col xl={{ span: 7 }} xs={{ span: 10 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={'Base Pack Unit'}
                    className="select"
                    placeholder="Select Pack Unit"
                    fieldLabel="UOMDescription"
                    name="BaseUnit"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemUOM}
                  />
                </Col>
                <Form.Item style={{ marginTop: 25, marginRight: 15 }}>
                  <AntButton label={''} icon={<PlusOutlined />} />
                </Form.Item>
              </Col>
              <Col xl={{ span: 7 }} xs={{ span: 10 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={'Base Pack UOM'}
                    className="select"
                    placeholder="Select Pack Uom"
                    fieldLabel="UOMDescription"
                    name="RateUom"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemUOM}
                  />
                </Col>
                <Form.Item style={{ marginTop: 25, marginRight: 15 }}>
                  <AntButton label={''} icon={<PlusOutlined />} />
                </Form.Item>
              </Col>

              <Col xl={{ span: 4 }} xs={{ span: 10 }} style={{ marginRight: 10 }}>
                <AntInputNumber
                  required
                  label={'Whole Sale Rate'}
                  name="WholeSaleRate"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xl={{ span: 5 }} xs={{ span: 10 }}>
                <AntInputNumber
                  required
                  name="Barcode"
                  label={'Barcode No'}
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <Row style={{ width: '100%', height: 60, marginTop: 10 }} className="row">
              <Col xl={{ span: 8 }} xs={{ span: 10 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={'Purchase GL A/C'}
                    className="select"
                    placeholder="Select Purchase Account"
                    fieldLabel="InventoryAccountTitle"
                    name="InventoryAccountTitle"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemCategory}
                  />
                </Col>
                <Form.Item style={{ marginTop: 25, marginRight: 10 }}>
                  <AntButton label={''} icon={<PlusOutlined />} />
                </Form.Item>
              </Col>
              <Col xl={{ span: 8 }} xs={{ span: 10 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={'Sale GL A/C'}
                    className="select"
                    placeholder="Select Sale Account"
                    fieldLabel="RevenueAccountTitle"
                    name="RevenueAccountTitle"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemCategory}
                  />
                </Col>
                <Form.Item style={{ marginTop: 25, marginRight: 10 }}>
                  <AntButton label={''} icon={<PlusOutlined />} />
                </Form.Item>
              </Col>
              <Col xl={{ span: 8 }} xs={{ span: 10 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={'CGS GL A/C'}
                    className="select"
                    placeholder="Select CGS Account "
                    fieldLabel="CGSAccountTitle"
                    name="CGSAccountTitle"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemCategory}
                  />
                </Col>
                <Form.Item style={{ marginTop: 25, marginRight: 10 }}>
                  <AntButton label={''} icon={<PlusOutlined />} />
                </Form.Item>
              </Col>
            </Row>
            <Col span={22}>
              <Col style={{ display: 'flex', marginTop: 10, justifyContent: 'space-around' }} span={2}>
                <Row>
                  {' '}
                  <p style={{ marginTop: 3 }}>Is Active</p>
                  <AntCheckbox label={''} name="Active" />
                </Row>
              </Col>
              <AntSelectDynamicMultiple
                required
                fieldValue="Id"
                label={'Select Companies'}
                className="select"
                placeholder="Select Companies"
                fieldLabel="CompName"
                name="Companies"
                style={{
                  width: '100%',
                  background: '#ffff',
                }}
                query={getCompaniesNames}
              />
              <Row>
                <Col span={5}>
                  <p>Product Image</p>
                  <img
                    src={localStorage.getItem('img') ? localStorage.getItem('img') : image}
                    alt=""
                    style={{ border: '1px solid gray', borderRadius: 10 }}
                    height={150}
                    width={200}
                  />
                  <AntInput
                    label={''}
                    type="file"
                    name="file"
                    onChange={handleImage}
                    style={{ width: 200 }}
                  />
                </Col>{' '}
                <Col span={4}>
                  <p>Barcode Image</p>
                  <AntInput
                    label={''}
                    type="image"
                    accept="image/*"
                    name="file"
                    style={{ display: '', width: 250, height: 50 }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </>
    </>
  );
}

export default FormFile;
