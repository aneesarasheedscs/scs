import { useState } from 'react';
import { CloseOutlined, FileAddOutlined, SyncOutlined, SaveOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Typography } from 'antd';
import { TPurchaseOrderSearchCriteria } from '../../type';
import {
  AntButton,
  AntCheckbox,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { AddButtonforItems } from './AddButtonforItems';
import Title from 'antd/es/skeleton/Title';
import { getItemCategory, getItemClass, getItemClassGroup, getParentCategory } from '../queries';
import ItemCategoryTable from './table';
// import use translation hook from react i18next and destructure {t} from it then

const { useForm, useWatch } = Form;
const { RangePicker } = DatePicker;

function ItemCategory() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TPurchaseOrderSearchCriteria>();
  const { data: itemCategory, isSuccess, isError, refetch, isFetched, isLoading } = getItemCategory();

  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>
      <h2 style={{ marginBottom: 20 }}> Item Category</h2>
      <Form form={form} layout="vertical" initialValues={formValues} onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntInputNumber name="Code" label="Code" required />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Description" label="Name" />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="SerialFrom" label="Serial From" />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="SerialTo" label="Serial To" />
          </Col>
        </Row>
        <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="Category"
              label="Parent Category"
              fieldValue="Id"
              fieldLabel="InvParentCateDescription"
              query={getParentCategory}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="ClassGroup"
              label="Class Group"
              fieldValue="Id"
              fieldLabel="ClassGroupName"
              query={getItemClassGroup}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="Class"
              label="Item Class"
              fieldValue="ClassId"
              fieldLabel="ClassDescription"
              query={getItemClass}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="InventoryAccountTitle"
              label="Purchase Account"
              fieldLabel="InventoryAccountTitle"
              query={getItemCategory}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="RevenueAccountTitle"
              label="Purchase Sale"
              fieldLabel="RevenueAccountTitle"
              query={getItemCategory}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="CGSAccountTitle"
              label="CGS Account"
              fieldLabel="CGSAccountTitle"
              query={getItemCategory}
            />
          </Col>
          <Col xs={4} sm={4} md={2} style={{ marginTop: -10 }}>
            <Row justify={'space-around'}>
              <span style={{ marginTop: 5 }}>Status</span>
              <AntCheckbox name="Status" label={''} />
            </Row>
          </Col>
          <Col xs={24} sm={24} md={8} style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Item>
              <Row align="middle" gutter={10}>
                <Col>
                  <AntButton danger ghost htmlType="reset" label="Reset" icon={<SyncOutlined />} />
                </Col>
                <Col>
                  <AntButton label="Save and add more" htmlType="submit" />
                </Col>
                <Col>
                  <AntButton ghost label="Save" htmlType="submit" icon={<SaveOutlined />} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <ItemCategoryTable />
    </AddButtonforItems>
  );
}

export default ItemCategory;
