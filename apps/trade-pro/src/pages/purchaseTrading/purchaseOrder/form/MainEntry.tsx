import { Col, Form, FormInstance, Row } from 'antd';
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
    <Row gutter={10}>
      <Col xl={4} sm={6} xs={8}>
        <AntDatePicker required name="DocDate" label={t('document_date')} />
      </Col>

      <Col xl={7} lg={16} sm={17} xs={13}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label={t('supplier_name')}
          name="OrderSupCustId"
          fieldLabel="CompanyName"
          query={useGetSupplierCustomer}
        />
      </Col>

      <Col xl={9} lg={23} sm={23} xs={23}>
        <AntInput name="RemarksHeader" label={t('remarks')} />
      </Col>

      <Col xl={4} sm={6} xs={12}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label={t('payment_term')}
          name="PaymentTermsId"
          query={useGetPaymentTerms}
          fieldLabel="TermsDescription"
          onSelectChange={handlePaymentTermChange}
        />
      </Col>
      <Col xl={4} sm={6} xs={10}>
        <AntInputNumber
          label={t('order_due_days')}
          name="OrderDueDays"
          disabled={isDueFieldsDisabled}
          required={!isDueFieldsDisabled}
        />
      </Col>
      <Col xl={4} sm={6} xs={10}>
        <AntDatePicker
          label={t('order_due_date')}
          name="OrderDueDate"
          disabled={isDueFieldsDisabled}
          required={!isDueFieldsDisabled}
        />
      </Col>

      <Col xl={5} lg={6}>
        <AntInputNumber required name="SupplierRefNo" label={t('supplier_ref_no')} />
      </Col>

      <Col xl={4} sm={6} xs={12}>
        <AntSelectDynamic
          required
          name="DeliveryTerm"
          label={t('delivery_term')}
          fieldValue="DeliveryTerm"
          fieldLabel="DeliveryTerm"
          query={useGetDeliveryTerms}
        />
      </Col>

      <Col xl={4} lg={6}>
        <AntDatePicker required name="DeliveryStartDate" label={t('delivery_start_date')} />
      </Col>

      <Col xl={3} sm={6}>
        <AntInputNumber required name="DeliveryDays" label={t('delivery_days')} />
      </Col>
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainEntry;
