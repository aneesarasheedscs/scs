import './style.scss';
import image from './OIP.jpg';
import { map, values } from 'lodash';
import { TItemHistoryTable } from '../type';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ItemBaseUOM from './definitionScreens/BaseUom';
import { Card, Checkbox, Col, Form, Row, theme } from 'antd';
import ItemBaseScheduleUOM from './definitionScreens/BaseScheduleUnit';
import {
  getCompaniesNames,
  getItemCategory,
  getItemClass,
  getItemCode,
  getItemLedger,
  getItemType,
  getItemUOM,
} from './queryOptions';
import {
  AntButton,
  AntInput,
  AntSelectDynamic,
  AntInputNumber,
  AntCheckbox,
  AntSelectDynamicMultiple,
} from '@tradePro/components';

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
  const [activeCheckbox, setActiveCheckbox] = useState(false);

  const { t } = useTranslation();
  return (
    <>
      <>
        <Card style={{ display: 'flex', marginBottom: 10, marginTop: 0 }} className="antCard card-shadow">
          <Row style={{ width: '100%' }}>
            <Row style={{ width: '100%', height: 70 }} className="row">
              <Col xl={{ span: 5 }} xs={{ span: 9 }} style={{ marginRight: 15 }}>
                <AntSelectDynamic
                  required
                  fieldValue="ClassId"
                  label={t('item_class')}
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
              <Col xl={{ span: 4 }} sm={{ span: 12 }} style={{ marginRight: 15 }}>
                <AntInput required label={t('item_name')} name="ItemName" className="input" style={{ width: '100%' }} />
              </Col>{' '}
              <Col xl={{ span: 5 }} sm={{ span: 10 }} style={{ marginRight: 35 }}>
                <AntInput
                  label={t('item_other_name')}
                  name="ItemOtherName"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xl={{ span: 8 }} sm={{ span: 10 }}>
                <AntInput
                  required
                  label={t('item_specification')}
                  name="ItemSpecification"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <Row style={{ width: '100%', height: 70, marginTop: 0 }} className="row">
              <Col xl={{ span: 7 }} xs={{ span: 12 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={t('base_pack_unit')}
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
                  <ItemBaseUOM />
                </Form.Item>
              </Col>
              <Col xl={{ span: 7 }} xs={{ span: 10 }} className="column">
                <Col xl={21} xs={24} sm={20}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={t('base_pack_uom')}
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
                  <ItemBaseScheduleUOM />
                </Form.Item>
              </Col>

              <Col xl={{ span: 4 }} xs={{ span: 11 }} style={{ marginRight: 10 }}>
                <AntInputNumber
                  required
                  label={t('wholesale_rate')}
                  name="WholeSaleRate"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xl={{ span: 5 }} xs={{ span: 10 }}>
                <AntInputNumber
                  required
                  name="Barcode"
                  label={t('barcode_no')}
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <Row style={{ width: '100%', height: 60, marginTop: 10 }} className="row">
              <Col xl={{ span: 8 }} xs={{ span: 11 }} style={{ marginRight: 10 }}>
                <AntSelectDynamic
                  required
                  fieldValue="Id"
                  label={t('purchase_account_GL')}
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
              <Col xl={{ span: 7 }} xs={{ span: 10 }} style={{ marginRight: 10 }}>
                <AntSelectDynamic
                  required
                  fieldValue="Id"
                  label={t('sale_account_GL')}
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
              <Col xl={{ span: 8 }} xs={{ span: 10 }}>
                <AntSelectDynamic
                  required
                  fieldValue="Id"
                  label={t('cgs_account_GL')}
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
            </Row>
            <Col span={23} style={{ marginRight: 0 }}>
              <Col style={{ display: 'flex', marginTop: 5, marginBottom: 5 }} xl={2}>
                <Row>
                  {' '}
                  <p style={{ marginTop: 3 }}>{t('is_active')}</p>
                  <Checkbox name="Active" />
                </Row>
              </Col>
              <AntSelectDynamicMultiple
                required
                fieldValue="Id"
                label={t('select_companies')}
                className="select"
                placeholder="Select Companies"
                fieldLabel="CompName"
                name="Companies"
                style={{
                  width: '101%',
                  background: '#ffff',
                }}
                query={getCompaniesNames}
              />
              <Row>
                <Col xl={6} md={7} lg={10} sm={12}>
                  <p>{t('product_image')}</p>
                  <img
                    // src={localStorage.getItem('img') ? localStorage.getItem('img') : image}
                    alt=""
                    style={{ border: '1px solid gray', borderRadius: 10 }}
                    height={150}
                    width={200}
                  />
                  <AntInput label={''} type="file" name="Product-Image" onChange={handleImage} style={{ width: 200 }} />
                </Col>{' '}
                <Col xl={4}>
                  <p>{t('barcode_image')}</p>
                  <AntInput
                    label={''}
                    type="image"
                    accept="image/*"
                    name="Barcode_Image"
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
