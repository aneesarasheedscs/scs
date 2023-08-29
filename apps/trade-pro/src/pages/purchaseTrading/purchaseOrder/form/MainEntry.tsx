import { Col, Row } from 'antd';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetDeliveryTerms, useGetPaymentTerms, useGetSupplierCustomer } from '../queryOptions';
import { useTranslation } from 'react-i18next';

function MainEntry() {
  const { t } = useTranslation();

  return (
    <Row gutter={10}>
      <Col xs={4}>
        <AntDatePicker required name="DocDate" label={t('document_date')} />
      </Col>

      <Col xs={7}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label={t('supplier_name')}
          name="OrderSupCustId"
          fieldLabel="CompanyName"
          query={useGetSupplierCustomer}
        />
      </Col>

      <Col xs={9}>
        <AntInput name="" label={t('remarks')} />
      </Col>

      <Col xs={4}>
        <AntSelectDynamic
          required
          fieldValue="Id"
          label={t('payment_term')}
          name="PaymentTermsId"
          query={useGetPaymentTerms}
          fieldLabel="TermsDescription"
        />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="OrderDueDays" label={t('due_days')} />
      </Col>

      <Col xs={4}>
        <AntDatePicker required name="OrderDueDate" label={t('due_date')} />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="SupplierRefNo" label={t('supplier_ref_no')} />
      </Col>

      <Col xs={4}>
        <AntSelectDynamic
          required
          name="DeliveryTerm"
          label={t('delivery_term')}
          fieldValue="DeliveryTerm"
          fieldLabel="DeliveryTerm"
          query={useGetDeliveryTerms}
        />
      </Col>

      <Col xs={4}>
        <AntDatePicker name="DeliveryStartDate" label={t('delivery_start_date')} />
      </Col>

      <Col xs={4}>
        <AntInputNumber name="DeliveryDays" label={t('delivery_days')} />
      </Col>
    </Row>
  );
}

export default MainEntry;
