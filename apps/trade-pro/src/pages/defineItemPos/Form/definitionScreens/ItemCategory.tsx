import { useState } from 'react';
import { CloseOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Typography } from 'antd';
import { TPurchaseOrderSearchCriteria } from '../../type';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { AddButtonforItems } from './AddButtonforItems';
import Title from 'antd/es/skeleton/Title';
import { getItemCategory, getItemClass } from '../queries';

const { useForm, useWatch } = Form;
const { RangePicker } = DatePicker;

function ItemCategory() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TPurchaseOrderSearchCriteria>();
  const {
    data: itemCategory,
    isSuccess,
    isError,
    refetch,
    isFetched,
    isLoading,
  } = getItemCategory();
  const {
    data: itemClass,
    isSuccess: isSuccessClass,
    isLoading: isLoadingClass,
    isError: isErrorClass,
  } = getItemClass();

  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    refetch().then(() => handleClose());
  };
  const handleAdd = () => {
    console.log(formValues);
    refetch().then(() => handleClose());
  };

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>
      <h2 style={{ marginBottom: 20 }}> Item Category</h2>
      <Form form={form} layout="vertical" initialValues={formValues} style={{ width: '100%' }}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Code" label="Code" inputProps={{ type: 'number' }} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Description" label="Name" inputProps={{ type: 'text' }} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="SerialFrom" label="Serial From" inputProps={{ type: 'text' }} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="SerialTo" label="Serial To" inputProps={{ type: 'text' }} />
          </Col>
        </Row>
        <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="Category"
              label="Parent Category"
              fieldValue="Id"
              fieldLabel="CategoryDescription"
              isError={isError}
              isLoading={isLoading}
              data={itemCategory?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="Class"
              label="Item Class"
              fieldValue="ClassId"
              fieldLabel="ClassDescription"
              isError={isError}
              isLoading={isLoading}
              data={itemClass?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              name="InventoryAccountTitle"
              label="Purchase Account"
              fieldLabel="InventoryAccountTitle"
              isError={isError}
              isLoading={isLoading}
              data={itemCategory?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              name="RevenueAccountTitle"
              label="Purchase Sale"
              fieldLabel="RevenueAccountTitle"
              isError={isError}
              isLoading={isLoading}
              data={itemCategory?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              name="CGSAccountTitle"
              label="CGS Account"
              fieldLabel="CGSAccountTitle"
              isError={isError}
              isLoading={isLoading}
              data={itemCategory?.data?.Data?.Result}
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            Status
            <Checkbox style={{ marginLeft: 5 }} />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={6}
            style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }}
          >
            <AntButton
              label="Save"
              icon={<FileAddOutlined />}
              htmlType="submit"
              className="fullWidth"
              onClick={handleAdd}
              style={{ marginTop: 2, marginRight: 5 }}
              // isError={isPurchaseOrderError}
              // isLoading={isPurchaseOrderLoading || isFetching}
            />
            <AntButton
              label="Close"
              icon={<CloseOutlined />}
              onClick={handleClick}
              className="fullWidth"
              style={{ marginTop: 2 }}
              // isError={isPurchaseOrderError}
              // isLoading={isPurchaseOrderLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </AddButtonforItems>
  );
}

export default ItemCategory;
