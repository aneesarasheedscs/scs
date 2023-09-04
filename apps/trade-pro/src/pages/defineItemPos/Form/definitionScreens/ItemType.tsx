import { isNumber } from 'lodash';
import { getItemType } from '../queryOptions';
import ItemDefinitionTable from './ItemType';
import { useEffect, useState } from 'react';
import ItemTypeTable from './ItemType/index';
import { useTranslation } from 'react-i18next';
import { AddButtonforItems } from './AddButtonforItems';
import { TItemTypeData, TItemTypeDataonAdd, TItemTypeDataonUpdate } from './types';
import { useGetItemTypeById, useSaveItemType } from './querySave';
import { SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';

const { useForm, useWatch } = Form;

function ItemType() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TItemTypeData>();
  const formValues = useWatch<TItemTypeData>([], form);
  const [selectedRecordId, setSelectedRecordId] = useState<number>();
  const { mutate, isSuccess, isLoading } = useSaveItemType(selectedRecordId);
  const { data: Itemtype, refetch, isSuccess: isSuccessById } = useGetItemTypeById(selectedRecordId);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const handleFinish = (values: TItemTypeDataonAdd | TItemTypeDataonUpdate) => {
    console.log(values);
    mutate(values);
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: Itemtype?.data?.Data?.Result?.rowVersion });
    } else {
    }
    // refetch().then(() => handleClose());
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      if (!btnClicked) handleClose();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);
  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>
      <h2 style={{ marginBottom: 20 }}> {t('item_type')}</h2>
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
          <Col xs={24} sm={24} md={8}>
            <AntInput name="Description" label={t('item_description')} />
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
              label={t('save')}
              icon={<SaveOutlined />}
              htmlType="submit"
              className="fullWidth"
              style={{ marginTop: 20, marginRight: 0 }}
            />
          </Col>
        </Row>
      </Form>

      <ItemTypeTable />
    </AddButtonforItems>
  );
}

export default ItemType;
