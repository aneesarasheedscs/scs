import { isNumber } from 'lodash';
import { getItemType } from '../queryOptions';
import { useEffect, useState } from 'react';
import ItemTypeTable from './ItemType/index';
import { useTranslation } from 'react-i18next';
import { AddButtonforItems } from './AddButtonforItems';
import { SaveOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Row } from 'antd';
import { AntButton, AntInput, AntSelectDynamic } from '@tradePro/components';
import {
  TAddItemType,
  TAddItemTypeonUpdate,
  useAddItemType,
  useGetItemTypeById,
  useUpdateItemType,
} from './ItemType/querie';

const { useForm, useWatch } = Form;

function ItemType() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TAddItemType>();
  const formValues = useWatch<TAddItemType>([], form);
  const [selectedRecordId, setSelectedRecordId] = useState<number>();
  const { mutate: addItemType } = useAddItemType();
  const { mutate: updateItemType, isSuccess } = useUpdateItemType(selectedRecordId);
  const { data, refetch, isSuccess: isSuccessById } = useGetItemTypeById(selectedRecordId);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFinish = (values: TAddItemType | TAddItemTypeonUpdate) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateItemType(values);
    } else {
      addItemType(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isSuccessById) {
      form.setFieldsValue(data?.data?.Data?.Result);
    }
  }, [isSuccessById]);
  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>
      <h2 style={{ marginBottom: 20 }}> {t('item_type')}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ remember: true }}
        style={{ width: '100%' }}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="TypeCode" label={t('code')} />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntInput name="TypeDescription" label={t('item_description')} />
          </Col>

          <Col xs={24} sm={24} md={7}>
            <AntSelectDynamic
              fieldValue="Id"
              name="TypeDescription"
              label={t('item_type')}
              fieldLabel="TypeDescription"
              query={getItemType}
            />
          </Col>

          <Col xs={24} sm={24} md={3}>
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

      <ItemTypeTable selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
    </AddButtonforItems>
  );
}

export default ItemType;
