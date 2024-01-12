import { Card, Checkbox, Col, Form, FormInstance, Row } from 'antd';
import { useState } from 'react';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import { useGetDeliveryTerms, useGetSuppliersforGRN, useGetTransporters, useGetVehicleType } from '../queryOptions';

function MainForm({ form }: TDynamicForm) {
  const { t } = useTranslation();

  return (
    <>
      <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingTop: '-15%', marginBottom: '0.5%' }}>
        <Row gutter={6} justify={'space-around'}>
          <Col xl={12} xs={24}>
            <Row gutter={[10, 10]} justify={'space-between'}>
              {/* <Col xl={11} sm={12} className="formfield">
                <AntDatePicker required bordered={false} name="DocDate" label={t('document_date')} />
              </Col> */}
              <Col xl={12} sm={12} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  fieldValue="Id"
                  label={t('supplier_name')}
                  name="SupplierCustomerId"
                  fieldLabel="CompanyName"
                  style={{ width: '100%' }}
                  query={useGetSuppliersforGRN}
                />
              </Col>
              <Col xl={11} sm={12} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  name="DeliveryTerm"
                  label={t('delivery_term')}
                  fieldValue="Id"
                  fieldLabel="type"
                  style={{ marginLeft: 10, width: '95%' }}
                  query={useGetDeliveryTerms}
                />
              </Col>
              <Col xl={12} sm={12} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  name="TransporterId"
                  label="Transporter"
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  style={{ marginLeft: 15, width: '95%' }}
                  query={useGetTransporters}
                />
              </Col>

              <Col xl={11} sm={12} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  name="VehicleType"
                  label="Vehicle Type"
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              {/* <Col xs={12} sm={12}>
            <Row style={{ marginLeft: 10 }}>
              <Form.Item name="Preview" valuePropName="checked" initialValue={false}>
                <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'Preview')}>{t('preview')}</Checkbox>
              </Form.Item>
            </Row>
          </Col> */}
              <Col xs={24} xl={24} sm={24} md={24} style={{ marginLeft: 5 }} className="formfield">
                <AntInput bordered={false} name="RemarksHeader" label="Remarks" style={{ marginLeft: 40 }} />
              </Col>
            </Row>
          </Col>
          <Col xl={11} xs={24}>
            <Row gutter={[10, 10]} justify={'space-between'}>
              <Col xl={11} xs={10} className="formfield">
                <AntInputNumber bordered={false} name="FreightAmount" label={'Freight Amount'} />
              </Col>
              <Col xl={11} xs={10} className="formfield">
                <AntInputNumber bordered={false} name="VehicleNo" label={'Vehicle No'} />
              </Col>
              <Col xl={11} xs={10} className="formfield">
                <AntInputNumber
                  bordered={false}
                  name="FactoryWeight"
                  label={'Factory Weight'}
                  style={{ marginLeft: 4, width: '100%' }}
                />
              </Col>
              <Col xl={11} xs={10} className="formfield">
                <AntInputNumber
                  bordered={false}
                  name="BiltyNo"
                  label={'Bilty No'}
                  style={{ marginLeft: 15, width: '95%' }}
                />
              </Col>
              <Col xl={11} xs={10} className="formfield">
                <AntInputNumber
                  bordered={false}
                  name="PartyWeight"
                  label={'Supplier Weight'}
                  style={{ marginLeft: 4, width: '100%' }}
                />
              </Col>
              <Col xl={11} xs={10} className="formfield">
                <AntInputNumber bordered={false} name="GpNo" label={'Gp No'} style={{ marginLeft: 20, width: '94%' }} />
              </Col>
              <Col xl={11} xs={10} className="formfield">
                <AntInput bordered={false} name="WeightDifference" label={'Weight Difference'} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainForm;
