import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useGRNDetailTableHistory } from '../query';
import { TGRNSearchCriteria } from '../types';
import { useGetItems, useGetSuppliers, useGetWarehouseName, useGetGRNJobLot, useGetGRNCityName } from './queryOption';
import dayjs from 'dayjs';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';


const { useForm, useWatch } = Form;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TGRNSearchCriteria>();
  const formValues = useWatch<TGRNSearchCriteria>([], form);

  const {
    refetch,
    isFetching,
    isError: isPurchaseOrderError,
    isLoading: isPurchaseOrderLoading,
  } = useGRNDetailTableHistory(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    form.setFields([{ name: 'FromDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
  }, []);
  const onFinish = (_: TGRNSearchCriteria) => {
    refetch().then(() => handleClose());
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={CriteriaRowGutter} justify={'space-between'}>
          <Col xs={24} sm={24} md={11} className="formfield">
            <p className="formfielddropdown">
              <AntDatePicker name="FromDate" bordered={false} label="From Date" />
            </p>
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntDatePicker name="ToDate" label="To Date" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntInputNumber name="FromDocNo" label="GRN From" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntInputNumber name="ToDocNo" label="GRN To" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <p className="formfielddropdown">
              <AntSelectDynamic
                fieldValue="Id"
                label="Supplier Name"
                query={useGetSuppliers}
                fieldLabel="CompanyName"
                name="SupplierCustomerId"
                bordered={false}
              />
            </p>
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              name="ItemId"
              fieldValue="Id"
              label="Item Name"
              query={useGetItems}
              fieldLabel="ItemName"
              bordered={false}
            />
          </Col>
        </Row>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%', marginTop: 10 }}>
          <Col xs={24} sm={24} md={11} className="formfield">
            <p className="formfielddropdown">
              <AntSelectDynamic
                name="WareHouseId"
                label="Warehouse Name"
                fieldValue="Id"
                fieldLabel="WareHouseName"
                query={useGetWarehouseName}
                bordered={false}
              />
            </p>
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              name="JobLotId"
              label="Job Lot"
              fieldLabel="JobLotDescription"
              query={useGetGRNJobLot}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              name="AreaCity"
              label="City Name"
              fieldLabel="CityName"
              query={useGetGRNCityName}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={4} xl={3}>
            <AntButton
              label="Show"
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
