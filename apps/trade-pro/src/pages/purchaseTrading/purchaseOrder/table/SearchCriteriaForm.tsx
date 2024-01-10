import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useGetPurchaseOrder } from '../queries';
import { TPurchaseOrderSearchCriteria } from '../type';
import { useGetItems, useGetSuppliers, useGetOrderStatus, useGetApprovedStatus } from '../queryOptions';
import { useTranslation } from 'react-i18next';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TPurchaseOrderSearchCriteria>();
  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);

  const {
    refetch,
    isFetching,
    isError: isPurchaseOrderError,
    isLoading: isPurchaseOrderLoading,
  } = useGetPurchaseOrder(true, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TPurchaseOrderSearchCriteria) => {
    refetch().then(() => handleClose());
  };
  useEffect(() => {
    const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'FromDate', value: januaryFirst }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
  }, []);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={formValues}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="FromDate" label={t('from_date')} />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="ToDate" label={t('to_date')} />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="FromDocNo" label={t('po_from')} />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="ToDocNo" label={t('po_to')} />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              label={t('supplier_name')}
              query={useGetSuppliers}
              fieldLabel="CompanyName"
              name="SupplierCustomerId"
            />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="ItemId"
              fieldValue="Id"
              label={t('item_name')}
              query={useGetItems}
              fieldLabel="ItemName"
            />
          </Col>
        </Row>
        <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              name="Status"
              label={t('status')}
              fieldValue="Status"
              fieldLabel="Status"
              query={useGetOrderStatus}
            />
          </Col>

          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              fieldValue="Id"
              name="IsApproved"
              label={t('is_approved')}
              fieldLabel="Status"
              query={useGetApprovedStatus}
            />
          </Col>

          <Col xs={24} sm={24} md={8}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isPurchaseOrderError}
              isLoading={isPurchaseOrderLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
