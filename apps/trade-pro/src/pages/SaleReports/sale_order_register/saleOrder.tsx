import React, { useState } from 'react';
import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';

import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import {
  useGetParentCategories,
  useGetItemCategory,
  useGetItemDescription,
  useGetItemNameCategories,
  useGetCustomerName,
  useGetApprovedStatus,
  useGetOrderStatus,
} from './queries';
import { useSalesReportTable } from './tableQueries';
import { SaleOrderRetailCriteria } from './type';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { useTranslation } from 'react-i18next';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function SaleOrderFormCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<SaleOrderRetailCriteria>();
  const formValues = useWatch<SaleOrderRetailCriteria>([], form);
  const { setFieldValue } = form;

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(new Date());

  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useSalesReportTable(false, form.getFieldsValue());

  const onFinish = (_: SaleOrderRetailCriteria) => {
    refetch().then(() => handleClose());
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const fieldVal = (fieldValue: any) => {
  //   console.log(`i select Id ${fieldValue}`);
  // };
  const { t } = useTranslation();
  return (
    <div>
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
          // initialValues={formValues}
          initialValues={{ FromDate, ToDate }}
        >
          <Row gutter={[10, 10]} justify={'space-between'}>
            <Col xs={20} sm={22} md={12} xxl={12} className="formfield">
              <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
            </Col>

            <Col xs={20} sm={22} md={11} xxl={11} className="formfield">
              <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
            </Col>

            <Col xs={12} sm={11} md={12} xxl={12} className="formfield">
              <AntInputNumber name="FromDocNo" label={t('sale_order_from')} bordered={false} />
            </Col>
            <Col xs={11} sm={11} md={11} xxl={11} className="formfield">
              <AntInputNumber name="ToDocNo" label={t('Sale_order_to')} bordered={false} />
            </Col>
            <Col xs={24} sm={24} md={12} xxl={12} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="InventoryParentCategories"
                label={t('parent_category')}
                fieldValue="Id"
                fieldLabel="InvParentCateDescription"
                query={useGetParentCategories}
                // onChange={fieldVal}
              />
            </Col>
            <Col xs={24} sm={24} md={11} xxl={11} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="ItemCategoryId"
                label={t('item_category')}
                fieldValue="Id"
                fieldLabel="CategoryDescription"
                query={useGetItemCategory}
              />
            </Col>
            <Col xs={24} sm={24} md={12} xxl={12} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="ItemTypeId"
                label={t('type_item')}
                fieldValue="Id"
                fieldLabel="TypeDescription"
                query={useGetItemDescription}
              />
            </Col>
            <Col xs={24} sm={24} md={11} xxl={11} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="ItemId"
                label={t('item_name')}
                fieldValue="Id"
                fieldLabel="ItemName"
                query={useGetItemNameCategories}
              />
            </Col>

            <Col xs={24} sm={24} md={12} xxl={12} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="SupplierCustomerId"
                label={t('customer_name')}
                fieldValue="Id"
                fieldLabel="CompanyName"
                query={useGetCustomerName}
              />
            </Col>
            <Col xs={24} sm={24} md={11} xxl={11} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="IsApproved"
                label={t('approved_status')}
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetApprovedStatus}
              />
            </Col>

            <Col xs={24} sm={24} md={12} xxl={12} className="formfield">
              <AntSelectDynamic
                bordered={false}
                name="Status"
                label="Status"
                fieldValue="Id"
                fieldLabel="Status"
                query={useGetOrderStatus}
              />
            </Col>

            <Col xs={3} sm={4} md={4} xxl={4}>
              <br />
              <AntButton
                label="Show"
                htmlType="submit"
                style={{ marginTop: 2 }}
                isError={isReportError}
                isLoading={isReportLoading || isFetching}
              />
            </Col>
          </Row>
        </Form>
      </SearchCriteriaWrapper>
    </div>
  );
}

export default SaleOrderFormCriteria;
