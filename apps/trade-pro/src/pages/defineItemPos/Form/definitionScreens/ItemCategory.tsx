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
import { getItemCategory, getItemClass, getItemClassGroup, getParentCategory } from '../queryOptions';
import ItemCategoryTable from './ItemCategory/index';
import { useTranslation } from 'react-i18next';

const { useForm, useWatch } = Form;

function ItemCategory() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TPurchaseOrderSearchCriteria>();

  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const { t } = useTranslation();
  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>

      <h2 style={{ marginBottom: 20 }}> {t('item_category')}</h2>
      <Form form={form} layout="vertical" initialValues={formValues} onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntInputNumber name="Code" label={t('code')} required />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Description" label={t('item_name')} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="SerialFrom" label={t('serial_from')} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="SerialTo" label={t('serial_to')} />
          </Col>
        </Row>
        <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="Category"
              label={t('parent_category')}
              fieldValue="Id"
              fieldLabel="InvParentCateDescription"
              query={getParentCategory}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="ClassGroup"
              label={t('item_class_group')}
              fieldValue="Id"
              fieldLabel="ClassGroupName"
              query={getItemClassGroup}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="Class"
              label={t('item_class')}
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
              label={t('purchase_account_GL')}
              fieldLabel="InventoryAccountTitle"
              query={getItemCategory}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="RevenueAccountTitle"
              label={t('sale_account_GL')}
              fieldLabel="RevenueAccountTitle"
              query={getItemCategory}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="CGSAccountTitle"
              label={t('cgs_account_GL')}
              fieldLabel="CGSAccountTitle"
              query={getItemCategory}
            />
          </Col>
          <Col xs={4} sm={4} md={2} style={{ marginTop: -10 }}>
            <Row justify={'space-around'}>
              <span style={{ marginTop: 5 }}> {t('status')} </span>

              <Checkbox name="Status" />
            </Row>
          </Col>
          <Col xs={24} sm={24} md={10} style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Item>
              <Row align="middle" gutter={10}>
                <Col>
                  <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                </Col>
                <Col>
                  <AntButton label={t('save_and_add_more')} htmlType="submit" />
                </Col>
                <Col>
                  <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
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
