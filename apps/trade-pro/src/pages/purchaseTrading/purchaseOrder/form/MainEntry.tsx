import { Card, Col, Form, FormInstance, Row } from 'antd';
import { useState } from 'react';
import { TPaymentTerms } from '../type';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetDeliveryTerms, useGetPaymentTerms, useGetSupplierCustomer } from '../queryOptions';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

function MainEntry({ form }: TDynamicForm) {
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const [paymentTerm, setPaymentTerm] = useState('');

  const isDueFieldsDisabled = paymentTerm === 'Cash' ? true : false;
  const handlePaymentTermChange = (obj: TPaymentTerms) => {
    setPaymentTerm(obj?.TermsDescription);

    if (!isDueFieldsDisabled) {
      setFields([{ name: 'OrderDueDays', value: 0 }]);
      setFields([{ name: 'OrderDueDate', value: dayjs(new Date()) }]);
    }
  };

  return (
    <Card style={{ paddingBottom: '0.2%', marginBottom: 10, boxShadow: '2px 4px 12px 1px gray' }}>
      <Row gutter={[10, 6]} justify={'space-between'}>
        <Col xl={6} lg={16} sm={17} xs={13} className="formfield">
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('supplier_name')}
            name="OrderSupCustId"
            fieldLabel="CompanyName"
            query={useGetSupplierCustomer}
            bordered={false}
          />
        </Col>

        <Col xl={4} sm={6} xs={12} className="formfield">
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('payment_term')}
            name="PaymentTermsId"
            query={useGetPaymentTerms}
            fieldLabel="TermsDescription"
            onSelectChange={handlePaymentTermChange}
            bordered={false}
          />
        </Col>
        <Col xl={4} sm={6} xs={10} className="formfield">
          <AntInputNumber
            label={t('order_due_days')}
            name="OrderDueDays"
            disabled={isDueFieldsDisabled}
            required={!isDueFieldsDisabled}
            bordered={false}
          />
        </Col>
        <Col xl={4} sm={6} xs={10} className="formfield">
          <AntDatePicker
            label={t('order_due_date')}
            name="OrderDueDate"
            disabled={isDueFieldsDisabled}
            required={!isDueFieldsDisabled}
            bordered={false}
          />
        </Col>

        <Col xl={5} lg={6} className="formfield">
          <AntInputNumber required name="SupplierRefNo" label={t('supplier_ref_no')} bordered={false} />
        </Col>

        <Col xl={5} sm={6} xs={12} className="formfield">
          <AntSelectDynamic
            required
            name="DeliveryTerm"
            label={t('delivery_term')}
            fieldValue="DeliveryTerm"
            fieldLabel="DeliveryTerm"
            query={useGetDeliveryTerms}
            bordered={false}
          />
        </Col>

        <Col xl={5} lg={6} className="formfield">
          <AntDatePicker required name="DeliveryStartDate" label={t('delivery_start_date')} bordered={false} />
        </Col>

        <Col xl={4} sm={6} className="formfield">
          <AntInputNumber required name="DeliveryDays" label={t('delivery_days')} bordered={false} />
        </Col>
        <Col xl={9} lg={23} sm={23} xs={23} className="formfield">
          <AntInput name="RemarksHeader" label={t('remarks')} bordered={false} />
        </Col>
      </Row>
    </Card>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainEntry;
