import { isNumber } from 'lodash';
import { getItemType } from '../queryOptions';
import ItemDefinitionTable from './ItemType';
import { useEffect, useState } from 'react';
import ItemTypeTable from './ItemType/index';
import { useTranslation } from 'react-i18next';
import { AddButtonforItems } from './AddButtonforItems';
import { TItemTypeData, TItemTypeDataonUpdate } from './types';
import { useGetItemTypeById, useSaveItemType } from './querySave';
import { SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import ItemUOMTable from './ItemUOM';

const { useForm, useWatch } = Form;

function ItemBaseUOM() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TItemTypeData>();
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  const formValues = useWatch<TItemTypeData>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFinish = (values: TItemTypeData | TItemTypeDataonUpdate) => {
    console.log(values);

    // refetch().then(() => handleClose());
  };

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>
      <h2 style={{ marginBottom: 20 }}> {t('item_uom')} </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={formValues}
        style={{ width: '100%' }}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Code" label={t('code')} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Equivalent" label={t('equivalent')} />
          </Col>

          <Col xs={24} sm={24} md={2}>
            <Row style={{ marginTop: 25 }} justify={'space-around'}>
              <p>{t('status')}</p>
              <Checkbox name="Active" />
            </Row>
          </Col>

          <Col xs={24} sm={24} md={2}>
            <AntButton
              label={t('save')}
              icon={<SaveOutlined />}
              htmlType="submit"
              className="fullWidth"
              style={{ marginTop: 20, marginRight: 0 }}
            />
          </Col>
        </Row>
      </Form>

      <ItemUOMTable />
    </AddButtonforItems>
  );
}

export default ItemBaseUOM;
