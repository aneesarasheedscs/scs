import { Checkbox, Col, Form, FormInstance, Row } from 'antd';
import { useState } from 'react';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
// import { useGetDeliveryTerms, useGetSuppliersforGRN, useGetTransporters, useGetVehicleType } from '../queryOptions';

function MainForm({ form }: TDynamicForm) {
  const { t } = useTranslation();

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  return (
    <Row gutter={6} justify={'space-around'}>
      <Col xl={12} xs={24}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xl={11} sm={12} className="formfield">
            <AntDatePicker required bordered={false} name="DocDate" label={t('document_date')} />
          </Col>
          <Col xl={12} sm={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              label={t('supplier_name')}
              name="SupplierCustomerId"
              fieldLabel="CompanyName"
              style={{ width: '100%' }}
              // query={useGetSuppliersforGRN}
            />
          </Col>
          <Col xl={11} sm={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              name="DeliveryTermId"
              label={t('delivery_term')}
              fieldValue="Id"
              fieldLabel="type"
              style={{ marginLeft: 10, width: '95%' }}
              // query={useGetDeliveryTerms}
            />
          </Col>
          <Col xl={12} sm={12} className="formfield">
            <AntSelectDynamic
              required
              bordered={false}
              name="PaymentTermId"
              label={t('payment_term')}
              fieldValue="Id"
              fieldLabel="type"
              style={{ marginLeft: 10, width: '95%' }}
              // query={useGetDeliveryTerms}
            />
          </Col>
          <Col xl={11} sm={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              name="CommAgent"
              label={t('commision_agent')}
              fieldValue="Id"
              fieldLabel="AccountTitle"
              style={{ marginLeft: 15, width: '95%' }}
              // query={useGetTransporters}
            />
          </Col>

          <Col xl={12} sm={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              name="CommisionType"
              label="Commission Type"
              fieldValue="Id"
              fieldLabel="VehicleDescription"
              // query={useGetVehicleType}
              style={{ marginLeft: 18, width: '92%' }}
            />
          </Col>

          <Col xl={24} sm={22} style={{ marginLeft: 0 }} className="formfield">
            <AntInput bordered={false} name="RemarksHeader" label="Remarks" style={{ marginLeft: 40 }} />
          </Col>
        </Row>
      </Col>
      <Col xl={11} xs={24}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xl={11} xs={10} className="formfield">
            <AntInputNumber bordered={false} name="DueDays" label={'Due Days'} />
          </Col>
          <Col xl={11} xs={10} className="formfield">
            <AntDatePicker bordered={false} name="DueDate" label={t('due_date')} />
          </Col>
          <Col xl={11} xs={10} className="formfield">
            <AntSelectDynamic
              bordered={false}
              name="RateUOM"
              label="Rate UOM"
              fieldValue="Id"
              fieldLabel="VehicleDescription"
              // query={useGetVehicleType}
              style={{ marginLeft: 18, width: '92%' }}
            />
          </Col>
          <Col xl={11} xs={10} className="formfield">
            <AntInputNumber bordered={false} name="BillNo" label={'Bill No'} style={{ marginLeft: 4, width: '100%' }} />
          </Col>
          <Col xl={11} xs={10} className="formfield">
            <AntInputNumber
              bordered={false}
              name="BillAmount"
              label={'Bill Amount'}
              style={{ marginLeft: 4, width: '100%' }}
            />
          </Col>
          <Col xl={11} xs={10} className="formfield">
            <AntInputNumber bordered={false} name="Amount" label={'Amount'} style={{ marginLeft: 15, width: '95%' }} />
          </Col>
          <Col xl={11} xs={10} className="formfield">
            <AntInputNumber
              bordered={false}
              name="CommRate"
              label={'Commission Rate'}
              style={{ marginLeft: 4, width: '100%' }}
            />
          </Col>
          <Col xl={11} xs={10}>
            <Row style={{ marginLeft: 10, marginTop: 10 }}>
              <Form.Item name="Preview" valuePropName="checked" initialValue={false}>
                <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'Voucher')}> Voucher </Checkbox>
                <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'PartyPrint')}>Party Print</Checkbox>
                <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'ItemPrint')}> Item Print </Checkbox>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainForm;
