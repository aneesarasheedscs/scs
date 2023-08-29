import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ItemScheduleUOMTable from './ItemScheduleUnit';
import { AddButtonforItems } from './AddButtonforItems';
import { usegetItemNameUOMSchedule } from './queryOptions';
import { getItemType, getItemUOM } from '../queryOptions';
import { TItemTypeData, TItemTypeDataonUpdate } from './types';
import { SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';

const { useForm, useWatch } = Form;

function ItemBaseScheduleUOM() {
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
      <h2 style={{ marginBottom: 20 }}> {t('item_schedule_uom')} </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={formValues}
        style={{ width: '100%' }}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              label={t('item_name')}
              name="ItemName"
              className="input"
              placeholder="Select Pack Unit"
              fieldLabel="ItemName"
              style={{
                width: '100%',
                background: '#ffff',
              }}
              query={usegetItemNameUOMSchedule}
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              label={t('base_pack_unit')}
              className="select"
              placeholder="Select Pack Unit"
              fieldLabel="UOMDescription"
              name="BaseUnit"
              style={{
                width: '100%',
                background: '#ffff',
              }}
              query={getItemUOM}
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Equivalent" label={t('equivalent')} />
          </Col>

          <Col xs={24} sm={24} md={3}>
            <Row style={{ marginTop: 25 }} justify={'space-around'}>
              <p>{t('base_pack_unit')}</p>
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

      <ItemScheduleUOMTable />
    </AddButtonforItems>
  );
}

export default ItemBaseScheduleUOM;
