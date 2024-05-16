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
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TPurchaseOrderSearchCriteria>();
  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);
  const financialYear = storedFinancialYear();
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
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={CriteriaRowGutter} justify={'space-between'}>
          <Col xs={24} sm={24} md={11} xxl={11} className="formfield">
            <AntDatePicker name="FromDate" label="From Date" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} xxl={12} className="formfield">
            <AntDatePicker name="ToDate" label="To Date" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} xxl={11} className="formfield">
            <AntInputNumber name="FromDocNo" label="PO From" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} xxl={12} className="formfield">
            <AntInputNumber name="ToDocNo" label="PO To" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} xxl={11} className="formfield">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              label="Supplier Name"
              query={useGetSuppliers}
              fieldLabel="CompanyName"
              name="SupplierCustomerId"
            />
          </Col>

          <Col xs={24} sm={24} md={12} xl={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              name="ItemId"
              fieldValue="Id"
              label="Item Name"
              query={useGetItems}
              fieldLabel="ItemName"
            />
          </Col>
        </Row>
        <Row align="middle" gutter={CriteriaRowGutter} justify={'space-between'} style={{ width: '100%' }}>
          <Col xs={24} sm={24} md={11} xl={11} xxl={11} className="formfield">
            <AntSelectDynamic
              bordered={false}
              name="Status"
              label="Status"
              fieldValue="Status"
              fieldLabel="Status"
              query={useGetOrderStatus}
            />
          </Col>

          <Col xs={24} sm={24} md={12} xxl={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              name="IsApproved"
              label="Is Approved"
              fieldLabel="Status"
              query={useGetApprovedStatus}
            />
          </Col>
        </Row>
        <Col xxl={24} md={24} style={{ marginTop: 5 }}>
          <Row justify={'end'}>
            <Col xs={24} sm={24} md={8} xl={8} xxl={5}></Col>
            <Col xs={24} sm={24} md={3} xl={3}>
              <AntButton
                label="Show"
                htmlType="submit"
                style={{ marginTop: 2 }}
                isError={isPurchaseOrderError}
                isLoading={isPurchaseOrderLoading || isFetching}
              />
            </Col>
          </Row>
        </Col>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
