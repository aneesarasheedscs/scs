import './style.scss';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import ItemBaseUOM from './definitionScreens/BaseUom';
import { Card, Checkbox, Col, Form, FormInstance, Row, theme } from 'antd';
import ItemBaseScheduleUOM from './definitionScreens/BaseScheduleUnit';
import {
  getItemCGSAccount,
  getItemClass,
  getItemPurchaseGLAccount,
  getItemSaleGLAccount,
  getItemUOM,
} from './queryOptions';
import { AntInput, AntSelectDynamic, AntInputNumber } from '@tradePro/components';
import DetailList from './DetailList';
import { useState } from 'react';

const { useToken } = theme;

function FormFile({ form }: TDynamicForm) {
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
                  name="ItemClassId"
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
                  name="ItemAliasName"
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
                    label={t('base_rate_unit')}
                    className="select"
                    placeholder="Select Pack Unit"
                    fieldLabel="UOMDescription"
                    name="BaseRateUnitId"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemUOM}
                    onChange={handleSelectRateEquivalent}
                  />
                  <Form.Item name="RateEquivalent" style={{ display: 'none' }}>
                    <input type="hidden" name="RateEquivalent" />
                  </Form.Item>
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
                    name="BaseUnitId"
                    style={{
                      width: '100%',
                      background: '#ffff',
                    }}
                    query={getItemUOM}
                    onChange={handleSelectEquivalent}
                  />
                  <Form.Item name="Equivalent" style={{ display: 'none' }}>
                    <input type="hidden" name="Equivalent" />
                  </Form.Item>
                </Col>
                <Form.Item style={{ marginTop: 25, marginRight: 15 }}>
                  <ItemBaseScheduleUOM />
                </Form.Item>
              </Col>

              <Col xl={{ span: 4 }} xs={{ span: 11 }} style={{ marginRight: 10 }}>
                <AntInputNumber
                  required
                  label={t('wholesale_rate')}
                  name="WholeSalePrice"
                  className="input"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xl={{ span: 5 }} xs={{ span: 10 }}>
                <AntInputNumber
                  required
                  name="BarcodeNo"
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
                  name="PurchaseGLAC"
                  style={{
                    width: '100%',
                    background: '#ffff',
                  }}
                  options={map(filterPurchase, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                  query={getItemPurchaseGLAccount}
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
                  name="SaleGLAC"
                  style={{
                    width: '100%',
                    background: '#ffff',
                  }}
                  options={map(filterSale, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                  query={getItemSaleGLAccount}
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
                  name="COGSGLAC"
                  style={{
                    width: '100%',
                    background: '#ffff',
                  }}
                  options={map(filterCGS, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                  query={getItemCGSAccount}
                />
              </Col>
            </Row>
            <Col span={23} style={{ marginRight: 0 }}>
              <DetailList form={form} />
            </Col>
          </Row>
        </Card>
      </>
    </>
  );
}
type TDynamicForm = { form: FormInstance };
export default FormFile;
