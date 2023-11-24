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
import {
  TAddScheduleUOM,
  TAddScheduleUOMonUpdate,
  useAddScheduleUOM,
  useGetUOMScheduleById,
  useUpdateScheduleUOM,
} from './ItemScheduleUnit/queries';

const { useForm, useWatch } = Form;

function ItemBaseScheduleUOM() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TAddScheduleUOM>();
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  const { mutate: addScheduleUOM } = useAddScheduleUOM();
  const { mutate: updateScheduleUOM } = useUpdateScheduleUOM(selectedRecordId);
  const { data, refetch, isSuccess: isDataSuccess, isLoading: isDataLoading } = useGetUOMScheduleById(selectedRecordId);
  const formValues = useWatch<TAddScheduleUOM>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFinish = (values: TAddScheduleUOM | TAddScheduleUOMonUpdate) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateScheduleUOM(values);
    } else {
      addScheduleUOM(values);
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
      <h2 style={{ marginBottom: 20 }}> {t('item_schedule_uom')} </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ remember: true }}
        style={{ width: '100%' }}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              label={t('item_name')}
              name="ItemId"
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
              name="ScheduleUnitId"
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
              <p>{t('base_pack_uom')}</p>
              <Checkbox name="BaseRateUom" checked={data?.data?.Data?.Result?.BaseRateUom} />
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

      <ItemScheduleUOMTable selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
    </AddButtonforItems>
  );
}

export default ItemBaseScheduleUOM;
