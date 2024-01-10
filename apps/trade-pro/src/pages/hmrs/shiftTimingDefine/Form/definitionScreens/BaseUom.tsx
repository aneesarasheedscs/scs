import { isNumber } from 'lodash';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { AddButtonforItems } from './AddButtonforItems';
import { TItemTypeData, TItemTypeDataonUpdate } from './types';

import { SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import ItemUOMTable from './ItemUOM';
import { TBaseUOM, TBaseUOMonUpdate, useGetItemUOMById, useGetUOMAdd, useGetUOMUpdate } from './ItemUOM/queries';

const { useForm, useWatch } = Form;

function ItemBaseUOM() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TBaseUOM>();
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  const { mutate: addUOM } = useGetUOMAdd();
  const { mutate: updateItemUOM, isLoading, isSuccess } = useGetUOMUpdate(selectedRecordId);
  const { data, refetch, isSuccess: isDataSuccess, isLoading: isDataLoading } = useGetItemUOMById(selectedRecordId);

  const formValues = useWatch<TItemTypeData>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFinish = (values: TBaseUOM | TBaseUOMonUpdate) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateItemUOM(values);
    } else {
      addUOM(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(data?.data?.Data?.Result);
    }
  }, [isDataSuccess]);
  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>
      <h2 style={{ marginBottom: 20 }}> {t('item_uom')} </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ remember: true }}
        style={{ width: '100%' }}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="UOMCode" label={t('code')} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Equivalent" label={t('equivalent')} />
          </Col>

          <Col xs={24} sm={24} md={2}>
            <Row style={{ marginTop: 25 }} justify={'space-around'}>
              <p>{t('status')}</p>
              <Checkbox name="UOMStatus" checked={data?.data?.Data?.Result.UOMStatus} />
            </Row>
          </Col>

          <Col xs={24} sm={24} md={2}>
            <AntButton
              label={isNumber(selectedRecordId) ? t('update') : t('save')}
              icon={<SaveOutlined />}
              htmlType="submit"
              className="fullWidth"
              style={{ marginTop: 20, marginRight: 0 }}
            />
          </Col>
        </Row>
      </Form>

      <ItemUOMTable selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
    </AddButtonforItems>
  );
}

export default ItemBaseUOM;
