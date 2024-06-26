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
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
const { useForm, useWatch } = Form;

function SearchCriteria() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const financialYear = storedFinancialYear();
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
    form.setFields([{ name: 'FromDate', value: dayjs(financialYear?.Start_Period) }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
  }, []);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="horizontal" initialValues={formValues}>
        <Row gutter={CriteriaRowGutter} justify={'space-between'}>
          <Col xs={24} sm={24} md={12} className="formfield">
            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntInputNumber name="FromDocNo" label={t('po_from')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntInputNumber name="ToDocNo" label={t('po_to')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label={t('supplier_name')}
              query={useGetSuppliers}
              fieldLabel="CompanyName"
              name="SupplierCustomerId"
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              name="ItemId"
              fieldValue="Id"
              label={t('item_name')}
              query={useGetItems}
              fieldLabel="ItemName"
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Row align="middle" gutter={[10, 10]} justify={'space-between'}>
              <Col xs={24} sm={24} md={11} className="formfield">
                <AntSelectDynamic
                  name="Status"
                  label={t('status')}
                  fieldValue="Status"
                  fieldLabel="Status"
                  query={useGetOrderStatus}
                  bordered={false}
                />
              </Col>

              <Col xs={24} sm={24} md={12} className="formfield">
                <AntSelectDynamic
                  fieldValue="Id"
                  name="IsApproved"
                  label={t('is_approved')}
                  fieldLabel="Status"
                  query={useGetApprovedStatus}
                  bordered={false}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={3}>
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
